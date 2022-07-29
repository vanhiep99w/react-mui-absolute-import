import PropTypes from "prop-types";
import { ThemeProvider as ThemeProviderMUI } from "@mui/material";
import theme from "../config/themeConfig";

export default function ThemeProvider({ children }) {
  return <ThemeProviderMUI theme={theme}>{children}</ThemeProviderMUI>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};
