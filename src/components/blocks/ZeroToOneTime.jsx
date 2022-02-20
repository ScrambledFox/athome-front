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
  width: 50px;
  margin: 10px;
`;

export default memo(({ data, isConnectable }) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  return (
    <CustomNodeComponent data={data}>
      <CustomLabel id="label">{data.label}</CustomLabel>
      <NumberInput
        type="number"
        value={hour.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        onChange={(event) => {
          const value = event.target.value;
          let newValue;
          Number.isNaN(parseInt(value))
            ? (newValue = 0)
            : (newValue = parseInt(value));
          setHour(Math.max(Math.min(newValue, 23), 0));
        }}
      />
      <NumberInput
        type="number"
        value={minute.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        onChange={(event) => {
          const value = event.target.value;
          let newValue;
          Number.isNaN(parseInt(value))
            ? (newValue = 0)
            : (newValue = parseInt(value));
          setMinute(Math.max(Math.min(newValue, 59), 0));
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
