import React, { memo } from "react";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";
import { ConnectionLabel, StyledHandle } from "../CustomNodeComponent";

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeComponent data={data}>
      <ConnectionLabel style={{ left: 5 }}>in</ConnectionLabel>
      <div id="label">{data.label}</div>
      <ConnectionLabel style={{ right: 5 }}>out</ConnectionLabel>
      <StyledHandle
        type="target"
        position="left"
        isConnectable={isConnectable}
      ></StyledHandle>
      <StyledHandle
        type="source"
        position="right"
        isConnectable={isConnectable}
      ></StyledHandle>
    </CustomNodeComponent>
  );
});
