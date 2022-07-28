import { useContext, useRef, useState } from "react";
import { v4 } from "uuid";
import { DataMappingContext } from "../../context";
import { parseFile } from "../../helpers/papaParse";
import { filterValidFiles } from "../../helpers/utils";
import useAutoClearMessage from "../../hoc/useAutoClearMessage";
import { InputFile, ListFile } from "../common";
import { Container } from "./DraggingBox.style";

export default function DraggingFileBox() {
  const [error, setError] = useAutoClearMessage(2000, "");
  const [isDragging, setDragging] = useState(false);
  const { data, setData } = useContext(DataMappingContext);
  const inputFileRef = useRef();

  const onFileRemove = (dataFile) => {
    setData((draftData) => draftData.filter((ele) => dataFile.id !== ele.id));
    inputFileRef.current.value = "";
  };

  const setErrorMessage = (message) => {
    setError(message);
    inputFileRef.current.value = "";
  };

  const onInputChange = (event) => {
    const uploadedFiles = filterValidFiles([...event.target.files], data).map(
      (file) => {
        file.id = v4();
        return file;
      }
    );

    uploadedFiles.forEach((file) => {
      parseFile(file, ({ data: lines }) => {
        if (lines[0]) {
          const mapping = lines[0].map((fieldName) => ({ fieldName }));
          lines.shift();
          setData((draftData) => {
            draftData.push({ file, id: file.id, mapping, data: lines });
          });
        } else {
          setErrorMessage("Could not parse header");
        }
      });
    });
  };

  return (
    <Container
      sx={{
        backgroundColor: isDragging
          ? "white"
          : (theme) => theme.palette.app.main
      }}
    >
      <InputFile
        isDragging={isDragging}
        setDragging={setDragging}
        onChange={onInputChange}
        ref={inputFileRef}
        error={error}
      />
      <ListFile files={data} onFileRemove={onFileRemove} />
    </Container>
  );
}
