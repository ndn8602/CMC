import React from "react";
import ContentMainChild from "../components/ContentMainChild";
import Container from "react-bootstrap/Container";

const ContentMain = ({ data }) => {
  return (
    <Container classname="m-0">
      {data.contentMains.map((contentMain, index) => (
        <ContentMainChild key={index} contentMain={contentMain} />
      ))}
    </Container>
  );
};

export default ContentMain;
