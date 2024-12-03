import React from "react";
import Table from "./order-components/Table";

const OrderMenu = ({ allOrders, setAllOrders }) => {
  return (
    <div class="ordermenu">
      <p style={{ fontSize: "20px", paddingLeft: "8px" }}>รายการสินค้า</p>
      <Table allOrders={allOrders} setAllOrders={setAllOrders} />
    </div>
  );
};

export default OrderMenu;
