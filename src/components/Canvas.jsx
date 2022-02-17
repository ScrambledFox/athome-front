import styled from "styled-components";
import ReactFlow, {
  Background,
  MiniMap,
  ConnectionLineType,
  SmoothStepEdge,
  removeElements,
  addEdge,
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
    position: { x: 0, y: 25 },
  },
  {
    id: "2",
    type: "special", // input node
    data: { label: "Test Node" },
    position: { x: 150, y: 25 },
  },
  {
    id: "3",
    type: "special", // input node
    data: { label: "Third Node" },
    position: { x: 300, y: 25 },
  },
];

const nodeTypes = {
  special: CustomNodeComponent,
};

const edgeTypes = {
  default: SmoothStepEdge,
};

const Canvas = (props) => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <FlexDiv>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.Straight}
        defaultConnectionLineType={ConnectionLineType.SmoothStep}
      >
        <Background variant="dots" gap={24} size={1} />
        <MiniMap nodeColor={"#000"} />
      </ReactFlow>
    </FlexDiv>
  );
};

export default Canvas;
