import React from "react";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import EditForm from "./EditForm";
import Header from "./Header";
import Footer from "./Footer";

const Wrapper = styled("div")`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TriggerTool: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <EditForm />
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default TriggerTool;
