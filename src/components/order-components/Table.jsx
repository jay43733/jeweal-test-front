import React, { useEffect, useState } from "react";
import ListOrder from "./ListOrder";
import NewList from "./NewList";
import useListStore from "../../store/listStore";

const Table = () => {
  const lists = useListStore((state) => state.lists);
  const isEditedListMenu = useListStore((state) => state.isEditedListMenu);
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
        minWidth: "100%",
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
          {lists?.map((item, index) => (
            <ListOrder key={item.listId} item={item} index={index} />
          ))}
          {isListCreated && (
            <NewList
              setIsListCreated={setIsListCreated}
              id={lists.length + 1}
            />
          )}
        </tbody>
      </table>
      {isEditedListMenu && !isListCreated && (
        <button className="add-list" onClick={hdlAddList}>
          + Add List
        </button>
      )}
    </div>
  );
};

export default Table;
