import PropTypes from "prop-types";
import { Button, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { sxButton, sxStack } from "components/common/ListFile/FileItem.styled";

export default function FileItem({ file, onFileRemove }) {
  const handleRemoveFile = () => {
    onFileRemove(file);
  };
  return (
    <Stack
      sx={{ ...sxStack }}
      direction="row"
      space={1}
      justifyContent="space-between"
    >
      <Typography fontSize={15}>{file.name}</Typography>
      <Button sx={{ ...sxButton }} onClick={handleRemoveFile}>
        <CloseIcon />
      </Button>
    </Stack>
  );
}

FileItem.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  onFileRemove: PropTypes.func
};

FileItem.defaultProps = {
  onFileRemove: () => {}
};
