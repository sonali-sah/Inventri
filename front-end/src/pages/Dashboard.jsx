import { useEffect, useMemo, useState } from "react";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import ItemForm from "../components/ItemForm.jsx";
import ItemsTable from "../components/ItemsTable.jsx";

export default function Dashboard() {
  const { email, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({ sortBy: "createdAt", order: "desc" });
  const [editingItem, setEditingItem] = useState(null); // track item being edited

  const fetchItems = async (s = sort) => {
    setLoading(true);
    const { data } = await api.get("/items", { params: s });
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const onAdd = async (payload) => {
    const { data } = await api.post("/items", payload);
    setItems((prev) => [data, ...prev]);
  };

  const onUpdate = async (id, payload) => {
    const { data } = await api.put(`/items/${id}`, payload);
    setItems((prev) => prev.map((it) => (it._id === id ? data : it)));
    setEditingItem(null);
  };

  const onSort = async (field) => {
    setSort((prev) => {
      const order = prev.sortBy === field && prev.order === "asc" ? "desc" : "asc";
      const next = { sortBy: field, order };
      fetchItems(next);
      return next;
    });
  };

  const onInc = async (id) => {
    const { data } = await api.patch(`/items/${id}/quantity`, { delta: 1 });
    setItems((prev) => prev.map((it) => (it._id === id ? data : it)));
  };
  const onDec = async (id) => {
    const { data } = await api.patch(`/items/${id}/quantity`, { delta: -1 });
    setItems((prev) => prev.map((it) => (it._id === id ? data : it)));
  };
  const onDelete = async (id) => {
    await api.delete(`/items/${id}`);
    setItems((prev) => prev.filter((it) => it._id !== id));
  };

  const lowCount = useMemo(() => items.filter((i) => i.quantity < 5).length, [items]);

  return (
    <div className="container">
      <header className="topbar">
        <h2>Inventory</h2>
        <div className="spacer" />
        <div className="badge">Low stock: {lowCount}</div>
        <div className="user">
          <span>{email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      {/* If editing, show form pre-filled, else new form */}
      <ItemForm
        onAdd={onAdd}
        onUpdate={onUpdate}
        editingItem={editingItem}
        cancelEdit={() => setEditingItem(null)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ItemsTable
          items={items}
          onInc={onInc}
          onDec={onDec}
          onDelete={onDelete}
          onSort={onSort}
          sort={sort}
          onEdit={setEditingItem}   // 👈 send edit handler
        />
      )}
    </div>
  );
}
