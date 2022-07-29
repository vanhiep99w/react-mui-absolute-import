import PropTypes from "prop-types";
import { Button, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function FileItem({ file, onFileRemove }) {
  const stackStyle = {
    backgroundColor: "white",
    borderRadius: 1,
    p: (theme) => theme.spacing(0.5, 1),
    maxWidth: 200
  };
  const buttonStyle = {
    p: 0,
    minWidth: 0
  };

  return (
    <Stack
      direction="row"
      gap={1}
      sx={{ ...stackStyle }}
      justifyContent="space-between"
    >
      <Typography fontSize={15}>{file.name}</Typography>
      <Button sx={{ ...buttonStyle }} onClick={() => onFileRemove(file)}>
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
