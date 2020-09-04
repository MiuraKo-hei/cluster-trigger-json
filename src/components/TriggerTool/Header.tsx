import React from "react";
import styled from "styled-components";

import { Typography, AppBar, Toolbar } from "@material-ui/core";

const Title = styled(Typography).attrs({ variant: "h6" })`
  flex-grow: 1;
`;

const Header: React.FunctionComponent = () => {
  return (
    <AppBar>
      <Toolbar>
        <Title>JSON編集ツール</Title>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
