import React from "react";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import EditForm from "./EditForm";
import Header from "./Header";

const Wrapper = styled("div")``;

const TriggerTool: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <EditForm />
      </Container>
    </Wrapper>
  );
};

export default TriggerTool;
