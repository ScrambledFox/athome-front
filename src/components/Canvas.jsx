import { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  ConnectionLineType,
  SmoothStepEdge,
  removeElements,
  isNode,
  addEdge,
  updateEdge,
} from "react-flow-renderer";

import dagre from "dagre";

import "../styling/flow.css";

import CustomNodeComponent from "./CustomNodeComponent";
import CustomEdgeComponent from "./CustomEdgeComponent";

// Blocks
import OneToOne from "./blocks/OneToOne";
import TwoToOne from "./blocks/TwoToOne";
import OneToZero from "./blocks/OneToZero";
import ZeroToOne from "./blocks/ZeroToOne";
import ZeroToOneNumberBlock from "./blocks/ZeroToOneNumber";
import OneToOneNumberBlock from "./blocks/OneToOneNumber";
import OneToZeroDropdownBlock from "./blocks/OneToZeroDropdown";
import ZeroToOneDropdownBlock from "./blocks/ZeroToOneDropdown";

const initialElements = [];

const nodeTypes = {
  default: OneToOne,
  onetoone: OneToOne,
  twotoone: TwoToOne,
  onetozero: OneToZero,
  zerotoone: ZeroToOne,
  "zerotoone-number": ZeroToOneNumberBlock,
  "onetoone-number": OneToOneNumberBlock,
  "onetozero-dropdown": OneToZeroDropdownBlock,
  "zerotoone-dropdown": ZeroToOneDropdownBlock,
};

const edgeTypes = {
  default: SmoothStepEdge,
  special: CustomEdgeComponent,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 100;

const getLayoutedElements = (elements, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankDir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? "left" : "top";
      el.sourcePosition = isHorizontal ? "right" : "bottom";

      // Needed to notify React Flow instance of the update.
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const FlexDiv = styled.div`
  background-color: #fcfcfc;

  flex: 3;

  height: 100vh;
`;

const AbsoluteText = styled.div`
  position: absolute;
`;

const ExtraControls = styled.div`
  position: absolute;
`;

let id = Math.floor(Math.random() * 9999999);
const getId = () => `dndnode_${id++}`;

const Canvas = (props) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => {
    setElements((els) =>
      addEdge({ ...params, type: "special", arrowHeadType: "arrowclosed" }, els)
    );
  };

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("type");
    const label = event.dataTransfer.getData("label");
    const json = event.dataTransfer.getData("data");

    const data = JSON.parse(json);

    // Removes UNDEFINED blocks if dragging and dropping something random.
    if (label == null) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${label}`, ...data },
    };

    console.log(newNode);

    setElements((els) => els.concat(newNode));
  };

  const autoLayout = (direction) => {
    const layoutedElements = getLayoutedElements(elements, direction);
    setElements(layoutedElements);
    reactFlowInstance.fitView();
  };

  return (
    <FlexDiv>
      <AbsoluteText style={{ margin: 10, zIndex: 10 }}>
        Press the 'backspace' key to delete the selected block or connection.
      </AbsoluteText>
      <ExtraControls style={{ bottom: 0, margin: 10, zIndex: 10 }}>
        <button onClick={() => autoLayout("LR")}>Auto Layout</button>
      </ExtraControls>
      <div style={{ height: "100%", width: "100%" }}>
        <ReactFlowProvider>
          <div
            style={{ height: "100%", width: "100%" }}
            className="reactflow-wrapper"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              elements={elements}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onEdgeUpdate={onEdgeUpdate}
              connectionLineType={ConnectionLineType.Straight}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <Background variant="dots" gap={24} size={1} />
              <MiniMap nodeColor={"#000"} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </FlexDiv>
  );
};

export default Canvas;
