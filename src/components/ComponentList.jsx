import styled from "styled-components";

import ListBlock from "./ListBlock";

import componentCategories from "../data/components.json";

const VerticalFlexDiv = styled.div`
  flex: 5;

  background: #fafafa;

  overflow-y: scroll;
`;

const ComponentList = () => {
  const onDragStart = (event, nodeType, label, data) => {
    event.dataTransfer.setData("type", nodeType);
    event.dataTransfer.setData("label", label);
    event.dataTransfer.setData("data", data == undefined ? "{}" : data);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <VerticalFlexDiv>
      <div className="content">
        <div style={{ textAlign: "center" }}>
          Drag these blocks to the canvas on the right to start creating your
          flow!
        </div>

        {componentCategories.map((cat, i) => {
          return (
            <div key={i}>
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
            </div>
          );
        })}
      </div>
    </VerticalFlexDiv>
  );
};

export default ComponentList;
