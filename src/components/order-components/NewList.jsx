import React, { useState } from "react";
import useListStore from "../../store/listStore";
import { toast } from "react-toastify";

const NewList = ({ setIsListCreated, setAllOrders, id }) => {
  const convertNumber = useListStore((state) => state.convertNumber);
  const actionAddList = useListStore((state) => state.actionAddList);
  const actionGetListById = useListStore((state) => state.actionGetListById);
  const lists = useListStore((state)=>state.lists)
  const currentListMenu = useListStore((state) => state.currentListMenu);

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
    listMenuId: Number(currentListMenu),
  });

  // Convert the decimal fields to numbers
  const [convertedNewList] = convertNumber(
    [newList],
    [
      "discount",
      "number",
      "pricePerWeight",
      "weight",
      "productId",
      "listMenuId",
    ]
  );


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

  const hdlAddList = async () => {
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
    await actionAddList(convertedNewList);
    await actionGetListById(currentListMenu);
    setIsListCreated(false);
    toast.success("Created List Successfully")
  };

  const hdlCancel = () => {
    setIsListCreated(false);
    setFormError({});
  };
  return (
    <>
      <tr>
        <td>{id}</td>
        <td className="new-list">
          <select defaultValue="" onChange={hdlChangeNewList} name="productId">
            <option value="" disabled>
              Select
            </option>
            <option value="1">PRO1</option>
            <option value="2">PRO2</option>
            <option value="3">PRO3</option>
            <option value="4">PRO4</option>
            <option value="5">PRO5</option>
          </select>
          {formError?.productId && (
            <p className="error-text">{formError?.productId}</p>
          )}
        </td>
        <td className="new-list">
          <input
            name="number"
            value={newList?.number}
            onChange={hdlChangeNewList}
            placeholder="Number"
          />
          {formError.number && <p className="error-text">{formError.number}</p>}
        </td>
        <td className="new-list">
          <input
            name="weight"
            value={newList?.weight}
            onChange={hdlChangeNewList}
            placeholder="Weight"
          />
          {formError.weight && <p className="error-text">{formError.weight}</p>}
        </td>
        <td className="new-list">
          <input
            name="pricePerWeight"
            value={newList?.pricePerWeight}
            onChange={hdlChangeNewList}
            placeholder="Price / Weight"
          />
          {formError.pricePerWeight && (
            <p className="error-text">{formError.pricePerWeight}</p>
          )}
        </td>
        <td className="new-list">
          <select onChange={hdlChangeNewList} defaultValue="" name="unit">
            <option value="" disabled>
              Select
            </option>
            <option value="PIECE">ชิ้น</option>
            <option value="GRAM">กรัม</option>
          </select>
          {formError.unit && <p className="error-text">{formError.unit}</p>}
        </td>
        <td className="new-list">
          {Number(netPrice).toLocaleString("en-TH", {
            timeZone: "Asia/Bangkok",
          })}
        </td>
        <td className="new-list">
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

        <td className="new-list">
          <div className="action-button">
            <button className="btn-primary" onClick={hdlAddList}>
              Confirm
            </button>
            <button className="btn-secondary" onClick={hdlCancel}>
              Cancel
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default NewList;
