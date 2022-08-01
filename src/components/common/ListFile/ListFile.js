import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { FILE_MAPPING_PROPS } from "constants/propTypeConstants";
import FileItem from "./FileItem";

export default function ListFile({ files, onFileRemove }) {
  if (files?.length === 0) {
    return null;
  }
  const renderedFileItems = files.map(({ file, id }) => (
    <FileItem file={file} key={id} onFileRemove={onFileRemove} />
  ));

  return <Stack sx={{ gap: 1 }}>{renderedFileItems}</Stack>;
}

ListFile.propTypes = {
  files: PropTypes.arrayOf(FILE_MAPPING_PROPS),
  onFileRemove: PropTypes.func
};

ListFile.defaultProps = {
  files: [],
  onFileRemove: () => {}
};
