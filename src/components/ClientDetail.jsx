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
    console.log(form,"form")
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
          class="client-input"
          name="docNumber"
          value={form?.docNumber}
          onChange={hdlChangeForm}
          placeholder="หมายเลขเอกสาร"
        />
        <input
          class="client-input"
          name="issuedDate"
          value={form?.issuedDate}
          onChange={hdlChangeForm}
          placeholder="วันที่ออกเอกสาร"
        />
        <input
          class="client-input"
          name="dueDate"
          value={form?.dueDate}
          onChange={hdlChangeForm}
          placeholder="วันที่ครบกำหนด"
        />
    
        <input
          class="client-input"
          name="taxInvoice"
          value={form?.taxInvoice}
          onChange={hdlChangeForm}
          placeholder="ชื่อลูกค้า"
        />
        <input
          class="client-input"
          name="address"
          value={form?.address}
          onChange={hdlChangeForm}
          placeholder="ที่อยู่ออกใบกำกับ"
        />
        <input
          class="client-input"
          name="remarkNumber"
          value={form?.remarkNumber}
          onChange={hdlChangeForm}
          placeholder="ที่อยู่จัดส่ง"
        />
        <input
          class="client-input"
          name="currency"
          value={form?.currency}
          onChange={hdlChangeForm}
          placeholder="หมายเลขเอกสารอ้างอิง"
        />
         <input
          class="client-input"
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
