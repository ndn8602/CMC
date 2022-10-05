import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const ContentTopChild = ({ contentTop }) => {
  const contents = contentTop.contents.filter((content, index) => index !== 0);
  console.log(contents);

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <img src={contentTop.image} alt="" className="img-fluid" />
          </Col>
          <Col md={8}>
            <h3>{contentTop.title}</h3>
            <p>{contentTop.contents[0]}</p>
          </Col>
          <Col md={12}>
            {contents.map((content, index) => (
              <p key={index}>{content}</p>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContentTopChild;
