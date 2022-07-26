import { Box, styled, Button as ButtonMUI } from "@mui/material";

export const Container = styled(Box)({
   padding: "10px 0px",
   width: 300,
   outline: "2px dashed var(--color-2)",
   position: "relative",
   transition:
      "outline-offset 0.15s ease-in-out, background-color 0.15s linear",
});

export const Input = styled("input")({
   position: "absolute",
   width: "100%",
   height: "100%",
   cursor: "pointer",
   top: 0,
   left: 0,
   opacity: 0,
});

export const Button = styled(ButtonMUI)({
   color: "white",
   p: "7px 10 px",
   backgroundColor: "var(--color-3)",
   "&:hover": { backgroundColor: "var(--color-2)" },
});
