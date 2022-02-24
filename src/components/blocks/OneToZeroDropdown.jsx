import React, { memo } from "react";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";
import { ConnectionLabel, StyledHandle } from "../CustomNodeComponent";

const CustomLabel = styled.div`
  padding-bottom: 0px !important;
`;

const Dropdown = styled.select`
  width: 100px;
  margin: 10px;
  margin-left: 25px;
`;

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeComponent data={data}>
      <StyledHandle
        type="target"
        position="left"
        isConnectable={isConnectable}
      ></StyledHandle>
      <ConnectionLabel style={{ left: 5 }}>in</ConnectionLabel>
      <CustomLabel id="label">{data.label}</CustomLabel>
      <Dropdown type="number">
        {data.options.map((option, i) => {
          return <option key={i}>{option}</option>;
        })}
      </Dropdown>
    </CustomNodeComponent>
  );
});
