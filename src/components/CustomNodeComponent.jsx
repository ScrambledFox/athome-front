import styled from "styled-components";
import { Handle, Position } from "react-flow-renderer";

const CustomNode = styled.div`
  background-color: #ffff;
  color: #000;

  padding: 20px;
  border: 1px solid #000;
  border-radius: 3px;
`;

const CustomNodeComponent = ({ data }) => {
  return (
    <CustomNode>
      <Handle type="target" position={Position.Left}></Handle>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right}></Handle>
    </CustomNode>
  );
};

export default CustomNodeComponent;
