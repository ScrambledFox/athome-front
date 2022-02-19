import React from "react";
import { getSmoothStepPath, getMarkerEnd } from "react-flow-renderer";
import styled from "styled-components";

const StyledPath = styled.path`
  stroke: #555;
  stroke-width: 2px;

  &:hover {
    stroke: #222;
    stroke-width: 4px;

    cursor: pointer;
  }
`;

const CustomEdgeComponent = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition,
    borderRadius: 25,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <StyledPath
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      ></StyledPath>
    </>
  );
};

export default CustomEdgeComponent;
