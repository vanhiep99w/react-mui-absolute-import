import { Stack, Typography } from "@mui/material";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { CSV_FILE_MINE_TYPE } from "constants/constants";
import { Container, Input, Button, DownloadIcon } from "./InputFile.style";

const InputFile = forwardRef(
  ({ isDragging, setDragging, onChange }, inputRef) => {
    const onDragEnter = () => setDragging(true);
    const onDragLeave = () => setDragging(false);
    const onDrop = () => setDragging(false);

    return (
      <Container
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        isDragging={isDragging}
        sx={{ outlineOffset: isDragging ? -10 : 0 }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ p: 1 }}
          spacing={2}
        >
          <DownloadIcon color="info" />
          <Typography variant="subtitle2">
            Choose a CSV file or Drag it here
          </Typography>
          <Button disabled={isDragging}>Upload</Button>
        </Stack>
        <Input
          type="file"
          name="file-upload"
          onChange={onChange}
          ref={inputRef}
          accept={CSV_FILE_MINE_TYPE}
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
  onChange: PropTypes.func.isRequired
};
