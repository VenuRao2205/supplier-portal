import type { Supplier } from "../types";

interface Props {
  supplier: Supplier;
  onApprove: (id: number) => void;
}

export function SupplierCard({ supplier, onApprove }: Props) {
  return (
    <div className="card">
      <h3>{supplier.name}</h3>
      <span className={`status ${supplier.status.toLowerCase()}`}>{supplier.status}</span>
      {supplier.status === "Pending" && (
        <button onClick={() => onApprove(supplier.id)}>Approve</button>
      )}
    </div>
  );
}