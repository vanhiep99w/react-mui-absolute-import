import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import format from "string-template";
import { DraggingBox } from "components/DraggingBox";
import { TableMapping } from "components/TableMapping";
import { IMPORT_FILE_ERROR } from "constants/messageConstants";
import { DataMappingContext } from "context";
import { getFileNames } from "helpers/fileHelpers";
import { ERROR_DURATION } from "constants/constants";
import {
  getFailedImportFiles,
  importMultipleFiles
} from "containers/ImportProduct/helpers";

export default function ImportProducts() {
  const { data, error, setError } = useContext(DataMappingContext);
  const [showError, setShowError] = useState(false);
  const hasData = data.length > 0;

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handlerClose = () => {
    setShowError(false);
  };

  const onImportFiles = async () => {
    const res = await importMultipleFiles(data);
    const failedImportFileNames = getFileNames(getFailedImportFiles(data, res));
    setError(format(IMPORT_FILE_ERROR, [failedImportFileNames]));
  };

  return (
    <Stack alignItems="center">
      <DraggingBox />
      <Snackbar
        open={showError}
        autoHideDuration={ERROR_DURATION}
        onClose={handlerClose}
      >
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      </Snackbar>
      {hasData && (
        <>
          <TableMapping />
          <Button
            onClick={onImportFiles}
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
