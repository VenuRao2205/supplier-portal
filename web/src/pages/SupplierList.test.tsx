import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { SupplierList } from "./SupplierList";
import * as api from "../api";

vi.mock("../api");

test("approving a pending supplier calls the API", async () => {
  vi.mocked(api.getSuppliers).mockResolvedValue([
    { id: 1, name: "Acme", email: "a@a.test", status: "Pending" },
  ]);
  vi.mocked(api.approveSupplier).mockResolvedValue({
    id: 1,
    name: "Acme",
    email: "a@a.test",
    status: "Approved",
  });

  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <SupplierList />
      </MemoryRouter>
    </QueryClientProvider>
  );

  await userEvent.click(await screen.findByRole("button", { name: /approve/i }));
  expect(api.approveSupplier).toHaveBeenCalledWith(1);
});