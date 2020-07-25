import React from "react";
import styled from "styled-components";

import GitHubIcon from "@material-ui/icons/GitHub";
import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";

const Title = styled(Typography).attrs({ variant: "h6" })`
  flex-grow: 1;
`;

const Header: React.FunctionComponent = () => {
  return (
    <AppBar>
      <Toolbar>
        <Title>JSON編集ツール</Title>
        <IconButton href="https://github.com/MiuraKo-hei/cluster-trigger-json">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
