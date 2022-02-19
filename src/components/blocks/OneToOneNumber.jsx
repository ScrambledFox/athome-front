import React, { memo, useState } from "react";
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
  margin-top: 30px;
`;

export default memo(({ data, isConnectable }) => {
  const [number, setNumber] = useState(10);

  return (
    <CustomNodeComponent data={data}>
      <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log("connected", params)}
        isConnectable={isConnectable}
      ></Handle>
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
      <Handle
        type="source"
        position="right"
        onConnect={(params) => console.log("connected", params)}
        isConnectable={isConnectable}
      ></Handle>
    </CustomNodeComponent>
  );
});
