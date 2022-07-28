import { Button, Stack, Typography } from "@mui/material";
import { useImmer } from "use-immer";
import { DraggingBox } from "./components/DraggingBox";
import { TableMapping } from "./components/TableMapping";
import { DataMappingContext } from "./context";
import { convertToProducts } from "./helpers/utils";
import useAutoClearMessage from "./hoc/useAutoClearMessage";
import { importProducts } from "./service/productService";

function App() {
  const [data, setData] = useImmer([]);
  const [error, setError] = useAutoClearMessage(5000, "");

  const onCreateProduct = async () => {
    const res = await Promise.allSettled(
      data.map((dataFile) => importProducts(convertToProducts(dataFile)))
    );

    const errorFiles = data
      .filter((file, index) => res[index].status === "rejected")
      .map(({ file }) => file.name)
      .join(", ");

    setError(`Imort products failed for files: ${errorFiles}`);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataMappingContext.Provider value={{ data, setData }}>
      <Stack alignItems="center">
        <DraggingBox />
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}
        <TableMapping />
        {data.length > 0 && (
          <Button onClick={onCreateProduct} variant="contained">
            Import Data
          </Button>
        )}
      </Stack>
    </DataMappingContext.Provider>
  );
}

export default App;
