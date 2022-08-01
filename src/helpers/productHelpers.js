import { PRODUCT_FIELD_MAPPINGS } from "constants/constants";

export const convertProductField = (headerField, fieldValue, productField) => {
  if (productField) {
    const productFieldValue = productField.locale
      ? { en_US: fieldValue }
      : fieldValue;
    return { [productField.key]: productFieldValue };
  }
  return { [headerField]: fieldValue };
};

export const convertLineToProduct = (lineData, mapping = []) =>
  lineData?.reduce((object, fieldValue, index) => {
    const { headerField, productField } = mapping?.[index] || {};
    return {
      ...object,
      ...convertProductField(headerField, fieldValue, productField)
    };
  }, {});

export const convertFileToProducts = (dataFile = {}) => {
  const { data, mappings } = dataFile;
  return data?.map((line) => convertLineToProduct(line, mappings));
};

export const filterUnselectedOptions = (mappings = []) =>
  PRODUCT_FIELD_MAPPINGS.filter(
    (ele) => !mappings.some(({ productField }) => productField?.key === ele.key)
  );

export const getFileMappingByFieldName = (fileId, dataFiles, headerField) => {
  const { mappings = [] } =
    dataFiles?.find((dataFile) => dataFile.id === fileId) || {};

  return mappings.find((mapping) => mapping.headerField === headerField) || {};
};

export const getProductMappingByKey = (key) => {
  return PRODUCT_FIELD_MAPPINGS.find((ele) => ele.key === key) || {};
};
