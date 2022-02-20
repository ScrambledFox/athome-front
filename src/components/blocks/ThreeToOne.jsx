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
        id="a"
        type="target"
        position="left"
        style={{ top: "20%" }}
        onConnect={(params) => console.log("connected", params)}
        isConnectable={isConnectable}
      ></Handle>
      <Handle
        id="b"
        type="target"
        position="left"
        style={{ top: "50%" }}
        onConnect={(params) => console.log("connected", params)}
        isConnectable={isConnectable}
      ></Handle>
      <Handle
        id="c"
        type="target"
        position="left"
        style={{ top: "80%" }}
        onConnect={(params) => console.log("connected", params)}
        isConnectable={isConnectable}
      ></Handle>
      <ConnectionLabel style={{ top: "20%", left: 5 }}>a</ConnectionLabel>
      <ConnectionLabel style={{ top: "50%", left: 5 }}>in</ConnectionLabel>
      <ConnectionLabel style={{ top: "80%", left: 5 }}>b</ConnectionLabel>
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
