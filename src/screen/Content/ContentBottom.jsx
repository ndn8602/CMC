import React from "react";
import { Container } from "react-bootstrap";
import ContentBottomChild from "../../components/ContentBottom/ContentBottomChild";

const ContentBottom = ({ datas }) => {
  return (
    <Container>
      {datas.map((data) => (
        <ContentBottomChild key={data.id} data={data} />
      ))}
    </Container>
  );
};

export default ContentBottom;
