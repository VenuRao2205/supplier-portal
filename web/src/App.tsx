import { Routes, Route, Link, Outlet } from "react-router-dom";
import { SupplierList } from "./pages/SupplierList";
import { NewSupplier } from "./pages/NewSupplier";

function Layout() {
  return (
    <div>
      <header>
        <Link to="/suppliers">
          <b>Supplier Portal</b>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/suppliers/new" element={<NewSupplier />} />
        <Route path="*" element={<SupplierList />} />
      </Route>
    </Routes>
  );
}