import PropTypes from "prop-types";
import { TableRow } from "@mui/material";
import { TableCell } from "./TableMapping.style";
import { Select } from "../common";

export default function TableBodyRow({
  fieldName,
  fieldMapping,
  productMappingFields,
  onUpdateMapping
}) {
  const value = fieldMapping ? fieldMapping.key : "";
  const options = fieldMapping
    ? [fieldMapping, ...productMappingFields]
    : productMappingFields;

  return (
    <TableRow>
      <TableCell>{fieldName}</TableCell>
      <TableCell>
        <Select
          options={options}
          onChange={(event) => onUpdateMapping(event.target.value)}
          value={value}
          fullWidth
          size="small"
        />
      </TableCell>
    </TableRow>
  );
}

TableBodyRow.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldMapping: PropTypes.shape(),
  productMappingFields: PropTypes.instanceOf(Array),
  onUpdateMapping: PropTypes.func
};

TableBodyRow.defaultProps = {
  fieldMapping: null,
  productMappingFields: [],
  onUpdateMapping: () => {}
};
