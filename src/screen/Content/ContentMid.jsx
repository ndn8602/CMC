import React from "react";
import Container from "react-bootstrap/Container";
import ContentMainChild from "../../components/ContentMain/ContentMidChild";

const ContentMid = ({ data }) => {
  console.log("mid");
  console.log(data);
  return (
    <Container className="m-0">
      {data.map((ContentMain) => (
        <ContentMainChild key={ContentMain.id} contentMain={ContentMain} />
      ))}
    </Container>
  );
};

export default ContentMid;
