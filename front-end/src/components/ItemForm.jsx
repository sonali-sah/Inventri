import { useState } from "react";

export default function ItemForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", quantity: 0, category: "Electronics", price: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setErr("Name is required");
    setErr("");
    const payload = {
      name: form.name.trim(),
      quantity: Number(form.quantity) || 0,
      category: form.category,
      price: form.price === "" ? null : Number(form.price)
    };
    await onAdd(payload);
    setForm({ name: "", quantity: 0, category: "Electronics", price: "" });
  };

  return (
    <form className="card" onSubmit={submit}>
      <div className="row">
        <input placeholder="Item name" value={form.name}
               onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Qty" type="number" min="0" value={form.quantity}
               onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <select value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option>Electronics</option>
          <option>Clothes</option>
          <option>Food</option>
          <option>Other</option>
        </select>
        <input placeholder="Price (optional)" type="number" min="0" step="0.01"
               value={form.price}
               onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <button type="submit">Add</button>
      </div>
      {err && <p className="error">{err}</p>}
    </form>
  );
}
