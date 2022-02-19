import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";

const ConnectionLabel = styled.div`
  position: absolute;
  font-size: 6px;
  top: 50%;
`;

const CustomLabel = styled.div`
  padding-bottom: 0px !important;
`;

const NumberInput = styled.input`
  width: 60px;
  margin: 10px;
`;

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeComponent data={data}>
      <CustomLabel id="label">{data.label}</CustomLabel>
      <NumberInput type="number" />
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
