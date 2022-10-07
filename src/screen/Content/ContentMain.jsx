import React from "react";
import Container from "react-bootstrap/Container";
import ContentMainChild from "../../components/ContentMain/ContentMainChild";

const ContentMain = ({ data }) => {
  return (
    <Container className="m-0">
      {data.contentMains.map((contentMain, index) => (
        <ContentMainChild key={index} contentMain={contentMain} />
      ))}
    </Container>
  );
};

export default ContentMain;
