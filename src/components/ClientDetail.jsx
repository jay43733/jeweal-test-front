import React, { useState } from "react";

const ClientDetail = () => {
  const [form, setForm] = useState({
    docNumber: "",
    issuedDate: "",
    dueDate: "",
    clientName: "",
    taxInvoice: "",
    address: "",
    remarkNumber: "",
    currency: "",
  });

  const [isEdited, setIsEdited] = useState(false);

  const hdlChangeForm = (e) => {
    setForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };


  return (
    <div style={{ display: "flex", backgroundColor: "#ffff" }}>
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
          className="client-input"
          name="docNumber"
          value={form?.docNumber}
          onChange={hdlChangeForm}
          placeholder="หมายเลขเอกสาร"
        />
        <input
          className="client-input"
          name="issuedDate"
          value={form?.issuedDate}
          onChange={hdlChangeForm}
          placeholder="วันที่ออกเอกสาร"
        />
        <input
          className="client-input"
          name="dueDate"
          value={form?.dueDate}
          onChange={hdlChangeForm}
          placeholder="วันที่ครบกำหนด"
        />
    
        <input
          className="client-input"
          name="taxInvoice"
          value={form?.taxInvoice}
          onChange={hdlChangeForm}
          placeholder="ชื่อลูกค้า"
        />
        <input
          className="client-input"
          name="address"
          value={form?.address}
          onChange={hdlChangeForm}
          placeholder="ที่อยู่ออกใบกำกับ"
        />
        <input
          className="client-input"
          name="remarkNumber"
          value={form?.remarkNumber}
          onChange={hdlChangeForm}
          placeholder="ที่อยู่จัดส่ง"
        />
        <input
          className="client-input"
          name="currency"
          value={form?.currency}
          onChange={hdlChangeForm}
          placeholder="หมายเลขเอกสารอ้างอิง"
        />
         <input
          className="client-input"
          name="clientName"
          value={form?.clientName}
          onChange={hdlChangeForm}
          placeholder="Currency"
        />
      </div>
    </div>
  );
};

export default ClientDetail;
