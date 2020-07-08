import React from "react";
import {
  MuiThemeProvider,
  StylesProvider as MuiStylesProvider,
} from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./theme";

import TriggerTool from "./components/TriggerTool";

const App: React.FunctionComponent = () => {
  return (
    <>
      <CssBaseline />
      <MuiStylesProvider injectFirst>
        <StyledThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <TriggerTool />
          </MuiThemeProvider>
        </StyledThemeProvider>
      </MuiStylesProvider>
    </>
  );
};

export default App;
