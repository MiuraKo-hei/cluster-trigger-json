import React from "react";
import { Container, Typography, AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components";
import EditForm from "./EditForm";

const Wrapper = styled("div")``;

const TriggerTool: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">トリガー用JSON編集ツール</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <EditForm />
      </Container>
    </Wrapper>
  );
};

export default TriggerTool;
