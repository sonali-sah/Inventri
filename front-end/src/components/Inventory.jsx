// src/components/Inventory.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchItems, createItem, deleteItem } from "../api/queries.js";

export default function Inventory() {
  const queryClient = useQueryClient();
  const [newItemName, setNewItemName] = useState("");

  // Fetch items
  const { data: items, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // Add item
  const addItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });

  // Delete item
  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries(["items"]),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items</p>;

  return (
    <div>
      <h1>Inventory</h1>

      {/* Add Item */}
      <input
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Item name"
      />
      <button
        onClick={() => {
          addItemMutation.mutate({ name: newItemName });
          setNewItemName("");
        }}
      >
        Add Item
      </button>

      {/* Item List */}
      <ul>
        {items?.map((item) => (
          <li key={item._id}>
            {item.name}{" "}
            <button onClick={() => deleteItemMutation.mutate(item._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
