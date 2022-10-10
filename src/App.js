import Content from "./screen/Content/Content";
import ContentAdmin from "./screen/Admin/Content/Content";
import Contact from "./screen/Admin/Contact/Contact";
import Dashboard from "./screen/Admin/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#515151">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="admin/content" element={<ContentAdmin />} />
          <Route path="admin/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
