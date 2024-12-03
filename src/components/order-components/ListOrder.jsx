import React, { useState } from "react";

const ListOrder = ({ id, item, setAllOrders }) => {
  const [selectedList, setSelectedList] = useState(item); // Set Edited List

  const [isListEdited, setIsListEdited] = useState(false);
  const hdlDeleteList = (id) => {
    setAllOrders((prv) =>
      prv
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, id: index + 1 }))
    );
  };

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

  const hdlSaveEditedList = () => {
    setAllOrders((prv) =>
      prv.map((item) => (item.id === selectedList.id ? selectedList : item))
    );
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
          <td>{item.id}</td>
          <td>
            <input
              name="productId"
              value={selectedList.productId}
              onChange={hdlChangeEditList}
              placeholder="Product Id"
            />
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
              <option value="piece">ชิ้น</option>
              <option value="gram">กรัม</option>
            </select>
          </td>
          <td>
            {Number(netPrice).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
            {/* {selectedList?.unit === "piece"
              ? Number(
                  selectedList?.pricePerWeight * selectedList?.number
                ).toLocaleString("en-TH", {
                  timeZone: "Asia/Bangkok",
                })
              : Number(
                  selectedList?.pricePerWeight *
                    selectedList?.number *
                    selectedList?.weight
                ).toLocaleString("en-TH", {
                  timeZone: "Asia/Bangkok",
                })} */}
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
            {/* {Number(
              selectedList?.priceBeforeDiscount *
                ((100 - selectedList?.discount) / 100)
            ).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })} */}
          </td>
          <td>
            <div class="action-button">
              <button class="btn-primary" onClick={hdlSaveEditedList}>
                Confirm
              </button>
              <button
                class="btn-secondary"
                onClick={() => setIsListEdited(false)}
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{item.id}</td>
          <td>{item.productId}</td>
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
          <td>{item.unit === "gram" ? "กรัม" : "ชิ้น"}</td>
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
            <div class="action-button">
              <button
                class="btn-secondary"
                onClick={() => setIsListEdited(true)}
              >
                Edit
              </button>
              <button
                class="btn-caution"
                onClick={() => hdlDeleteList(item.id)}
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
