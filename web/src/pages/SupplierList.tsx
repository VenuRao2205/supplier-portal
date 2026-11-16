import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getSuppliers, approveSupplier } from "../api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SupplierCard } from "../components/SupplierCard";
import type { SupplierStatus } from "../types";

export function SupplierList() {
  const qc = useQueryClient();
  const [filter, setFilter] = useLocalStorage<SupplierStatus | "All">("filter", "All");

  const { data, isLoading, error } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

 const approve = useMutation({
  mutationFn: (id: number) => approveSupplier(id),
  onSuccess: () => qc.invalidateQueries({ queryKey: ["suppliers"] }),
});

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;

  const shown = (data ?? []).filter((s) => filter === "All" || s.status === filter);

  return (
    <div>
      <div className="toolbar">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as SupplierStatus | "All")}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <Link to="/suppliers/new">+ New supplier</Link>
      </div>
      <div className="board">
        {shown.map((s) => (
          <SupplierCard key={s.id} supplier={s} onApprove={(id) => approve.mutate(id)} />
        ))}
      </div>
    </div>
  );
}