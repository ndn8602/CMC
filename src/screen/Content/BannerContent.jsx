import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Scrollbar from "smooth-scrollbar";
import AOS from "aos";

const Banner = () => {
  const content = document.querySelector(".content");
  AOS.init({ delay: 500 });
  const smoothScroll = Scrollbar.init(document.getElementById("webScroll"));
  const sessionContent = () => {
    smoothScroll.scrollTo(0, content.offsetTop - 130, 1000);
  };

  return (
    <div className="banner">
      <Row style={{ height: 200, backgroundColor: "#333" }} variant="dark">
        <Col md={9}>Learn more EB3 Visa Process</Col>
        <Col md={3}>
          <Button onClick={sessionContent}>Click here</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
