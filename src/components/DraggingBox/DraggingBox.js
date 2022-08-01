import { useContext, useRef, useState } from "react";
import format from "string-template";
import { getFileNames, getValidFiles, parseFiles } from "helpers/fileHelpers";
import { PARSE_FILE_ERROR } from "constants/messageConstants";
import { PROMISE_STATUS } from "constants/constants";
import { InputFile, ListFile } from "components/common";
import { DataMappingContext } from "context";
import { Container } from "./DraggingBox.style";

export default function DraggingBox() {
  const [isDragging, setDragging] = useState(false);
  const { data, setData, error, setError } = useContext(DataMappingContext);
  const inputFileRef = useRef();
  const containerStyle = {
    backgroundColor: isDragging ? "common.white" : "app.main"
  };

  const onFileRemove = (dataFile) => {
    setData((draftData) => draftData.filter((ele) => dataFile.id !== ele.id));
    inputFileRef.current.value = "";
  };

  const setErrorMessage = (message) => {
    setError(message);
    inputFileRef.current.value = "";
  };

  const onInputChange = async (event) => {
    const currentFiles = data.map((ele) => ele.file);
    const uploadFiles = [...event.target.files];
    const validFiles = getValidFiles(uploadFiles, currentFiles);
    const {
      [PROMISE_STATUS.FULFILLED]: successfulFiles = [],
      [PROMISE_STATUS.REJECTED]: failedFiles = []
    } = await parseFiles(validFiles);
    const errorMessage = failedFiles.length
      ? format(PARSE_FILE_ERROR, [getFileNames(failedFiles)])
      : "";
    setData((currentData) => {
      currentData.push(...successfulFiles);
    });
    setErrorMessage(errorMessage);
  };

  return (
    <Container sx={{ ...containerStyle }}>
      <InputFile
        isDragging={isDragging}
        setDragging={setDragging}
        onChange={onInputChange}
        ref={inputFileRef}
      />
      <ListFile files={data} onFileRemove={onFileRemove} />
    </Container>
  );
}
