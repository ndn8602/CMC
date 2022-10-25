import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Row, Col } from "react-bootstrap";
import "./ContentTopChild.css";
const ContentTopChild = ({ data }) => {
  return (
    <Row>
      <Col md={3}>
        <img src={data.image} alt="" className="img-fluid" data-aos="fade-down" data-aos-duration="1600"/>
      </Col>
      <Col md={9}>
        <h5 className="contentTitle" data-aos="fade-down">
          {data.title}
        </h5>
        <div className="contentTop">{ReactHtmlParser(data.content)}</div>
      </Col>
    </Row>
  );
};

export default ContentTopChild;
