import React, { memo } from "react";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";
import { ConnectionLabel, StyledHandle } from "../CustomNodeComponent";

const CustomLabel = styled.div`
  padding-bottom: 0px !important;
`;

const NumberInput = styled.input`
  width: 80px;
  margin: 10px;
  margin-left: 20px;
`;

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeComponent data={data}>
      <ConnectionLabel style={{ left: 5 }}>in</ConnectionLabel>
      <StyledHandle
        type="target"
        position="left"
        isConnectable={isConnectable}
      ></StyledHandle>
      <CustomLabel id="label">{data.label}</CustomLabel>
      <NumberInput type="number" />
    </CustomNodeComponent>
  );
});
