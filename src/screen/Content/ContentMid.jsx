import React from "react";
import Container from "react-bootstrap/Container";
import ContentMidChild from "../../components/ContentMain/ContentMidChild";
import BannerContent from "./BannerContent";
// import Banner from "./Banner";
const ContentMid = ({ datas }) => {
  // const dataBanner = data.banners.filter((banner) => banner.position === "Mid");
  return (
    <>
      <Container className="contentMid">
        {datas.map((data) => (
          <ContentMidChild key={data.id} data={data} />
        ))}
        <div className="">
          <BannerContent />
        </div>
      </Container>
    </>
  );
};

export default ContentMid;
