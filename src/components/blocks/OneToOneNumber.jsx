import React, { memo, useState } from "react";
import styled from "styled-components";

import CustomNodeComponent from "../CustomNodeComponent";
import { ConnectionLabel, StyledHandle } from "../CustomNodeComponent";

const CustomLabel = styled.div`
  padding-bottom: 0px !important;
`;

const NumberInput = styled.input`
  width: 60px;
  margin: 30px 50px 10px 50px;
`;

export default memo(({ data, isConnectable }) => {
  const [number, setNumber] = useState(10);

  return (
    <CustomNodeComponent data={data}>
      <StyledHandle
        type="target"
        position="left"
        isConnectable={isConnectable}
      ></StyledHandle>
      <ConnectionLabel style={{ left: 5 }}>start timer</ConnectionLabel>
      <CustomLabel id="label">After {number} Seconds</CustomLabel>
      <NumberInput
        type="number"
        value={number}
        onChange={(event) => {
          const value = event.target.value;
          let newValue;
          Number.isNaN(parseInt(value))
            ? (newValue = 0)
            : (newValue = parseInt(value));
          setNumber(Math.max(Math.min(newValue, 1000), 0));
        }}
      />
      <ConnectionLabel style={{ right: 5 }}>out</ConnectionLabel>
      <StyledHandle
        type="source"
        position="right"
        isConnectable={isConnectable}
      ></StyledHandle>
    </CustomNodeComponent>
  );
});
