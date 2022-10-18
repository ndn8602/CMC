import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Scrollbar from "smooth-scrollbar";
import AOS from "aos";

const BannerContent = () => {
  const content = document.querySelector(".content");
  AOS.init({ delay: 500 });
  const smoothScroll = Scrollbar.init(document.getElementById("webScroll"));
  const sessionContent = () => {
    smoothScroll.scrollTo(0, content.offsetTop - 130, 1000);
  };

  return (
    <div className="banner">
      <Row>
        <Col md={9}>
          <h3 className="bannerContent-Title">Learn more EB3 Visa Process</h3>
        </Col>
        <Col md={3} className="bannerButton">
          <Button onClick={sessionContent}>Click here</Button>
        </Col>
      </Row>
    </div>
  );
};

export default BannerContent;
