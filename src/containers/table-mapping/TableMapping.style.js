import {
   styled,
   Table as TableMUI,
   TableCell as TableCellMUI,
   tableCellClasses,
} from "@mui/material";
import { Box } from "@mui/system";

export const Container = styled(Box)(({ theme }) => ({
   width: "fit-content",
   justifyContent: "center",
   direction: "row",
   gap: theme.spacing(4),
   marginTop: theme.spacing(2),
   padding: theme.spacing(1),
   display: "flex",
   margin: theme.spacing(1, "auto"),
   borderRadius: theme.spacing(1),
}));

export const Table = styled(TableMUI)(({ theme }) => ({
   width: "fit-content",
   boxShadow: theme.shadows[3],
   "& caption": {
      captionSide: "top",
      padding: 0,
   },
}));

export const TableCell = styled(TableCellMUI)({
   [`&.${tableCellClasses.body}`]: {
      padding: 5,
   },
   [`&.${tableCellClasses.root}`]: {
      border: `1px solid var(--color-2)`,
      textAlign: "center",
   },
   [`&.${tableCellClasses.head}`]: {
      fontSize: "15px",
      fontWeight: "bold",
      padding: "10px 5px",
   },
});
