export default function ItemsTable({ items, onInc, onDec, onDelete, onSort, sort }) {
  const th = (field, label) => (
    <th onClick={() => onSort(field)} style={{ cursor: "pointer" }}>
      {label} {sort.sortBy === field ? (sort.order === "asc" ? "▲" : "▼") : ""}
    </th>
  );

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {th("name", "Name")}
            {th("category", "Category")}
            {th("quantity", "Qty")}
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No items yet</td></tr>
          )}
          {items.map((it) => {
            const low = it.quantity < 5;
            return (
              <tr key={it._id} className={low ? "low" : ""} title={low ? "Low stock" : ""}>
                <td>{it.name}</td>
                <td>{it.category}</td>
                <td>
                  <div className="qty">
                    <button onClick={() => onDec(it._id)} disabled={it.quantity <= 0}>−</button>
                    <span>{it.quantity}</span>
                    <button onClick={() => onInc(it._id)}>+</button>
                  </div>
                </td>
                <td>{it.price != null ? `₹${Number(it.price).toFixed(2)}` : "-"}</td>
                <td>
                  <button className="danger" onClick={() => onDelete(it._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
