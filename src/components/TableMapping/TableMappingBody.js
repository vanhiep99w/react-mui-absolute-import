import { v4 } from "uuid";
import { FILE_MAPPING_PROPS } from "constants/propTypeConstants";
import { filterUnselectedOptions } from "helpers/productHelpers";
import { TableBody } from "@mui/material";
import TableBodyRow from "./TableBodyRow";

export default function TableMappingBody({ dataFile }) {
  const { id, mappings } = dataFile;
  const mappingOptions = filterUnselectedOptions(mappings);

  return (
    <TableBody>
      {mappings?.map((mapping) => (
        <TableBodyRow
          mapping={mapping}
          key={v4()}
          mappingOptions={mappingOptions}
          fileId={id}
        />
      ))}
    </TableBody>
  );
}

TableMappingBody.propTypes = { dataFile: FILE_MAPPING_PROPS.isRequired };
