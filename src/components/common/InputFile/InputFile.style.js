import { Box, styled, Button as ButtonMUI } from "@mui/material";
import { default as DownloadIconMUI } from "@mui/icons-material/Download";

export const Container = styled(Box)(({ theme }) => ({
  padding: "30px 0px",
  width: 300,
  outline: `2px dashed ${theme.palette.app.dark}`,
  position: "relative",
  transition: "outline-offset 0.15s ease-in-out, background-color 0.15s linear"
}));

export const Input = styled("input")({
  position: "absolute",
  width: "100%",
  height: "100%",
  cursor: "pointer",
  top: 0,
  left: 0,
  opacity: 0
});

export const Button = styled(ButtonMUI)(({ theme }) => ({
  color: "white",
  p: "7px 10 px",
  backgroundColor: theme.palette.app.light,
  "&:hover": { backgroundColor: theme.palette.app.dark }
}));

export const DownloadIcon = styled(DownloadIconMUI)({
  width: 50,
  height: 50
});
