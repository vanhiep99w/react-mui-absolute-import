import { TableBody, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import { Select } from "../../components";
import { productFieldMappings } from "../../constants";
import { DataMappingContext } from "../../context";
import { Container, Table, TableCell } from "./TableMapping.style";

export default function TableMapping() {
   const { data, setData } = useContext(DataMappingContext);

   const onUpdateMapping = (fileIndex, field, fieldMapping) => {
      setData((draftData) => {
         const mapping = draftData[fileIndex].mapping.find(
            (ele) => ele.fieldName === field
         );
         mapping.fieldMapping = productFieldMappings.find(
            (ele) => ele.key === fieldMapping
         );
      });
   };

   return (
      <Container>
         {data.map(({ file, id, mapping }, fileDataIndex) => {
            const options = productFieldMappings.filter(
               (ele) =>
                  !mapping.some(
                     ({ fieldMapping }) => fieldMapping?.key === ele.key
                  )
            );
            return (
               <Table key={id}>
                  <caption>Mapping {file.name} files</caption>
                  <TableHead>
                     <TableRow>
                        <TableCell>Fields</TableCell>
                        <TableCell>Mapping</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {mapping?.map(({ fieldMapping, fieldName }, index) => (
                        <TableRow key={index}>
                           <TableCell>{fieldName}</TableCell>
                           <TableCell>
                              <Select
                                 options={
                                    fieldMapping
                                       ? [fieldMapping, ...options]
                                       : options
                                 }
                                 onChange={(event) =>
                                    onUpdateMapping(
                                       fileDataIndex,
                                       fieldName,
                                       event.target.value
                                    )
                                 }
                                 value={fieldMapping ? fieldMapping.key : ""}
                                 fullWidth
                                 size="small"
                              />
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            );
         })}
      </Container>
   );
}
