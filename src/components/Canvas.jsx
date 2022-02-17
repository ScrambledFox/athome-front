import styled from "styled-components";
import ReactFlow, {
  Background,
  MiniMap,
  removeElements,
} from "react-flow-renderer";

import CustomNodeComponent from "./CustomNodeComponent";
import { useState } from "react";

const FlexDiv = styled.div`
  background-color: #eee;

  flex: 3;

  height: 100vh;
`;

const initialElements = [
  {
    id: "1",
    type: "special", // input node
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output", // output node
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
];

const nodeTypes = {
  special: CustomNodeComponent,
};

const Canvas = (props) => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  return (
    <FlexDiv>
      <ReactFlow
        nodeTypes={nodeTypes}
        elements={elements}
        onElementsRemove={onElementsRemove}
      >
        <Background variant="dots" gap={16} size={1} />
        <MiniMap nodeColor={"#000"} />
      </ReactFlow>
    </FlexDiv>
  );
};

export default Canvas;
