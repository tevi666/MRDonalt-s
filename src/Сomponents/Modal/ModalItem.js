import React, { useContext } from "react";
import styled from "styled-components";
import { ButtonCheckout } from "../Styled/ButtonCheckout";
import { CountItem } from "./CountItem";
import { useCount } from "../Hooks/useCount";
import { totalPriceItems } from "../Function/secondaryFunction";
import { formatCurrency } from "../Function/secondaryFunction";
import { Toppings } from "../Modal/Toppings";
import { useToppings } from "../Hooks/useToppings";
import { useChoices } from "../Hooks/useChoices";
import { Choices } from "./Choices";
import { Context } from "../Function/context";

export const Overlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const Modal = styled.div`
  background-color: #fff;
  width: 600px;
  height: 600px;
`;
const Banner = styled.div`
    height: 200px;
    background-image: url(${({ img }) => img});
    background-size: cover;
    background-position: center;
	width: 100%:
	margin-bottom: 20px;
`;

const Content = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 210px);
  & button {
    align-self: center;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-size: 30px;
  line-height: 53px;
`;

const TotalPriceItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalItem = () => {
  const {
    orders: { orders, setOrders },
    openItem: { openItem, setOpenItem }
  } = useContext(Context);
  const counter = useCount(openItem.count);
  const toppings = useToppings(openItem);
  const choices = useChoices(openItem);
  const isEdit = openItem.index > -1;

  const closeModal = (e) => {
    if (e.target.id === "overlay") {
      setOpenItem(null);
    }
  };

  const order = {
    ...openItem,
    count: counter.count,
    topping: toppings.toppings,
    choice: choices.choice
  };

  const addToOrder = () => {
    setOrders([...orders, order]);
    setOpenItem(null);
  };

  const editOrder = () => {
    const newOrders = [...orders];
    newOrders[openItem.index] = order;
    setOrders(newOrders);
    setOpenItem(null);
  };

  return (
    <Overlay id="overlay" onClick={closeModal}>
      <Modal>
        <Banner img={openItem.img} />
        <Content>
          <HeaderContent>
            <p>{openItem.name}</p>
            <p>{formatCurrency(openItem.price)}</p>
          </HeaderContent>
          <CountItem {...counter} />
          {openItem.toppings && <Toppings {...toppings} />}
          {openItem.choices && <Choices {...choices} openItem={openItem} />}
          <TotalPriceItem>
            <span>Цена:</span>
            <span>{formatCurrency(totalPriceItems(order))}</span>
          </TotalPriceItem>
          <ButtonCheckout
            onClick={isEdit ? editOrder : addToOrder}
            disabled={order.choices && !order.choice}
          >
            {isEdit ? "Редактировать" : "Добавить"}
          </ButtonCheckout>
        </Content>
      </Modal>
    </Overlay>
  );
};
