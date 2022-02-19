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

const Dropdown = styled.select`
  width: 100px;
  margin: 10px;
  margin-left: 25px;
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
      <CustomLabel id="label">{data.label}</CustomLabel>
      <Dropdown type="number">
        {data.options.map((option, i) => {
          return <option key={i}>{option}</option>;
        })}
      </Dropdown>
    </CustomNodeComponent>
  );
});
