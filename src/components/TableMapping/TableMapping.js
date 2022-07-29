import { TableBody, TableHead, TableRow } from "@mui/material";
import { v4 } from "uuid";
import { PRODUCT_FIELD_MAPPINGS } from "../../constants/constants";
import { filterUnselectedOptions } from "../../helpers/producHelper";
import TableBodyRow from "./TableBodyRow";
import { Container, Table, TableCell } from "./TableMapping.style";
import { useDataContext } from "../../hoc";

export default function TableMapping() {
  const { data, setData } = useDataContext();

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
