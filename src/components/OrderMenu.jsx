import React from "react";
import Table from "./order-components/Table";
import useListStore from "../store/listStore";

const OrderMenu = () => {
  const listMenu = useListStore((state) => state.listMenu);
  const formListMenu = useListStore((state) => state.formListMenu);
  const setFormListMenu = useListStore((state) => state.setFormListMenu);
  const isEditedListMenu = useListStore((state) => state.isEditedListMenu);

  const hdlChangeFormListMenu = (e) => {
    setFormListMenu({ [e.target.name]: e.target.value });
  };
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
          value={formListMenu?.remark}
          disabled={!isEditedListMenu}
          onChange={hdlChangeFormListMenu}
          className="textarea-remark"
          name="remark"
          placeholder="Remark"
        ></textarea>
      </div>
    </>
  );
};

export default OrderMenu;
