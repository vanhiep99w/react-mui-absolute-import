export const convertToProducts = ({ data, mapping }) => {
   if (data) {
      return data.map((line) =>
         line.reduce((object, fieldValue, index) => {
            const { fieldName, fieldMapping } = mapping[index];
            if (fieldMapping) {
               return {
                  ...object,
                  [fieldMapping.key]: fieldMapping.locale
                     ? {
                          en_US: fieldValue,
                       }
                     : fieldValue,
               };
            } else {
               return {
                  ...object,
                  [fieldName]: fieldValue,
               };
            }
         }, {})
      );
   }
   return [];
};
