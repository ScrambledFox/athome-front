import React, { useEffect } from "react";
import styled from "styled-components";

import SideBar from "./components/SideBar";
import Canvas from "./components/Canvas";

import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";

import { ReactFlowProvider } from "react-flow-renderer";

const Version = "0.3.2";

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
    <SnackbarProvider
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      maxSnack={3}
      align="right"
      autoHideDuration={5000}
      TransitionComponent={Slide}
    >
      <ReactFlowProvider>
        <Main>
          <SideBar />
          <Canvas />
        </Main>
      </ReactFlowProvider>
    </SnackbarProvider>
  );
}

export default App;
export { Version };
