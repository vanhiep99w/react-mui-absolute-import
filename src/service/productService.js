import { IMPORT_PRODUCT_URL } from "../constants";
import headlessAPI from "./headlessConfig";

export const importProducts = async (products) =>
  headlessAPI.post(IMPORT_PRODUCT_URL, products);
