import React, { useEffect } from "react";
import styled from "styled-components";

import SideBar from "./components/SideBar";
import Canvas from "./components/Canvas";

const Main = styled.div`
  color: #000;

  display: flex;
  flex-direction: row;

  font-family: "Roboto";
  font-weight: 500;

  user-select: none;
`;

function App() {
  useEffect(() => (document.title = "@Home - Flow Creator 🏡"));

  return (
    <Main>
      <SideBar />
      <Canvas />
    </Main>
  );
}

export default App;
