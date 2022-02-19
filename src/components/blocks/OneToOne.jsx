import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";

const ConnectionLabel = styled.div`
  position: absolute;
  font-size: 6px;
  top: 50%;
`;

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeComponent data={data}>
      <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log("connected", params)}
        isConnectable={isConnectable}
      ></Handle>
      <ConnectionLabel style={{ left: 5 }}>in</ConnectionLabel>
      <div id="label">{data.label}</div>
      <ConnectionLabel style={{ right: 5 }}>out</ConnectionLabel>
      <Handle
        type="source"
        position="right"
        onConnect={(params) => console.log("connected", params)}
        isConnectable={isConnectable}
      ></Handle>
    </CustomNodeComponent>
  );
});
