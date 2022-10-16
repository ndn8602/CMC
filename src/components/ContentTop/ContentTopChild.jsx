import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./ContentTopChild.css";
const ContentTopChild = ({ data }) => {
  return (
    <>
      <img src={data.image} alt="" />
      <h5 data-aos="fade-down">{data.title}</h5>
      <div className="contentTop">{ReactHtmlParser(data.content)}</div>
    </>
  );
};

export default ContentTopChild;
