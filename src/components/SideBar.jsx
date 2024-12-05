import { useEffect } from "react";
import useListStore from "../store/listStore";

const SideBar = () => {
  const currentListMenu = useListStore((state) => state.currentListMenu);
  const formListMenu = useListStore((state) => state.formListMenu);
  const listMenu = useListStore((state)=>state.listMenu)
  const setFormListMenu = useListStore((state) => state.setFormListMenu);
  const isEditedListMenu = useListStore((state) => state.isEditedListMenu);
  const setIsEditedListMenu = useListStore(
    (state) => state.setIsEditedListMenu
  );
  const actionUpdateListMenuById = useListStore(
    (state) => state.actionUpdateListMenuById
  );
  const actionGetListMenuById = useListStore(
    (state) => state.actionGetListMenuById
  );

  const hdlChangeFormListMenu = (e) => {
    setFormListMenu({ [e.target.name]: e.target.value });
  };
  const lists = useListStore((state) => state.lists);
  const actualPrice = lists.reduce((prev, curr) => {
    return (prev += +curr.actualPrice);
  }, 0);

  const discountPrice = lists.reduce((prev, curr) => {
    return (prev += (+curr.actualPrice * (curr.discount || 0)) / 100);
  }, 0);

  const netPrice = Number(actualPrice) - Number(discountPrice);

  const vatPrice = (Number(netPrice) * 7) / 100;

  const totalPrice = Number(netPrice) + Number(vatPrice);

  const hdlSaveUpdateListMenu = async (form, id) => {
    await actionUpdateListMenuById(form, id);
    await actionGetListMenuById(id);
    setIsEditedListMenu(false);
  };

  useEffect(()=>{
    if (!isEditedListMenu && listMenu) {
      setFormListMenu({ ...listMenu });
    }
  },[listMenu])

  return (
    <div className="sidebar">
      <div style={{ paddingInline: "24px" }}>
        <p style={{ fontSize: "20px" }}>สรุป</p>
        <div className="summary-list">
          <p>ราคาสุทธิ (ไม่รวมส่วนลด)</p>
          <p>
            {Number(actualPrice.toFixed(2)).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div className="summary-list">
          <p>ส่วนลดท้ายบิล</p>
          <p>
            {Number(discountPrice.toFixed(2)).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div className="summary-list">
          <p>ราคาหลังหักส่วนลด</p>
          <p>
            {Number(netPrice.toFixed(2)).toLocaleString("en-TH", {
              timeZone: "Asia/Bangkok",
            })}{" "}
            THB
          </p>
        </div>
        <div className="summary-list">
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
            paddingInline: "12px",
            borderRadius: "8px",
            color: "#333333",
            backgroundColor: "#FFFFFF",
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
          value={formListMenu?.note}
          disabled={!isEditedListMenu}
          onChange={hdlChangeFormListMenu}
          className="textarea-note"
          name="note"
          placeholder="Note"
        ></textarea>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingInline: "16px",
          gap: "6px",
        }}
      >
        {isEditedListMenu ? (
          <button
            onClick={() => hdlSaveUpdateListMenu(formListMenu, currentListMenu)}
            className="btn-large-primary"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditedListMenu(true)}
            className="btn-large-primary"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
export default SideBar;
