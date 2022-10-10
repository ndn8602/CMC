import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ContentBottomChild.css";
import Skeleton from "react-loading-skeleton";
const ContentBottomChild = ({ contentBottom }) => {
  return (
    <Row>
      <Col md={3}>
        <img
          src={contentBottom.image || <Skeleton />}
          alt=""
          className="img-fluid"
        />
      </Col>
      <Col md={9}>
        <h3 data-aos="fade-down">{contentBottom.title || <Skeleton />}</h3>
      </Col>
      <Col md={12}></Col>
    </Row>
  );
};

export default ContentBottomChild;
