import React, { useEffect, useState } from "react";
import ListOrder from "./ListOrder";
import NewList from "./NewList";

const Table = ({ allOrders, setAllOrders }) => {
  const [isListCreated, setIsListCreated] = useState(false);

  const hdlAddList = () => {
    setIsListCreated(true);
  };

  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        minWidth:"100%"
      }}
    >
      <table
        style={{
          minWidth: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>รหัสสินค้า</th>
            <th>จำนวน</th>
            <th>น้ำหนัก</th>
            <th>ราคา/หน่วย</th>
            <th>หน่วย</th>
            <th>ราคาก่อนส่วนลด</th>
            <th>ส่วนลด</th>
            <th>ราคาสุทธิ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((item, index) => (
            <ListOrder key={index} item={item} setAllOrders={setAllOrders} />
          ))}
          {isListCreated && (
            <NewList
              setIsListCreated={setIsListCreated}
              setAllOrders={setAllOrders}
              id={allOrders.length + 1}
            />
          )}
        </tbody>
      </table>
      {!isListCreated && (
        <button class="add-list" onClick={hdlAddList}>
          + Add List
        </button>
      )}
    </div>
  );
};

export default Table;
