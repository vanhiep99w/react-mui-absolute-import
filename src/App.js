import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useImmer } from "use-immer";
import { DraggingBox, TableMapping } from "./containers";
import { DataMappingContext } from "./context";
import { convertToProducts } from "./helpers/utils";
import { importProducts } from "./service/productService";

function App() {
   const [data, setData] = useImmer([]);
   const [error, setError] = useState("");

   const onCreateProduct = async () => {
      try {
         await importProducts(convertToProducts(data[0]));
      } catch (error) {
         setError(error.message);
      }
   };
   return (
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
