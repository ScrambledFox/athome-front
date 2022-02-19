import styled from "styled-components";

const Block = styled.div`
  width: 60%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;

  text-align: center;

  padding: 5px;
  border: 2px solid #000;

  &:hover {
    cursor: grab;

    border: 2px solid #333;
  }
`;

const ListBlock = ({ label, onDragStart }) => {
  return (
    <Block onDragStart={onDragStart} draggable>
      {label}
    </Block>
  );
};

export default ListBlock;
