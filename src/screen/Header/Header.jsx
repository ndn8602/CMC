import React from "react";
import "./Header.css";
export default function Header() {
  return (
    <header className="header">
      <div className="bannerTitle">
        <h1>VIETNAM WORKED</h1>
        <p>A reliable labor source for the US market</p>
      </div>
      <div className="bannerImage d-none d-lg-block">
        <img src="./image/imageHeader.jpg" alt="" />
      </div>
    </header>
  );
}
