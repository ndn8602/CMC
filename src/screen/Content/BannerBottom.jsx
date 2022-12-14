import React from "react";
import { Row, Col, Button } from "react-bootstrap";
// import { db } from "../../../firebase";
import Scrollbar from "smooth-scrollbar";
import AOS from "aos";

const BannerBottom = (data) => {
  const footer = document.querySelector(".footer");
  AOS.init({ delay: 500 });
  const smoothScroll = Scrollbar.init(document.getElementById("webScroll"));

  const sessionFooter = (e) => {
    smoothScroll.scrollTo(0, footer.offsetTop - 130, 1000);
  };
  return (
    <div className={data.data.banner ? "banner" : "d-none"} data-aos="fade-down">
      <Row >
        <Col md={3}></Col>
        <Col md={9} className="bannerContent">
          <Row>
            <Col md={12}>
              <h3 className="bannerContent-Title">{data.data.banner}</h3>
            </Col>
            {/* <Col md={3} className="bannerButton">
              <Button onClick={sessionFooter}>Click here</Button>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default BannerBottom;
