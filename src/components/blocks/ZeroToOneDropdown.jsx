import React, { memo } from "react";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";
import { ConnectionLabel, StyledHandle } from "../CustomNodeComponent";

const CustomLabel = styled.div`
  padding-bottom: 0px !important;
`;

const Dropdown = styled.select`
  width: 150px;
  margin: 10px;
  margin-bottom: 20px;
`;

export default memo(({ data, isConnectable }) => {
  return (
    <CustomNodeComponent data={data}>
      <CustomLabel id="label">{data.label}</CustomLabel>
      <Dropdown type="number">
        {data.options.map((option, i) => {
          return <option key={i}>{option}</option>;
        })}
      </Dropdown>
      <ConnectionLabel style={{ right: 5 }}>out</ConnectionLabel>
      <StyledHandle
        type="source"
        position="right"
        isConnectable={isConnectable}
      ></StyledHandle>
    </CustomNodeComponent>
  );
});
