import PropTypes from "prop-types";

export const FILE_MAPPING_PROP = {
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
};
