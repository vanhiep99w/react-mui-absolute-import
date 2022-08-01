import PropTypes from "prop-types";

export const MAPPING_PROPS = PropTypes.shape({
  headerField: PropTypes.string.isRequired,
  productField: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
});

export const FILE_MAPPING_PROPS = PropTypes.shape({
  file: PropTypes.instanceOf(File).isRequired,
  id: PropTypes.string.isRequired,
  mappings: PropTypes.arrayOf(MAPPING_PROPS).isRequired
});
