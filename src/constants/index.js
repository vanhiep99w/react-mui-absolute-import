export const CSV_FILE_MINE_TYPE = "text/csv";

// Product field
export const PRODUCT_FIELD_MAPPINGS = [
  {
    name: "External Reference Code",
    key: "externalReferenceCode"
  },
  { name: "Name", key: "name", locale: true },
  { name: "Description", key: "description", locale: true },
  { name: "Product Type", key: "productType" },
  { name: "Create Date", key: "createDate" },
  { name: "Modified Date", key: "modifiedDate" },
  { name: "Expiration Date", key: "expirationDate" },
  { name: "Catalog Id", key: "catalogId" },
  { name: "Is Active", key: "active" }
];

export const IMPORT_PRODUCT_URL =
  "/o/headless-commerce-admin-catalog/v1.0/products/batch";
