import React from "react";
import { Row, Col } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import BannerBottom from "../../screen/Content/BannerBottom";
// import Banner from "../../screen/Content/Banner";
import "./ContentBottomChild.css";
const ContentBottomChild = ({ data }) => {
  return (
    <>
      <Row>
        <Col md={3}>
          <img src={data.image} alt="" className="img-fluid" />
        </Col>
        <Col md={9}>
          <h5 className="contentTitle" data-aos="fade-down">
            {data.title}
          </h5>
          <div className="contentBottom">{ReactHtmlParser(data.content)}</div>
        </Col>
      </Row>
      <BannerBottom />
    </>
  );
};

export default ContentBottomChild;
