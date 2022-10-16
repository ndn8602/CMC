import React from "react";
import { Container } from "react-bootstrap";
import ContentTopChild from "../../components/ContentTop/ContentTopChild";
const ContentTop = ({ datas }) => {
  return (
    <div className="contentTop">
      <Container className="m-0">
        {datas.map((data) => (
          <ContentTopChild key={data.id} data={data} />
        ))}
      </Container>
    </div>
  );
};

export default ContentTop;
