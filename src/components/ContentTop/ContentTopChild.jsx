import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Skeleton from "react-loading-skeleton";
import "./ContentTopChild.css";
const ContentTopChild = ({ contentTop }) => {
  return (
    <Row className="m-0">
      <Col md={2}>
        {<img src={contentTop.image} alt="" className="img-fluid" /> || (
          <Skeleton count={5} />
        )}
      </Col>
      <Col md={10}>
        <h3 data-aos="fade-down">{contentTop.title}</h3>
        {contentTop.contents.map((content, index) => (
          <p key={index} data-aos="fade-down">
            {content || <Skeleton count={5} />}
          </p>
        ))}
      </Col>
    </Row>
  );
};

export default ContentTopChild;
