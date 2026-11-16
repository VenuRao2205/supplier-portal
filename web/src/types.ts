export type SupplierStatus = "Pending" | "Approved" | "Rejected";

export interface Supplier {
  id: number;
  name: string;
  email: string;
  status: SupplierStatus;
}