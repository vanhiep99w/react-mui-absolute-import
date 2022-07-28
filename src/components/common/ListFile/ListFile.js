import { Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

export default function ListFile({ files = [], onFileRemove = () => {} }) {
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
        <Stack
          key={id}
          direction="row"
          gap={1}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            p: (theme) => theme.spacing(0.5, 1),
            maxWidth: 200
          }}
          justifyContent="space-between"
        >
          <Typography fontSize={15}>{file.name}</Typography>
          <Button sx={{ p: 0, minWidth: 0 }} onClick={() => onFileRemove(file)}>
            <CloseIcon />
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}

ListFile.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.instanceOf(File).isRequired,
      id: PropTypes.string.isRequired,
      mapping: PropTypes.arrayOf(
        PropTypes.shape({
          fieldName: PropTypes.string.isRequired,
          fieldMapping: PropTypes.shape({
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
          })
        })
      ).isRequired
    })
  ),
  onFileRemove: PropTypes.func
};

ListFile.defaultProps = {
  files: [],
  onFileRemove: () => {}
};
