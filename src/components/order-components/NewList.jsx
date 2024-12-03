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
      priceBeforeDiscount: /^\d*\.?\d*$/,
      discount: /^\d*\.?\d*$/,
    };
    if (validateInput[name] && !validateInput[name].test(value)) return;
    if (name === "discount" && value > 100) return;

    setNewList((prv) => ({ ...prv, [name]: value }));
  };

  const hdlAddList = () => {
    // Filter key and value from newList to check white space
    const hasEmpty = Object.entries(newList).filter(
      ([key, value]) =>
        key !== "price" &&
        key !== "id" &&
        key !== "discount" &&
        (!value || value.toString().trim() === "")
    );

    // If there is any white space
    if (hasEmpty.length > 0) {
      const errors = Object.fromEntries(
        hasEmpty.map(([key]) => [key, `${key} is required`])
      );
      return setFormError(errors);
    }

    // Set Price with calculation
    const calculatedPrice = newList?.priceBeforeDiscount * newList?.number;

    const finalList = {
      ...newList,
      price: calculatedPrice,
    };

    setAllOrders((prv) => [...prv, finalList]);
    setIsListCreated(false);
  };

  console.log(newList, "new");

  return (
    <>
      <tr style={{ backgroundColor: "white" }}>
        <td>{id}</td>
        <td>
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
        <td>
          <input
            name="number"
            value={newList?.number}
            onChange={hdlChangeNewList}
            placeholder="Number"
          />
          {formError.number && <p class="error-text">{formError.number}</p>}
        </td>
        <td>
          <input
            name="weight"
            value={newList?.weight}
            onChange={hdlChangeNewList}
            placeholder="Weight"
          />
          {formError.weight && <p class="error-text">{formError.weight}</p>}
        </td>
        <td style={{ height: "100px" }}>
          <input
            name="pricePerWeight"
            value={newList?.pricePerWeight}
            onChange={hdlChangeNewList}
            placeholder="Price / Wight"
          />
          {formError.pricePerWeight && (
            <p class="error-text">{formError.pricePerWeight}</p>
          )}
        </td>
        <td>
          <select onChange={hdlChangeNewList} name="unit">
            <option defaultValue="" disabled>
              Select
            </option>
            <option value="piece">Piece</option>
            <option value="gram">Gram</option>
          </select>
          {formError.unit && <p class="error-text">{formError.unit}</p>}
        </td>
        <td>
          <input
            name="priceBeforeDiscount"
            value={newList?.priceBeforeDiscount}
            onChange={hdlChangeNewList}
            placeholder="Price Before Discount"
          />
          {formError.priceBeforeDiscount && (
            <p class="error-text">{formError.priceBeforeDiscount}</p>
          )}
        </td>
        <td>
          <input
            name="discount"
            value={newList?.discount}
            onChange={hdlChangeNewList}
            placeholder="Discount"
          />
        </td>
        <td>{newList?.priceBeforeDiscount * newList?.number}</td>

        <td>
          <div class="action-button">
            <button onClick={hdlAddList}>Confirm</button>
            <button onClick={() => setIsListCreated(false)}>Cancel</button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default NewList;
