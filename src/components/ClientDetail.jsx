import React, { useEffect, useState } from "react";
import useListStore from "../store/listStore";

const ClientDetail = () => {
  const listMenu = useListStore((state) => state.listMenu);
  const formListMenu = useListStore((state) => state.formListMenu);
  const setFormListMenu = useListStore((state) => state.setFormListMenu);
  const isEditedListMenu = useListStore((state) => state.isEditedListMenu);

  const hdlChangeFormListMenu = (e) => {
    setFormListMenu({ [e.target.name]: e.target.value });
  };

  console.log(formListMenu, "dssssssssssss");
  console.log(listMenu, "list");

  return (
    <div style={{ display: "flex", backgroundColor: "#92D0FA" }}>
      <div
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
          flexBasis: "70%",
          padding: "16px",
        }}
      >
        <input
          disabled={!isEditedListMenu}
          className="client-input"
          name="docNumber"
          value={formListMenu?.docNumber}
          onChange={hdlChangeFormListMenu}
          placeholder="หมายเลขเอกสาร"
        />
        <input
          disabled={!isEditedListMenu}
          className="client-input"
          name="issuedDate"
          value={formListMenu?.issuedDate}
          onChange={hdlChangeFormListMenu}
          placeholder="วันที่ออกเอกสาร"
        />
        <input
          disabled={!isEditedListMenu}
          className="client-input"
          name="dueDate"
          value={formListMenu?.dueDate}
          onChange={hdlChangeFormListMenu}
          placeholder="วันที่ครบกำหนด"
        />

        <input
          disabled={!isEditedListMenu}
          className="client-input"
          name="taxInvoice"
          value={formListMenu?.taxInvoice}
          onChange={hdlChangeFormListMenu}
          placeholder="ชื่อลูกค้า"
        />
        <input
          disabled={!isEditedListMenu}
          className="client-input"
          name="address"
          value={formListMenu?.address}
          onChange={hdlChangeFormListMenu}
          placeholder="ที่อยู่ออกใบกำกับ"
        />
        <input
          disabled={!isEditedListMenu}
          className="client-input"
          name="remarkNumber"
          value={formListMenu?.remarkNumber}
          onChange={hdlChangeFormListMenu}
          placeholder="ที่อยู่จัดส่ง"
        />
        <input
          disabled={!isEditedListMenu}
          className="client-input"
          name="currency"
          value={formListMenu?.currency}
          onChange={hdlChangeFormListMenu}
          placeholder="หมายเลขเอกสารอ้างอิง"
        />
        <input
          disabled={!isEditedListMenu}
          className="client-input"
          name="clientName"
          value={formListMenu?.clientName}
          onChange={hdlChangeFormListMenu}
          placeholder="Currency"
        />
      </div>
    </div>
  );
};

export default ClientDetail;
