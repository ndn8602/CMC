import React from "react";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "./Skeleton.css";
const LoadingSkeletonMid = () => {
  return (
    <Container className="skeleton">
      <Skeleton count={15} />
    </Container>
  );
};

export default LoadingSkeletonMid;
