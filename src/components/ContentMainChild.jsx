import React from "react";
import Container from "react-bootstrap/Container";

const ContentMainChild = ({ contentMain }) => {
  return (
    <Container>
      <h5>{contentMain.title}</h5>
      {contentMain.contents.map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </Container>
  );
};

export default ContentMainChild;
