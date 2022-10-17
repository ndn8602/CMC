import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Skeleton.css";
const LoadingSkeletonTop = () => {
  return (
    <Container className="">
      <Row>
        <Col md={3}>
          <Skeleton width="100%" height={200} />
        </Col>
        <Col md={9}>
          <Skeleton count={10} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingSkeletonTop;
