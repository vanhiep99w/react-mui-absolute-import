import { useContext, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { InputFile, ListFile } from "../../components";
import { fileExtention } from "../../constants";
import { DataMappingContext } from "../../context";
import { parseFile } from "../../helpers/papaParse";
import { Container } from "./DraggingBox.style";

export default function DraggingFileBox() {
   const [error, setError] = useState("");
   const [isDragging, setDragging] = useState(false);
   const { data, setData } = useContext(DataMappingContext);
   const inputFileRef = useRef();

   const onFileRemove = (dataFile) => {
      setData((draftData) => draftData.filter((ele) => dataFile.id !== ele.id));
      inputFileRef.current.value = "";
   };

   const onInputChange = (event) => {
      const uploadedFiles = [...event.target.files]
         .filter((file) => {
            if (file.type !== fileExtention) {
               setErrorMessage("Please add CSV file");
               return false;
            }
            return true;
         })
         .filter(
            (file) =>
               !data.some(
                  (ele) =>
                     ele.name === file.name &&
                     ele.lastModified === file.lastModified
               )
         )
         .map((file) => {
            file.id = v4();
            return file;
         });
      uploadedFiles.forEach((file) => {
         parseFile(file, ({ data }) => {
            if (data[0]) {
               const mapping = data[0].map((fieldName) => ({ fieldName }));
               data.shift();
               setData((draftData) => {
                  draftData.push({ file, id: file.id, mapping, data });
               });
            } else {
               setErrorMessage("Could not parse header");
            }
         });
      });
   };

   const setErrorMessage = (message) => {
      setError(message);
      inputFileRef.current.value = "";
   };

   useEffect(() => {
      const timeoutId = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timeoutId);
   }, [error]);

   return (
      <Container
         sx={{
            backgroundColor: isDragging ? "white" : "var(--color-1)",
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
