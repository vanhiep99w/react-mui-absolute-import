import { PRODUCT_FIELD_MAPPINGS } from "../constants/constants";

export const convertProductField = (fieldName, fieldValue, fieldMapping) => {
  return fieldMapping
    ? {
        [fieldMapping.key]: fieldMapping.locale
          ? {
              en_US: fieldValue
            }
          : fieldValue
      }
    : {
        [fieldName]: fieldValue
      };
};

export const convertLineToProduct = (lineData, mapping) =>
  lineData.reduce((object, fieldValue, index) => {
    const { fieldName, fieldMapping } = mapping[index];
    return {
      ...object,
      ...convertProductField(fieldName, fieldValue, fieldMapping)
    };
  }, {});

export const convertFileToProducts = (file) => {
  const { data, mapping } = file;
  return data.map((line) => convertLineToProduct(line, mapping));
};

export const filterUnselectedOptions = (mapping) =>
  PRODUCT_FIELD_MAPPINGS.filter(
    (ele) => !mapping.some(({ fieldMapping }) => fieldMapping?.key === ele.key)
  );
