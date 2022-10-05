import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
export default function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="./image/Logo.png" alt="" className="logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/q&a">Q&A</Nav.Link>
            <Nav.Link href="/contactus">CONTACT US</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
