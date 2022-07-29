import PropType from "prop-types";
import { InputLabel, MenuItem } from "@mui/material";
import { FormControlStyled, SelectStyled } from "./Select.style";

export default function Select({
  children,
  id,
  value,
  onChange,
  options,
  label,
  ...restProps
}) {
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
  children: PropType.node,
  id: PropType.string,
  value: PropType.string,
  onChange: PropType.func.isRequired,
  options: PropType.instanceOf(Array),
  label: PropType.string
};

Select.defaultProps = {
  children: null,
  value: null,
  options: [],
  label: "",
  id: ""
};
