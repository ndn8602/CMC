import Content from "./screen/Content/Content";
import Dashboard from "./screen/Admin/Dashboard";
import Signup from "./screen/Signup/Signup";
import Signin from "./screen/Signin/Signin";
import ProtectRouteAdmin from "./screen/Admin/ProtectRouteAdmin";
import { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./screen/Header/Header.css";
import Contact from "./screen/Admin/Contact/Contact";
import ContentAdmin from "./screen/Admin/Content/Content";
import UpdateContent from "./screen/Admin/Content/UpdateContent";
import BannerAdmin from "./screen/Admin/Banner/BannerAdmin";

function App() {
  return (
    <SkeletonTheme baseColor="#B7C4CF" highlightColor="#F9F9F9">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route
            path="/admin"
            element={
              <ProtectRouteAdmin>
                <Dashboard />
              </ProtectRouteAdmin>
            }
          />
          <Route path="admin/contact" element={<Contact />} />
          <Route path="/*" element={<Content />} />
          <Route path="admin/content" element={<ContentAdmin />} />
          <Route path="admin/content/:id" element={<UpdateContent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
