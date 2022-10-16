import React from "react";
import ReactHtmlParser from "react-html-parser";
const ContentMidChild = ({ data }) => {
  console.log("main");

  return (
    <>
      <h5 data-aos="fade-down">{data.title}</h5>
      <div className="contentMid">{ReactHtmlParser(data.content)}</div>
    </>
  );
};

export default ContentMidChild;
