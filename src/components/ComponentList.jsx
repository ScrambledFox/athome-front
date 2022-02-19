import styled from "styled-components";

import ListBlock from "./ListBlock";

import componentCategories from "../data/components.json";

const FlexDiv = styled.div`
  background-color: #f7f7f7;
  border-right: 2px solid #000;

  flex: 1;
  height: 100vh;

  overflow-y: scroll;

  .content {
    padding: 10px;
  }
  h2 {
    text-align: center;
  }
`;

const Category = styled.div``;

const ComponentList = () => {
  const onDragStart = (event, nodeType, label, data) => {
    event.dataTransfer.setData("type", nodeType);
    event.dataTransfer.setData("label", label);
    event.dataTransfer.setData("data", data == undefined ? "{}" : data);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <FlexDiv>
      <div className="content">
        <div>You can drag these blocks to the pane on the right.</div>
        {componentCategories.map((cat, i) => {
          return (
            <Category key={i}>
              <h2>{cat.label}</h2>
              {cat.blocks.map((block, j) => {
                return (
                  <ListBlock
                    key={j}
                    label={block.label}
                    onDragStart={(event) =>
                      onDragStart(
                        event,
                        block.type,
                        block.label,
                        JSON.stringify(block.data)
                      )
                    }
                    draggable
                  ></ListBlock>
                );
              })}
            </Category>
          );
        })}
      </div>
    </FlexDiv>
  );
};

export default ComponentList;
