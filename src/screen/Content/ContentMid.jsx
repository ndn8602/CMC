import React from "react";
import Container from "react-bootstrap/Container";
import ContentMidChild from "../../components/ContentMain/ContentMidChild";

const ContentMid = ({ datas }) => {
  return (
    <Container className="m-0">
      {datas.map((data) => (
        <ContentMidChild key={data.id} data={data} />
      ))}
    </Container>
  );
};

export default ContentMid;
