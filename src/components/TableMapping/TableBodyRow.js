import PropTypes from "prop-types";
import { TableRow } from "@mui/material";
import { Select } from "components/common";
import { MAPPING_PROPS } from "constants/propTypeConstants";
import {
  getFileMappingByFieldName,
  getProductMappingByKey
} from "helpers/productHelpers";
import { useContext } from "react";
import { DataMappingContext } from "context";
import { TableCell } from "./TableMapping.style";

export default function TableBodyRow({ mapping, mappingOptions, fileId }) {
  const { setData } = useContext(DataMappingContext);
  const { productField, headerField } = mapping;
  const productFieldKey = productField ? productField.key : "";
  const options = productField
    ? [productField, ...mappingOptions]
    : mappingOptions;

  const onSelectChange = (event) => {
    const { value } = event.target;
    const prdField = getProductMappingByKey(value);
    setData((dataFiles) => {
      const fileMapping = getFileMappingByFieldName(
        fileId,
        dataFiles,
        headerField
      );
      fileMapping.productField = prdField;
    });
  };

  return (
    <TableRow>
      <TableCell>{headerField}</TableCell>
      <TableCell>
        <Select
          options={options}
          onChange={onSelectChange}
          value={productFieldKey}
          fullWidth
          size="small"
        />
      </TableCell>
    </TableRow>
  );
}

TableBodyRow.propTypes = {
  mapping: MAPPING_PROPS.isRequired,
  mappingOptions: PropTypes.instanceOf(Array),
  fileId: PropTypes.string.isRequired
};

TableBodyRow.defaultProps = {
  mappingOptions: []
};
