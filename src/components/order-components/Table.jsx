import React, { useEffect, useState } from "react";
import ListOrder from "./ListOrder";
import NewList from "./NewList";

const Table = ({ allOrders, setAllOrders }) => {
  // const [allOrders, setAllOrders] = useState(() => {
  //   const savedOrders = localStorage.getItem("allOrders");
  //   return savedOrders ? JSON.parse(savedOrders) : dataOrder;
  // });

  // useEffect(() => {
  //   localStorage.setItem("allOrders", JSON.stringify(allOrders));
  // }, [allOrders]);

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
        gap: "40px",
      }}
    >
      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>รหัสสินค้า</th>
            <th>จำนวน</th>
            <th>น้ำหนัก</th>
            <th>ราคา / น้ำหนัก</th>
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
        <button
          class="add-list"
          onClick={hdlAddList}
        >
          + Add List
        </button>
      )}
    </div>
  );
};

export default Table;
