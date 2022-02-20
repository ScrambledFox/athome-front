import styled from "styled-components";
import { Handle, Position } from "react-flow-renderer";

const CustomNode = styled.div`
  background-color: #ffff;
  color: #000;

  border: 1px solid #000;
  border-radius: 3px;

  max-width: 200px;

  #label {
    padding: 20px;
  }

  &:hover {
    background-color: #eee;
  }
`;

const CustomNodeComponent = ({ children, data }) => {
  return <CustomNode>{children}</CustomNode>;
};

export default CustomNodeComponent;
