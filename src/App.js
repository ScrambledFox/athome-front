import styled from "styled-components";

import ComponentList from "./components/ComponentList";
import Canvas from "./components/Canvas";

const Main = styled.div`
  color: #000;

  display: flex;
  flex-direction: horizontal;
`;

function App() {
  return (
    <Main>
      <ComponentList />
      <Canvas />
    </Main>
  );
}

export default App;
