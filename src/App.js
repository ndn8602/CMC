import Content from "./screen/Content/Content";
import ContentAdmin from "./screen/Admin/Content/Content";
import Contact from "./screen/Admin/Contact/Contact";
import Dashboard from "./screen/Admin/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="admin/content" element={<ContentAdmin />} />
        <Route path="admin/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
