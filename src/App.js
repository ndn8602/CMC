import Content from "./screen/Content/Content";
import ContentAdmin from "./screen/Admin/Content/Content";
import Contact from "./screen/Admin/Contact/Contact";
import Dashboard from "./screen/Admin/Dashboard";
import { SkeletonTheme } from "react-loading-skeleton";
import Signin from "./screen/Signin/Signin";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <SkeletonTheme baseColor="#B7C4CF" highlightColor="#F9F9F9">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="admin/content" element={<ContentAdmin />} />
          <Route path="admin/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
