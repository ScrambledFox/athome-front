import React, { memo } from "react";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";
import { ConnectionLabel, StyledHandle } from "../CustomNodeComponent";

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeComponent data={data}>
      <ConnectionLabel style={{ top: "20%", left: 15 }}>a</ConnectionLabel>
      <ConnectionLabel style={{ top: "50%", left: 15 }}>in</ConnectionLabel>
      <ConnectionLabel style={{ top: "80%", left: 15 }}>b</ConnectionLabel>
      <div id="label">{data.label}</div>
      <ConnectionLabel style={{ right: 5 }}>out</ConnectionLabel>
      <StyledHandle
        id="a"
        type="target"
        position="left"
        style={{ top: "20%" }}
        isConnectable={isConnectable}
      ></StyledHandle>
      <StyledHandle
        id="b"
        type="target"
        position="left"
        style={{ top: "50%" }}
        isConnectable={isConnectable}
      ></StyledHandle>
      <StyledHandle
        id="c"
        type="target"
        position="left"
        style={{ top: "80%" }}
        isConnectable={isConnectable}
      ></StyledHandle>
      <StyledHandle
        type="source"
        position="right"
        style={{ right: "-4.5%" }}
        isConnectable={isConnectable}
      ></StyledHandle>
    </CustomNodeComponent>
  );
});
