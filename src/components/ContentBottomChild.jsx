import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ContentBottomChild.css";
const ContentBottomChild = ({ contentBottom }) => {
  return (
    <Row>
      <Col md={3}>
        <img src={contentBottom.image} alt="" className="img-fluid" />
      </Col>
      <Col md={9}>
        <h3>{contentBottom.title}</h3>
      </Col>
      <Col md={12}></Col>
    </Row>
  );
};

export default ContentBottomChild;
