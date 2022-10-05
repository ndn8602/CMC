import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const ContentBottomChild = ({ contentBottom }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <img src={contentBottom.image} alt="" className="img-fluid" />
          </Col>
          <Col md={8}>
            <h3>{contentBottom.title}</h3>
          </Col>
          <Col md={12}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContentBottomChild;
