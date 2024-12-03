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
    setSelectedList((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSaveEditedList = () => {
    setAllOrders((prv) =>
      prv.map((item) => (item.id === selectedList.id ? selectedList : item))
    );
    setIsListEdited(false);
  };

  return (
    <>
      {isListEdited ? (
        <tr style={{ backgroundColor: "whitesmoke" }}>
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
            <select defaultValue={item.unit} name="unit">
              <option disabled>Select</option>
              <option value="piece">Piece</option>
              <option value="gram">Gram</option>
            </select>
          </td>
          <td>
            <input
              name="priceBeforeDiscount"
              value={selectedList.priceBeforeDiscount}
              onChange={hdlChangeEditList}
              placeholder="Price Before Discount"
            />
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
            {Number(
              selectedList?.priceBeforeDiscount * selectedList?.number
            ).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>
            <div class="action-button">
              <button onClick={hdlSaveEditedList}>Confirm</button>
              <button onClick={() => setIsListEdited(false)}>Cancel</button>
            </div>
          </td>
        </tr>
      ) : (
        <tr style={{ backgroundColor: "white" }}>
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
          <td>{item.unit}</td>
          <td>
            {Number(item.priceBeforeDiscount).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}
          </td>
          <td>{item.discount}</td>
          <td>
            {Number(item?.priceBeforeDiscount * item?.number).toLocaleString(
              "en-TH",
              {
                timeZone: "Asia/Bangkok",
              }
            )}
          </td>
          <td>
            <div class="action-button">
              <button onClick={() => setIsListEdited(true)}>Edit</button>
              <button onClick={() => hdlDeleteList(item.id)}>Delete</button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ListOrder;
