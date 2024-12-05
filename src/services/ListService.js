import axios from "../config/axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getListMenuById = async (id) => {
  try {
    const response = await axios.get(`/listmenu/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching list:", error.message);
  }
};

export const getListById = async (id) => {
  try {
    const response = await axios.get(`/list/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching list:", error.message);
  }
};

export const updateListMenuById = async (form, id) => {
  try {
    const response = await axios.patch(`/listmenu/${id}`, form);
    return response.data;
  } catch (error) {
    console.error("Error fetching list:", error.message);
  }
};

export const getAllList = async () => {
  try {
    const response = await axios.get("/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching list:", error.message);
  }
};

export const createList = async (form) => {
  try {
    const response = await axios.post("/list", form);
    return response.data;
  } catch (error) {
    console.error("Error fetching list:", error.message);
  }
};

export const deleteList = async (id) => {
  try {
    const response = await axios.delete(`/list/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching list:", error.message);
  }
};

export const editList = async (form, id) => {
  try {
    const response = await axios.patch(`/list/${id}`, form);
    return response.data;
  } catch (error) {
    console.error("Error fetching list:", error.message);
  }
};

export const getListMenu = async () => {
  try {
    const response = await axios.get(`/list/${id}`, form);
    return response.data;
  } catch (error) {
    console.error("Error fetching list:", error.message);
  }
};
