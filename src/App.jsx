import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import OrderMenu from "./components/OrderMenu";
import ClientDetail from "./components/ClientDetail";

const App = () => {
  // Mock data
  const dataOrder = [
    {
      id: 1,
      productId: 1,
      number: 2,
      weight: 10,
      pricePerWeight: 10,
      unit: "กรัม",
      priceBeforeDiscount: 1000,
      discount: 0,
      price: 1000,
    },
    {
      id: 2,
      productId: 1,
      number: 2,
      weight: 10,
      pricePerWeight: 10,
      unit: "กรัม",
      priceBeforeDiscount: 1000,
      discount: 0,
      price: 1000,
    },
    {
      id: 3,
      productId: 1,
      number: 2,
      weight: 10,
      pricePerWeight: 10,
      unit: "กรัม",
      priceBeforeDiscount: 1000,
      discount: 0,
      price: 1000,
    },
  ];

  const [allOrders, setAllOrders] = useState(() => {
    const savedOrders = localStorage.getItem("allOrders");
    return savedOrders ? JSON.parse(savedOrders) : dataOrder;
  });

  useEffect(() => {
    localStorage.setItem("allOrders", JSON.stringify(allOrders));
  }, [allOrders]);

  return (
    <>
      <ClientDetail />
      <div class="content-container">
        <OrderMenu allOrders={allOrders} setAllOrders={setAllOrders} />
        <SideBar allOrders={allOrders} />
      </div>
    </>
  );
};

export default App;
