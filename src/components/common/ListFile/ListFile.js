import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { FILE_MAPPING_PROP } from "../../../constants/propTypeConstants";
import FileItem from "./FileItem";

export default function ListFile({ files, onFileRemove }) {
  if (files.length === 0) {
    return null;
  }
  return (
    <Stack
      sx={{
        gap: 1
      }}
    >
      {files.map(({ file, id }) => (
        <FileItem file={file} key={id} onFileRemove={onFileRemove} />
      ))}
    </Stack>
  );
}

ListFile.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape(FILE_MAPPING_PROP)),
  onFileRemove: PropTypes.func
};

ListFile.defaultProps = {
  files: [],
  onFileRemove: () => {}
};
