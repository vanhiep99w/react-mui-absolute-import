import Papa from "papaparse";
export const parseFile = (file, onComplete, config = {}) => {
   Papa.parse(file, {
      complete: onComplete,
      skipEmptyLines: true,
      ...config,
   });
};
