import React from "react";
import { Row, Col } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
const ContentMidChild = ({ data }) => {
  return (
    <Row>
      <Col md={3}>
        {" "}
        <img src={data.image} alt="" className="img-fluid" />
      </Col>
      <Col md={9}>
        <h5 data-aos="fade-down">{data.title}</h5>
        <div className="contentMid">{ReactHtmlParser(data.content)}</div>
      </Col>
    </Row>
  );
};

export default ContentMidChild;
