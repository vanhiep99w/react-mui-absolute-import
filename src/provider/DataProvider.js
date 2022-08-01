import { useImmer } from "use-immer";
import PropTypes from "prop-types";
import { DataMappingContext } from "context";
import { useState } from "react";

export default function DataProvider({ children }) {
  const [data, setData] = useImmer([]);
  const [error, setError] = useState("");

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DataMappingContext.Provider value={{ data, setData, error, setError }}>
      {children}
    </DataMappingContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
};
