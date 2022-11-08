import React from "react";
import Container from "react-bootstrap/Container";
import ContentMidChild from "../../components/ContentMain/ContentMidChild";
// import Banner from "./Banner";
const ContentMid = ({ datas }) => {
  // const dataBanner = data.banners.filter((banner) => banner.position === "Mid");
  return (
    <>
      <Container className="contentMid">
        {datas.map((data) => (
          <ContentMidChild key={data.id} data={data} />
        ))}
      </Container>
    </>
  );
};

export default ContentMid;
