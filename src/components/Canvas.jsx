import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import ReactFlow, {
  Background,
  MiniMap,
  ConnectionLineType,
  SmoothStepEdge,
  removeElements,
  isNode,
  addEdge,
  updateEdge,
  useStoreActions,
  useStoreState,
} from "react-flow-renderer";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import { useSnackbar } from "notistack";

import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import {
  ControlledMenu as MenuInner,
  MenuDivider,
  MenuItem,
  useMenuState,
} from "@szhsin/react-menu";
import {
  menuSelector,
  menuItemSelector,
  menuDividerSelector,
} from "@szhsin/react-menu/style-utils";
import "@szhsin/react-menu/dist/core.css";

import dagre from "dagre";

import "../styling/flow.css";

// Blocks and edges
import CustomEdgeComponent from "./CustomEdgeComponent";

import OneToOne from "./blocks/OneToOne";
import TwoToOne from "./blocks/TwoToOne";
import OneToZero from "./blocks/OneToZero";
import ZeroToOne from "./blocks/ZeroToOne";
import ThreeToOne from "./blocks/ThreeToOne";
import ZeroToOneNumberBlock from "./blocks/ZeroToOneNumber";
import OneToZeroNumberBlock from "./blocks/OneToZeroNumber";
import OneToOneNumberBlock from "./blocks/OneToOneNumber";
import OneToZeroDropdownBlock from "./blocks/OneToZeroDropdown";
import ZeroToOneDropdownBlock from "./blocks/ZeroToOneDropdown";
import ZeroToOneTimeBlock from "./blocks/ZeroToOneTime";
import OneToZeroStringBlock from "./blocks/OneToZeroString";

const initialElements = [];

const nodeTypes = {
  default: OneToOne,
  onetoone: OneToOne,
  twotoone: TwoToOne,
  threetoone: ThreeToOne,
  onetozero: OneToZero,
  zerotoone: ZeroToOne,
  "zerotoone-number": ZeroToOneNumberBlock,
  "onetoone-number": OneToOneNumberBlock,
  "onetozero-number": OneToZeroNumberBlock,
  "onetozero-dropdown": OneToZeroDropdownBlock,
  "zerotoone-dropdown": ZeroToOneDropdownBlock,
  "zerotoone-time": ZeroToOneTimeBlock,
  "onetozero-string": OneToZeroStringBlock,
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

      // Random needed to notify React Flow instance of the update.
      el.position = {
        x: nodeWithPosition.x - (nodeWidth + 50) / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - (nodeHeight + 50) / 2,
      };
    }

    return el;
  });
};

/// STYLING

const menuShow = keyframes`
  from {
    opacity: 0;;
  }
`;
const menuHide = keyframes`
  to {
    opacity: 0;;
  }
`;

const FlexDiv = styled.div`
  background-color: #fcfcfc;

  flex: 4;

  height: 100vh;
`;

const AbsoluteText = styled.div`
  position: absolute;
`;

const ExtraControls = styled.div`
  position: absolute;
`;

const ControlledMenu = styled(MenuInner)`
  ${menuSelector.name} {
    font-size: 0.925rem;
    user-select: none;
    box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 6px;
    min-width: 10rem;
  }
  ${menuSelector.stateOpening} {
    animation: ${menuShow} 0.15s ease-out;
  }
  ${menuSelector.stateClosing} {
    animation: ${menuHide} 0.2s ease-out forwards;
  }

  ${menuItemSelector.name} {
    border-radius: 6px;
    padding: 0.375rem 0.625rem;
  }
  ${menuItemSelector.hover} {
    color: #fff;
    background-color: #59a2ff;
  }

  ${menuDividerSelector.name} {
    margin: 0.5rem 0.625rem;
  }
`;

/// STYLING END

let id = Math.floor(Math.random() * 9999999);
const getId = () => `dndnode_${id++}`;

const getRandomKey = () => "snackbar_" + window.btoa(Math.random().toString());

