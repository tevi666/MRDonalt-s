import React, { useContext } from "react";
import styled from "styled-components";
import { Overlay } from "../Modal/ModalItem";
import { OrderTitle, Total, TotalPrice } from "./Order";
import { ButtonCheckout } from "../Styled/ButtonCheckout";
import { projection } from "../Function/secondaryFunction";
import { totalPriceItems, formatCurrency } from "../Function/secondaryFunction";
import { ref, set } from "firebase/database";
import { Context } from "../Function/context";

const Modal = styled.div`
  background-color: #fff;
  width: 600px;
  padding: 30px;
`;

const Text = styled.h3`
  text-align: center;
  margin-bottom: 30px;
`;

const rulesData = {
  itemName: ["name"],
  price: ["price"],
  count: ["count"],
  topping: [
    "topping",
    (arr) => arr.filter((obj) => obj.checked).map((obj) => obj.name),
    (arr) => (arr.length ? arr : "no topping")
  ],
  choice: ["choices", (item) => (item ? item : "no choices")]
};
const sendOrder = (database, orders, authentication) => {
  const newOrder = orders.map(projection(rulesData));
  set(ref(database, "orders"), {
    nameClient: authentication.displayName,
    email: authentication.email,
    order: newOrder
  });
};

export const OrderConfirm = () => {
  const {
    orders: { orders, setOrders },
    auth: { authentication },
    orderConfirm: { setOpenOrderConfirm },
    firebaseDatabase
  } = useContext(Context);

  const total = orders.reduce(
    (result, order) => totalPriceItems(order) + result,
    0
  );

  return (
    <Overlay>
      <Modal>
        <OrderTitle>{authentication.displayName}</OrderTitle>
        <Text>Осталось только подтвердить ваш заказ</Text>
        <Total>
          <span>Итого</span>
          <TotalPrice>{formatCurrency(total)}</TotalPrice>
        </Total>
        <ButtonCheckout
          onClick={() => {
            sendOrder(firebaseDatabase, orders, authentication);
            setOrders([]);
            setOpenOrderConfirm(false);
          }}
        >
          Подтвердить
        </ButtonCheckout>
      </Modal>
    </Overlay>
  );
};
