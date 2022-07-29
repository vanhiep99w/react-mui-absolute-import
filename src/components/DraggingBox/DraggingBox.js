import { useRef, useState } from "react";
import format from "string-template";
import { PARSE_FILE_ERROR } from "../../constants/messageConstants";
import {
  getFileNames,
  getValidFile,
  parseFiles
} from "../../helpers/fileHelper";
import { Container } from "./DraggingBox.style";
import { InputFile, ListFile } from "../common";
import { PROMISE_STATUS } from "../../constants/constants";
import { useDataContext } from "../../hoc";

export default function DraggingFileBox() {
  const [isDragging, setDragging] = useState(false);
  const { data, setData, error, setError } = useDataContext();
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
    const validFiles = getValidFile(uploadFiles, currentFiles);
    const res = await parseFiles(validFiles);
    setData((currentData) => {
      currentData.push(...res[PROMISE_STATUS.FULFILLED]);
    });
    const failedFiles = res[PROMISE_STATUS.REJECTED];
    if (failedFiles.length > 0) {
      setErrorMessage(format(PARSE_FILE_ERROR, [getFileNames(failedFiles)]));
    }
  };

  return (
    <Container sx={{ ...containerStyle }}>
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
