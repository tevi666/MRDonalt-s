import React, { useContext } from "react";
import styled from "styled-components";
import { formatCurrency } from "../Function/secondaryFunction";
import { Context } from "../Function/context";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.li`
  position: relative;
  width: 400px;
  height: 155px;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  font-size: 30px;
  margin-top: 30px;
  margin-right: 30px;
  padding: 15px;
  color: #fff;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #000;
    opacity: 0.3;
    z-index: -1;
  }
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 50px 30px #000;
    transition: 0.3s;
    &:after {
      opacity: 0;
    }
  }
`;

export const ListItem = ({ itemList }) => {
  const {
    openItem: { setOpenItem }
  } = useContext(Context);
  return (
    <List>
      {itemList.map((item) => (
        <Item key={item.id} img={item.img} onClick={() => setOpenItem(item)}>
          <p>{item.name}</p>
          <p>{formatCurrency(item.price)}</p>
        </Item>
      ))}
    </List>
  );
};
