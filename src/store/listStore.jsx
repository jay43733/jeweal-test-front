import { create } from "zustand";
import {
  createList,
  deleteList,
  editList,
  getAllList,
  getListById,
  getListMenuById,
} from "../services/ListService";
import { createJSONStorage, persist } from "zustand/middleware";

const useListStore = create((set) => ({
  lists: [],
  listMenu: [],
  currentListMenu: null,
  currentList: null,
  actionGetListMenuById: async (id) => {
    const resp = await getListMenuById(id);
    set({ listMenu: resp });
  },
  actionGetListById: async (id) => {
    const resp = await getListById(id);
    set({ lists: resp });
  },
  actionAddList: async (form) => {
    const resp = await createList(form);
    set((state) => ({
      lists: [{ ...resp }, ...state.lists],
    }));
  },
  actionDeleteList: async (id) => {
    const resp = await deleteList(id);
    set((state) => ({
      lists: state.lists.filter((item) => item.id !== id),
    }));
  },
  actionUpdateList: async (form, id) => {
    const resp = await editList(form, id);
  },
  setCurrentListMenu: (id) => {
    set({ currentListMenu: id });
  },
  convertNumber: (data) => {
    const numericFields = [
      "discount",
      "number",
      "pricePerWeight",
      "productId",
      "weight",
    ];
    return data.map((item) => {
      const convertedItem = { ...item };
      numericFields.forEach((field) => {
        convertedItem[field] = +convertedItem[field] || "";
      });
      return convertedItem;
    });
  },
}));

export default useListStore;
