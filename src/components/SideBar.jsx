import React, { useState } from "react";

const SideBar = ({ allOrders }) => {
  const netPrice = allOrders.reduce((prev, curr) => {
    return (prev += curr.priceBeforeDiscount * curr.number);
  }, 0);

  const discountPrice = allOrders.reduce((prev, curr) => {
    return (prev +=
      curr.priceBeforeDiscount * curr.number * (curr.discount / 100));
  }, 0);

  const actualPrice = Number(netPrice) - Number(discountPrice);

  const vatPrice = (Number(actualPrice) * 7) / 100;

  const totalPrice = Number(actualPrice) + Number(vatPrice);

  return (
    <div class="sidebar">
      <div style={{ paddingInline: "24px" }}>
        <p style={{ fontSize: "20px" }}>สรุป</p>
        <div class="summary-list">
          <p>ราคาสุทธิ (ไม่รวมส่วนลด)</p>
          <p>
            {Number(netPrice.toFixed(2)).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div class="summary-list">
          <p>ส่วนลดท้ายบิล</p>
          <p>
            {Number(discountPrice.toFixed(2)).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div class="summary-list">
          <p>ราคาหลังหักส่วนลด</p>
          <p>
            {Number(actualPrice.toFixed(2)).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div class="summary-list">
          <p>Vat</p>
          <p>
            {Number(vatPrice.toFixed(2)).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
            paddingBlock: "4px",
            paddingInline: "8px",
            borderRadius: "8px",
            color: "#333333",
            backgroundColor: "#F1F0E8",
          }}
        >
          <p>Grand Total</p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {Number(totalPrice.toFixed(2)).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <textarea
          style={{
            width: "100%",
            height: "100px",
            resize: "none",
            border: "1px solid #91959A",
            borderRadius: "8px",
            padding: "16px",
            boxSizing: "border-box",
            marginBlock: "40px",
          }}
          name="comment"
          placeholder="Note"
        ></textarea>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingInline: "40px",
          gap: "6px",
        }}
      >
        <button class="btn-large-primary">Save</button>
        <button
          class="btn-large-secondary"
          // onClick={() => setIsListCreated(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SideBar;
