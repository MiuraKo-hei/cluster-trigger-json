import React from "react";
import styled from "styled-components";

import GitHubIcon from "@material-ui/icons/GitHub";
import { IconButton } from "@material-ui/core";

const Container = styled("div")`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`;

const Footer: React.FunctionComponent = () => {
  return (
    <Container>
      <IconButton href="https://github.com/MiuraKo-hei/cluster-trigger-json">
        <GitHubIcon />
      </IconButton>
    </Container>
  );
};

export default Footer;
