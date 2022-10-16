import React from "react";
import Container from "react-bootstrap/Container";
import ContentMidChild from "../../components/ContentMain/ContentMidChild";

const ContentMid = ({ datas }) => {
  return (
    <Container className="contentMid">
      {datas.map((data) => (
        <ContentMidChild key={data.id} data={data} />
      ))}
    </Container>
  );
};

export default ContentMid;
