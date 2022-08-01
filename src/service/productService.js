import { SERVICE_PATH } from "constants/constants";
import headlessAPI from "config/headlessConfig";

export const importProducts = async (products) =>
  headlessAPI.post(SERVICE_PATH.importProductURL, products);
