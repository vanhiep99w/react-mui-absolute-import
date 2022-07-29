import { useContext } from "react";
import { DataMappingContext } from "../context";

export default function useDataContext() {
  const { data, error, setData, setError } = useContext(DataMappingContext);

  return { data, error, setData, setError };
}
