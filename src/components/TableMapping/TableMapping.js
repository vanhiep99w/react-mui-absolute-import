import { TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import { DataMappingContext } from "context";
import TableMappingBody from "./TableMappingBody";
import { Container, Table, TableCell } from "./TableMapping.style";

export default function TableMapping() {
  const { data } = useContext(DataMappingContext);

  return (
    <Container>
      {data.map((dataFile) => {
        const { id, file } = dataFile;
        return (
          <Table key={id}>
            <caption>Mapping {file.name} files</caption>
            <TableHead>
              <TableRow>
                <TableCell>Fields</TableCell>
                <TableCell>Mapping</TableCell>
              </TableRow>
            </TableHead>
            <TableMappingBody dataFile={dataFile} />
          </Table>
        );
      })}
    </Container>
  );
}
