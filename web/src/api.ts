import type { Supplier } from "./types";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function getSuppliers(): Promise<Supplier[]> {
  const res = await fetch(`${BASE}/suppliers`);
  if (!res.ok) throw new Error("Failed to load suppliers");
  return res.json();
}

export async function approveSupplier(id: number): Promise<Supplier> {
  const res = await fetch(`${BASE}/suppliers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Approved" }),
  });
  if (!res.ok) throw new Error("Approve failed");
  return res.json();
}

export async function createSupplier(input: { name: string; email: string }): Promise<Supplier> {
  const res = await fetch(`${BASE}/suppliers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, status: "Pending" }),
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
}