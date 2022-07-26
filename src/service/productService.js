import headlessAPI from "./headlessConfig";

export const importProducts = async (products) => {
   return headlessAPI.post(
      "/o/headless-commerce-admin-catalog/v1.0/products/batch",
      products
   );
};
