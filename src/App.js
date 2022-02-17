import styled from "styled-components";

import ComponentList from "./components/ComponentList";
import Canvas from "./components/Canvas";

const Main = styled.div`
  color: #fff;

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
