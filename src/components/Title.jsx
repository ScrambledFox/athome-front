import React from "react";
import styled from "styled-components";

import Logo from "../assets/logobig.png";

const VerticalFlexDiv = styled.div`
  flex: 1;

  background-color: #fafafa;

  border-bottom: 1px solid #888;

  font-family: "Roboto";
  text-align: center;

  img {
    width: 90%;
    margin-top: 20px;

    user-select: none;
    user-drag: none;

    &:hover {
      cursor: pointer;
    }
  }

  h1 {
    padding: 0px 10px;
  }
`;

const Title = () => {
  return (
    <VerticalFlexDiv>
      <img src={Logo} onClick={() => window.location.reload()} />
      <h1>Flow Creator 🏡</h1>
      <h3>Managing Hughes Family's Home</h3>
    </VerticalFlexDiv>
  );
};

export default Title;
