import { TableBody, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import { v4 } from "uuid";
import { PRODUCT_FIELD_MAPPINGS } from "../../constants";
import { DataMappingContext } from "../../context";
import TableBodyRow from "./TableBodyRow";
import { Container, Table, TableCell } from "./TableMapping.style";

export default function TableMapping() {
  const { data, setData } = useContext(DataMappingContext);

  const onUpdateMapping = (fileIndex, field, fieldMapping) => {
    setData((draftData) => {
      const mapping = draftData[fileIndex].mapping.find(
        (ele) => ele.fieldName === field
      );
      mapping.fieldMapping = PRODUCT_FIELD_MAPPINGS.find(
        (ele) => ele.key === fieldMapping
      );
    });
  };

  const filterUnselectedOptions = (mapping) =>
    PRODUCT_FIELD_MAPPINGS.filter(
      (ele) =>
        !mapping.some(({ fieldMapping }) => fieldMapping?.key === ele.key)
    );

  return (
    <Container>
      {data.map(({ file, id, mapping }, fileDataIndex) => (
        <Table key={id}>
          <caption>Mapping {file.name} files</caption>
          <TableHead>
            <TableRow>
              <TableCell>Fields</TableCell>
              <TableCell>Mapping</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mapping?.map(({ fieldMapping, fieldName }) => (
              <TableBodyRow
                fieldMapping={fieldMapping}
                onUpdateMapping={(value) =>
                  onUpdateMapping(fileDataIndex, fieldName, value)
                }
                key={v4()}
                fieldName={fieldName}
                productMappingFields={filterUnselectedOptions(mapping)}
              />
            ))}
          </TableBody>
        </Table>
      ))}
    </Container>
  );
}
