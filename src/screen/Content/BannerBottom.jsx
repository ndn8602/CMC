import React from "react";
import { Row, Col, Button } from "react-bootstrap";
// import { db } from "../../../firebase";
import Scrollbar from "smooth-scrollbar";
import AOS from "aos";

const BannerBottom = () => {
  const footer = document.querySelector(".footer");
  AOS.init({ delay: 500 });
  const smoothScroll = Scrollbar.init(document.getElementById("webScroll"));

  const sessionFooter = (e) => {
    smoothScroll.scrollTo(0, footer.offsetTop - 130, 1000);
  };

  return (
    <div>
      <Row style={{ height: 200, backgroundColor: "#333" }} variant="dark">
        <Col md={9}>Learn more EB3 Visa Process</Col>
        <Col md={3}>
          <Button onClick={sessionFooter}>Click here</Button>
        </Col>
      </Row>
    </div>
  );
};

export default BannerBottom;
