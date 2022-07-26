import {
   FormControl,
   InputLabel,
   MenuItem,
   Select as SelectMUI,
   selectClasses,
} from "@mui/material";

export default function Select({
   children,
   id,
   value,
   onChange,
   options,
   label,
   placeholder,
   ...restProps
}) {
   return (
      <FormControl {...restProps} variant="outlined" sx={{ minWidth: 150 }}>
         {label && <InputLabel id={id}>{label}</InputLabel>}
         <SelectMUI
            id={id}
            label={label}
            onChange={onChange}
            value={value}
            sx={{
               [`& .${selectClasses.select}`]: {
                  padding: "5px",
                  fontSize: 13,
               },
            }}
         >
            <MenuItem value="">Select field mapping</MenuItem>
            {options.map((option) => (
               <MenuItem key={option.key} value={option.key}>
                  {option.name}
               </MenuItem>
            ))}
         </SelectMUI>
      </FormControl>
   );
}