const Canvas = (props) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useStateWithCallbackLazy(initialElements);

  const { toggleMenu, ...menuProps } = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const selectedElements = useStoreState((store) => store.selectedElements);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const selectionRect = useStoreState((store) => store.userSelectionRect);
  const resetSelectedElements = useStoreActions(
    (actions) => actions.resetSelectedElements
  );

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

    // Get data from drag and drop - Used for dropdown options.
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

    setElements(
      (els) => els.concat(newNode),
      () => setSelectedElements([newNode])
    );
  };

  // General utility method.
  const onContextMenu = (event) => {
    event.preventDefault();
    setAnchorPoint({ x: event.clientX, y: event.clientY });
    toggleMenu(true);
  };
  // When the user right clicks the canvas.
  const onPaneContextMenu = (event) => {
    onContextMenu(event);
  };
  // When the user right clicks a node.
  const onNodeContextMenu = (event, node) => {
    setSelectedElements([node]);
    onContextMenu(event);
  };
  // When the user right clicks a connection.
  const onEdgeContextMenu = (event, edge) => {
    setSelectedElements([edge]);
    onContextMenu(event);
  };
  // When the user right clicks the selection pane.
  const onSelectionContextMenu = (event, nodes) => {
    onContextMenu(event);
  };

  // When the user clicks the delete option.
  const handleDeleteSelectionClick = () => {
    if (selectedElements.length > 0) {
      const oldElements = [...elements];
      onElementsRemove(selectedElements);
      // setSelectedElements([]);
      resetSelectedElements();

      const randomKey = getRandomKey();
      enqueueSnackbar(
        "Deleted " +
          selectedElements.length +
          (selectedElements.length == 1 ? " element." : " elements."),
        {
          key: randomKey,
          action: undoDeleteElementsAction(randomKey, oldElements),
        }
      );
    }
  };

  const onUndoDeleteElements = (key, oldElements) => {
    closeSnackbar(key);

    setElements(oldElements);

    const randomKey = getRandomKey();
    enqueueSnackbar("Re-added removed elements.", {
      key: randomKey,
      action: closeAction(randomKey),
    });
  };

  const undoDeleteElementsAction = (key, oldElements) => {
    return (
      <React.Fragment>
        <Button
          color="secondary"
          size="small"
          onClick={() => onUndoDeleteElements(key, oldElements)}
        >
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  };

  // When the user clicks the clear canvas option.
  const onClearCanvas = () => {
    const oldElements = [...elements];
    setElements([]);

    const randomKey = getRandomKey();
    enqueueSnackbar("All blocks removed!", {
      key: randomKey,
      action: undoClearCanvasAction(randomKey, oldElements),
    });
  };

  const onUndoClearCanvas = (key, oldElements) => {
    closeSnackbar(key);

    setElements(oldElements);
    const randomKey = getRandomKey();
    enqueueSnackbar("Returned all blocks!", {
      key: randomKey,
      action: closeAction(randomKey),
    });
  };

  const undoClearCanvasAction = (key, oldElements) => {
    return (
      <React.Fragment>
        <Button
          color="secondary"
          size="small"
          onClick={() => onUndoClearCanvas(key, oldElements)}
        >
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  };

  const onAutoLayout = (direction) => {
    const oldElements = [...elements];

    const layoutedElements = getLayoutedElements(elements, direction);
    setElements(layoutedElements, () => {
      reactFlowInstance?.fitView();
    });

    const randomKey = getRandomKey();
    enqueueSnackbar("Auto-arranged all elements", {
      key: randomKey,
      // action: undoAutoLayoutAction(randomKey, oldElements),
      action: closeAction(randomKey),
    });
  };

  // const onUndoAutoLayout = (key, oldElements) => {
  //   closeSnackbar(key);

  //   setElements(
  //     oldElements.map((el) => {
  //       if (isNode(el)) {
  //         el.position = {
  //           x: el.position.x,
  //           y: el.position.y,
  //         };
  //       }

  //       return el;
  //     })
  //   );

  //   const randomKey = getRandomKey();
  //   enqueueSnackbar("Undid auto layout of elements", {
  //     key: randomKey,
  //     action: closeAction(randomKey),
  //   });
  // };

  // const undoAutoLayoutAction = (key, oldElements) => {
  //   return (
  //     <React.Fragment>
  //       <Button
  //         color="secondary"
  //         size="small"
  //         onClick={() => onUndoAutoLayout(key, oldElements)}
  //       >
  //         UNDO
  //       </Button>
  //       <IconButton
  //         size="small"
  //         aria-label="close"
  //         color="inherit"
  //         onClick={() => closeSnackbar(key)}
  //       >
  //         <CloseIcon fontSize="small" />
  //       </IconButton>
  //     </React.Fragment>
  //   );
  // };

  const closeAction = (key) => {
    return (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  };

  return (
    <FlexDiv>
      <div style={{ height: "100%", width: "100%" }} onContextMenu={(e) => {}}>
        <ControlledMenu
          {...menuProps}
          anchorPoint={anchorPoint}
          onClose={() => toggleMenu(false)}
        >
          <MenuItem
            onClick={() => handleDeleteSelectionClick()}
            disabled={selectedElements == null}
          >
            Delete
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => onClearCanvas()}>Clear Canvas</MenuItem>
        </ControlledMenu>

        <AbsoluteText style={{ margin: 10, zIndex: 10 }}>
          Right Click a Block or Connection to delete them!
        </AbsoluteText>

        <ExtraControls style={{ bottom: 0, margin: 10, zIndex: 10 }}>
          <Button
            style={{ backgroundColor: "#420ac4" }}
            variant="contained"
            startIcon={<AccountTreeIcon />}
            onClick={() => onAutoLayout("LR")}
          >
            Auto Layout
          </Button>
        </ExtraControls>
        <div style={{ height: "100%", width: "100%" }}>
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
              onPaneContextMenu={onPaneContextMenu}
              onNodeContextMenu={onNodeContextMenu}
              onEdgeContextMenu={onEdgeContextMenu}
              onSelectionContextMenu={onSelectionContextMenu}
            >
              <Background variant="dots" gap={24} size={1} />
              <MiniMap nodeColor={"#000"} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </FlexDiv>
  );
};

export default Canvas;
