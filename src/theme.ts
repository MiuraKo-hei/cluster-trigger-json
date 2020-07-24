import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  spacing: (f) => `${8 * f}px`,
  props: {
    MuiAppBar: {
      position: "static",
      color: "default",
      variant: "outlined",
    },
    MuiButton: {
      variant: "outlined",
    },
    MuiSelect: {
      variant: "outlined",
      margin: "dense",
    },
    MuiTextField: {
      size: "small",
      variant: "outlined",
      autoComplete: "off",
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        padding: "16px",
      },
    },
    MuiFormControl: {
      root: {
        display: "block",
        width: "160px",
      },
    },
  },
});
