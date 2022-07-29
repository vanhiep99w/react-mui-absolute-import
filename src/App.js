import { ImportProducts } from "./containers";
import { DataProvider, ThemeProvider } from "./provider";

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <ImportProducts />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
