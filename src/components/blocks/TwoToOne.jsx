import React, { memo } from "react";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";
import { ConnectionLabel, StyledHandle } from "../CustomNodeComponent";

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeComponent data={data}>
      <StyledHandle
        id="a"
        type="target"
        position="left"
        style={{ top: "30%" }}
        isConnectable={isConnectable}
      ></StyledHandle>
      <StyledHandle
        id="b"
        type="target"
        position="left"
        style={{ top: "70%" }}
        isConnectable={isConnectable}
      ></StyledHandle>
      <ConnectionLabel style={{ top: "30%", left: 15 }}>a</ConnectionLabel>
      <ConnectionLabel style={{ top: "70%", left: 15 }}>b</ConnectionLabel>
      <div id="label">{data.label}</div>
      <ConnectionLabel style={{ right: 5 }}>out</ConnectionLabel>
      <StyledHandle
        type="source"
        position="right"
        isConnectable={isConnectable}
      ></StyledHandle>
    </CustomNodeComponent>
  );
});
