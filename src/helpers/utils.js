import { CSV_FILE_MINE_TYPE } from "../constants";

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

export const convertToProducts = ({ data = [], mapping }) =>
  data.map((line) =>
    line.reduce((object, fieldValue, index) => {
      const { fieldName, fieldMapping } = mapping[index];
      return {
        ...object,
        ...convertProductField(fieldName, fieldValue, fieldMapping)
      };
    }, {})
  );

export const filterValidFiles = (files, currentFiles) =>
  files
    .filter((file) => file.type === CSV_FILE_MINE_TYPE)
    .filter(
      (file) =>
        !currentFiles.some((ele) => {
          return (
            ele.file.name === file.name &&
            ele.file.lastModified === file.lastModified
          );
        })
    );
