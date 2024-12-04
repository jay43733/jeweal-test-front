import React from "react";
import Table from "./order-components/Table";

const OrderMenu = () => {
  return (
    <>
      <div className="ordermenu">
        <div
          style={{
            marginInline: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <p style={{ fontSize: "24px" }}>รายการสินค้า</p>
          <Table />
        </div>
        <textarea
          style={{
            marginInline: "24px",
            height: "20%",
            resize: "none",
            border: "1px solid #91959A",
            borderRadius: "8px",
            padding: "16px",
            Width: "100%",
          }}
          name="comment"
          placeholder="Remark"
        ></textarea>
      </div>
    </>
  );
};

export default OrderMenu;
