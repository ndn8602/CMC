import React from "react";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Skeleton.css";
const LoadingSkeletonTop = () => {
  return (
    <Container className="skeleton">
      <Row>
        <Col md={3}>
          <Skeleton width="100%" height={200} />
        </Col>
        <Col md={9}>
          <Skeleton count={7} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingSkeletonTop;
