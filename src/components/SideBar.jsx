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

  console.log(netPrice, "all");
  console.log(discountPrice, "dis");
  console.log(actualPrice, "act");
  console.log(vatPrice, "vat");
  return (
    <div class="sidebar">
      <div style={{ paddingInline: "24px" }}>
        <p style={{ fontSize: "20px" }}>สรุป</p>
        <div class="summary-list">
          <p>ราคาสุทธิ</p>
          <p>
            {Number(netPrice).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div class="summary-list">
          <p>ส่วนลดท้ายบิล</p>
          <p>
            {Number(discountPrice).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div class="summary-list">
          <p>ราคาหลังหักส่วนลด</p>
          <p>
            {Number(actualPrice).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div class="summary-list">
          <p>Vat</p>
          <p>
            {Number(vatPrice).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
            paddingBlock: "4px",
            paddingInline: "16px",
            borderRadius: "8px",
            color: "#333333",
            backgroundColor: "#F1F0E8",
          }}
        >
          <p>Grand Total</p>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {Number(totalPrice).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
