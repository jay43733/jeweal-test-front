import React, { useState } from "react";
import useListStore from "../../store/listStore";

const ListOrder = ({ item, index }) => {
  const convertNumber = useListStore((state) => state.convertNumber);
  const actionUpdateList = useListStore((state) => state.actionUpdateList);
  const actionDeleteList = useListStore((state) => state.actionDeleteList);
  const actionGetListById = useListStore((state) => state.actionGetListById);
  const currentListMenu = useListStore((state) => state.currentListMenu);
  const [selectedList, setSelectedList] = useState({
    ...item,
    listMenuId: Number(currentListMenu),
  });
  const [isListEdited, setIsListEdited] = useState(false);

  const hdlDeleteList = async (id) => {
    await actionDeleteList(id);
    await actionGetListById(currentListMenu);
  };

  const [convertedSelectedList] = convertNumber(
    [selectedList],
    ["discount", "number", "pricePerWeight", "weight", "productId"]
  );


  const hdlChangeEditList = (e) => {
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
    setSelectedList((prv) => ({ ...prv, [name]: value }));
  };

  const hdlCancelEdit = () => {
    setSelectedList(item);
    setIsListEdited(false);
  };

  const hdlSaveEditedList = async (form, id) => {
    await actionUpdateList(form, id);
    await actionGetListById(currentListMenu);
    setIsListEdited(false);
  };

  // ราคาก่อนส่วนลด
  const netPrice =
    item.unit === "piece"
      ? item.pricePerWeight * item.number
      : item.pricePerWeight * item.weight * item.number;

  // ราคาสุทธิ
  const actualPrice =
    item.unit === "piece"
      ? item.pricePerWeight * item.number * ((100 - (item.discount || 0)) / 100)
      : item.pricePerWeight *
        item.weight *
        item.number *
        ((100 - (item.discount || 0)) / 100);


  return (
    <>
      {isListEdited ? (
        <tr>
          <td>{index + 1}</td>
          <td>
            <select
              onChange={hdlChangeEditList}
              defaultValue={selectedList?.productId}
              name="productId"
            >
              <option disabled>Select</option>
              <option value="4">PRO1</option>
              <option value="5">PRO2</option>
              <option value="6">PRO3</option>
              <option value="7">PRO4</option>
              <option value="8">PRO5</option>
            </select>
          </td>
          <td>
            <input
              name="number"
              value={selectedList.number}
              onChange={hdlChangeEditList}
              placeholder="Number"
            />
          </td>
          <td>
            <input
              name="weight"
              value={selectedList.weight}
              onChange={hdlChangeEditList}
              placeholder="Weight"
            />
          </td>
          <td>
            <input
              name="pricePerWeight"
              value={selectedList.pricePerWeight}
              onChange={hdlChangeEditList}
              placeholder="Price / Wight"
            />
          </td>
          <td>
            <select
              onChange={hdlChangeEditList}
              defaultValue={item.unit}
              name="unit"
            >
              <option disabled>Select</option>
              <option value="PIECE">ชิ้น</option>
              <option value="GRAM">กรัม</option>
            </select>
          </td>
          <td>
            {Number(netPrice).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>
            <input
              name="discount"
              value={selectedList.discount}
              onChange={hdlChangeEditList}
              placeholder="Discount"
            />
          </td>
          <td>
            {Number(actualPrice).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>
            <div className="action-button">
              <button
                className="btn-primary"
                onClick={() =>
                  hdlSaveEditedList(
                    convertedSelectedList,
                    convertedSelectedList.listId
                  )
                }
              >
                Confirm
              </button>
              <button className="btn-secondary" onClick={hdlCancelEdit}>
                Cancel
              </button>
            </div>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{index + 1}</td>
          <td>{item?.product?.title}</td>
          <td>
            {Number(item.number).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>
            {Number(item.weight).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>
            {Number(item.pricePerWeight).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>{item.unit === "GRAM" ? "กรัม" : "ชิ้น"}</td>
          <td>
            {netPrice.toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>{item.discount ? `${item.discount} %` : ""}</td>
          <td>
            {actualPrice.toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>
            <div className="action-button">
              <button
                className="btn-secondary"
                onClick={() => setIsListEdited(true)}
              >
                Edit
              </button>
              <button
                className="btn-caution"
                onClick={() => hdlDeleteList(item.listId)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ListOrder;
