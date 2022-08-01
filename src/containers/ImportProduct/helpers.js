import { importProducts } from "service/productService";
import { PROMISE_STATUS } from "constants/constants";
import { convertFileToProducts } from "helpers/productHelpers";

export const importMultipleFiles = async (dataFiles) =>
  Promise.allSettled(
    dataFiles?.map((dataFile) =>
      importProducts(convertFileToProducts(dataFile))
    ) || []
  );

export const getFailedImportFiles = (dataFiles, res) =>
  dataFiles
    ?.filter((file, index) => res[index].status === PROMISE_STATUS.REJECTED)
    .map((fileMapping) => fileMapping?.file)
    .filter(Boolean);
