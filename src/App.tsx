import React from "react";
import {
  MuiThemeProvider,
  StylesProvider as MuiStylesProvider,
} from "@material-ui/core/styles";
import styled, {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { Typography } from "@material-ui/core";
import theme from "./theme";

const Title = styled(Typography).attrs({ variant: "h2" })``;

const App: React.FunctionComponent = () => {
  return (
    <MuiStylesProvider injectFirst>
      <StyledThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <Title>Hello React</Title>
        </MuiThemeProvider>
      </StyledThemeProvider>
    </MuiStylesProvider>
  );
};

export default App;
