import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Header.css";
export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const listenToScroll = () => {
    let showNav = 300;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > showNav) {
      isVisible && // to limit setting state only the first time
        setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  });
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg={isVisible ? "" : "dark"}
        fixed="top"
      >
        <Container fluid className="align-items-start">
          <Navbar.Brand href="/">
            <img src="./image/Logo.png" alt="" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">HOME</Nav.Link>
              <Nav.Link href="#q&a">Q&A</Nav.Link>
              <Nav.Link href="#contact">CONTACT US</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
