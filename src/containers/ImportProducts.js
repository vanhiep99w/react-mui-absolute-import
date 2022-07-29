import { Alert, Button, Stack } from "@mui/material";
import { useContext } from "react";
import format from "string-template";
import { DraggingBox } from "../components/DraggingBox";
import { TableMapping } from "../components/TableMapping";
import { PROMISE_STATUS } from "../constants/constants";
import { IMPORT_FILE_ERROR } from "../constants/messageConstants";
import { DataMappingContext } from "../context";
import { getFileNames } from "../helpers/fileHelper";
import { convertFileToProducts } from "../helpers/producHelper";
import { importProducts } from "../service/productService";

export default function ImportProducts() {
  const { data, error, setError } = useContext(DataMappingContext);
  const hasData = data.length > 0;

  const onCreateProduct = async () => {
    const res = await Promise.allSettled(
      data.map((dataFile) => importProducts(convertFileToProducts(dataFile)))
    );

    const faildedImportFiles = data
      .filter((file, index) => res[index].status === PROMISE_STATUS.REJECTED)
      .map((fileMapping) => fileMapping.file);

    setError(format(IMPORT_FILE_ERROR, [getFileNames(faildedImportFiles)]));
  };

  return (
    <Stack alignItems="center">
      <DraggingBox />
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      {hasData && (
        <>
          <TableMapping />
          <Button
            onClick={onCreateProduct}
            variant="contained"
            disabled={!hasData}
          >
            Import Data
          </Button>
        </>
      )}
    </Stack>
  );
}
