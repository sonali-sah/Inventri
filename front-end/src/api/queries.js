// src/api/queries.js
import api from "./api.js";

// export const fetchItems = async () => {
//   const { data } = await api.get("/items");
//   return data;
// };


// GET items
export const fetchItems = async () => {
  const { data } = await api.get("/items");
  return data;
};

// POST new item
export const createItem = async (item) => {
  const { data } = await api.post("/items", item);
  return data;
};

// DELETE item
export const deleteItem = async (id) => {
  const { data } = await api.delete(`/items/${id}`);
  return data;
};
