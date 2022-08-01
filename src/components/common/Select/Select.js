import PropType from "prop-types";
import { InputLabel, MenuItem } from "@mui/material";
import { FormControlStyled, SelectStyled } from "./Select.style";

export default function Select({
  id,
  value,
  onChange,
  options,
  label,
  ...restProps
}) {
  if (!options?.length) {
    return null;
  }
  return (
    <FormControlStyled {...restProps} variant="outlined">
      {label && <InputLabel id={id}>{label}</InputLabel>}
      <SelectStyled id={id} label={label} onChange={onChange} value={value}>
        <MenuItem value="">Select field mapping</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.name}
          </MenuItem>
        ))}
      </SelectStyled>
    </FormControlStyled>
  );
}

Select.propTypes = {
  id: PropType.string,
  value: PropType.string,
  onChange: PropType.func.isRequired,
  options: PropType.instanceOf(Array),
  label: PropType.string
};

Select.defaultProps = {
  value: null,
  options: [],
  label: "",
  id: ""
};
