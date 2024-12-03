import React, { useState } from "react";

const NewList = ({ setIsListCreated, setAllOrders, id }) => {
  const [newList, setNewList] = useState({
    id: id,
    productId: "",
    number: "",
    weight: "",
    pricePerWeight: "",
    unit: "",
    priceBeforeDiscount: "",
    discount: "",
    price: "",
  });

  const [formError, setFormError] = useState({});

  const hdlChangeNewList = (e) => {
    const { name, value } = e.target;
    const validateInput = {
      productId: /^[a-zA-z0-9]+$/,
      number: /^(?!0)\d*$/,
      weight: /^\d*\.?\d*$/,
      pricePerWeight: /^\d*\.?\d*$/,
      discount: /^\d*\.?\d*$/,
    };
    if (validateInput[name] && !validateInput[name].test(value)) return;
    if (name === "discount" && value > 100) return;

    setNewList((prv) => ({ ...prv, [name]: value }));
  };
  // ราคาก่อนส่วนลด
  const netPrice =
    newList.unit === "piece"
      ? newList.pricePerWeight * newList.number
      : newList.pricePerWeight * newList.weight * newList.number;

  // ราคาสุทธิ
  const actualPrice =
    newList.unit === "piece"
      ? newList.pricePerWeight *
        newList.number *
        ((100 - (newList.discount || 0)) / 100)
      : newList.pricePerWeight *
        newList.weight *
        newList.number *
        ((100 - (newList.discount || 0)) / 100);

  const hdlAddList = () => {
    // Filter key and value from newList to check white space
    const hasEmpty = Object.entries(newList).filter(
      ([key, value]) =>
        key !== "price" &&
        key !== "id" &&
        key !== "discount" &&
        key !== "priceBeforeDiscount" &&
        (!value || value.toString().trim() === "")
    );

    // If there is any white space
    if (hasEmpty.length > 0) {
      const errors = Object.fromEntries(
        hasEmpty.map(([key]) => [key, "*Required"])
      );
      return setFormError(errors);
    }

    const finalList = {
      ...newList,
      priceBeforeDiscount: netPrice,
      price: actualPrice,
    };
    setAllOrders((prv) => [...prv, finalList]);
    setIsListCreated(false);
    
  };

  const hdlCancel = () =>{
    setIsListCreated(false)
    setFormError({})
  }

  return (
    <>
      <tr>
        <td>{id}</td>
        <td class="new-list">
          <input
            name="productId"
            value={newList?.productId}
            onChange={hdlChangeNewList}
            placeholder="Product Id"
          />
          {formError?.productId && (
            <p class="error-text">{formError?.productId}</p>
          )}
        </td>
        <td class="new-list">
          <input
            name="number"
            value={newList?.number}
            onChange={hdlChangeNewList}
            placeholder="Number"
          />
          {formError.number && <p class="error-text">{formError.number}</p>}
        </td>
        <td class="new-list">
          <input
            name="weight"
            value={newList?.weight}
            onChange={hdlChangeNewList}
            placeholder="Weight"
          />
          {formError.weight && <p class="error-text">{formError.weight}</p>}
        </td>
        <td class="new-list">
          <input
            name="pricePerWeight"
            value={newList?.pricePerWeight}
            onChange={hdlChangeNewList}
            placeholder="Price / Weight"
          />
          {formError.pricePerWeight && (
            <p class="error-text">{formError.pricePerWeight}</p>
          )}
        </td>
        <td class="new-list">
          <select onChange={hdlChangeNewList} name="unit">
            <option value="" selected disabled>
              Select
            </option>
            <option value="piece">ชิ้น</option>
            <option value="gram">กรัม</option>
          </select>
          {formError.unit && <p class="error-text">{formError.unit}</p>}
        </td>
        <td class="new-list">
          {Number(netPrice).toLocaleString("en-TH", {
            timeZone: "Asia/Bangkok",
          })}
        </td>
        <td class="new-list">
          <input
            name="discount"
            value={newList?.discount}
            onChange={hdlChangeNewList}
            placeholder="Discount"
          />
        </td>
        <td>
          {" "}
          {Number(actualPrice).toLocaleString("en-TH", {
            timeZone: "Asia/Bangkok",
          })}
        </td>

        <td class="new-list">
          <div class="action-button">
            <button class="btn-primary" onClick={hdlAddList}>
              Confirm
            </button>
            <button
              class="btn-secondary"
              onClick={hdlCancel}
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default NewList;
