import React from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { NavBar } from "./Сomponents/Navbar/NavBar";
import { Menu } from "./Сomponents/Menu/Menu";
import { GlobalStyle } from "./Сomponents/Styled/GlobalStyle";
import { ModalItem } from "./Сomponents/Modal/ModalItem";
import { Order } from "./Сomponents/Order/Order";
import { useOpenItem } from "./Сomponents/Hooks/useOpenItem";
import { useOrders } from "./Сomponents/Hooks/useOrders";
import { useAuth } from "./Сomponents/Hooks/useAuth";
import { useTitle } from "./Сomponents/Hooks/useTitle";
import { OrderConfirm } from "./Сomponents/Order/OrderConfirm";
import { useOrderConfirm } from "./Сomponents/Hooks/useOrederConfirm";
import { Context } from "./Сomponents/Function/context";

const firebaseConfig = {
  apiKey: "AIzaSyDxWQVp5_Szv-4UeEuhOzpJgquDnvBPbV8",
  authDomain: "mrdonalds-17d4c.firebaseapp.com",
  projectId: "mrdonalds-17d4c",
  storageBucket: "mrdonalds-17d4c.appspot.com",
  messagingSenderId: "1052170108671",
  appId: "1:1052170108671:web:1fe620b5c2b73432f6d6ca",
  measurementId: "G-64GWZXDF9B"
};
const firebase = initializeApp(firebaseConfig);

function App() {
  const auth = useAuth(getAuth(firebase));
  const database = getDatabase(firebase);
  const openItem = useOpenItem();
  const orders = useOrders();
  const orderConfirm = useOrderConfirm();
  useTitle(openItem.openItem);

  return (
    <Context.Provider
      value={{
        auth,
        openItem,
        orders,
        orderConfirm,
        firebaseDatabase: database
      }}
    >
      <GlobalStyle />
      <NavBar />
      <Order />
      <Menu />
      {openItem.openItem && <ModalItem />}
      {orderConfirm.openOrderConfirm && <OrderConfirm />}
    </Context.Provider>
  );
}

export default App;
