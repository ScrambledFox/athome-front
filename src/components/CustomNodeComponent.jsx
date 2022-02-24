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

const StyledHandle = styled(Handle)`
  && {
    width: 15px !important;
    height: 15px !important;
    &:hover {
      background: #420ac4;
    }
  }
`;

const ConnectionLabel = styled.div`
  position: absolute;
  font-size: 6px;
  top: 80%;
`;

const CustomNodeComponent = ({ children, data }) => {
  return <CustomNode>{children}</CustomNode>;
};

export default CustomNodeComponent;
export { ConnectionLabel, StyledHandle };
