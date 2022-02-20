import React from "react";
import styled from "styled-components";

import Title from "./Title";
import ComponentList from "./ComponentList";

const FlexDiv = styled.div`
  background-color: #f7f7f7;
  border-right: 2px solid #000;

  flex: 1;
  height: 100vh;

  display: flex;
  flex-direction: column;

  .content {
    padding: 10px;
  }
  h2 {
    text-align: center;
  }
`;

const SideBar = () => {
  return (
    <FlexDiv>
      <Title />
      <ComponentList />
    </FlexDiv>
  );
};

export default SideBar;
