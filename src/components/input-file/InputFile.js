import { Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Container, Input, Button } from "./InputFile.style";
import { fileExtention } from "../../constants";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const InputFile = forwardRef(
   ({ isDragging, setDragging, onChange, error }, inputRef) => {
      const onDragEnter = () => setDragging(true);
      const onDragLeave = () => setDragging(false);
      const onDrop = () => setDragging(false);

      return (
         <Container
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            isDragging={isDragging}
            sx={{ outlineOffset: isDragging ? "-10px" : "0px" }}
         >
            <Stack
               justifyContent="center"
               alignItems="center"
               sx={{ p: 1 }}
               gap={2}
            >
               <DownloadIcon color="info" sx={{ width: 50, height: 50 }} />
               {error ? (
                  <Typography variant="subtitle2" color="error.dark">
                     {error}
                  </Typography>
               ) : (
                  <Typography variant="subtitle2">
                     Choose a CSV file or Drag it here
                  </Typography>
               )}
               <Button
                  sx={{
                     opacity: isDragging ? 0 : 1,
                  }}
               >
                  Upload
               </Button>
            </Stack>
            <Input
               type="file"
               name="file-upload"
               onChange={onChange}
               ref={inputRef}
               accept={fileExtention}
               multiple
            />
         </Container>
      );
   }
);

export default InputFile;

InputFile.propTypes = {
   isDragging: PropTypes.bool.isRequired,
   setDragging: PropTypes.func.isRequired,
   onChange: PropTypes.func.isRequired,
   error: PropTypes.string,
};
