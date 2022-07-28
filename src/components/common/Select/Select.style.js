import { FormControl, Select, selectClasses, styled } from "@mui/material";

export const FormControlStyled = styled(FormControl)({
  minWidth: 150
});

export const SelectStyled = styled(Select)({
  [`& .${selectClasses.select}`]: {
    padding: 5,
    fontSize: 13
  }
});
