import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/customers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customers />} />
      </Routes>
    </BrowserRouter>
  );
}
