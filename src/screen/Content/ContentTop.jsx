import React from "react";
import ContentTopChild from "../../components/ContentTop/ContentTopChild";

const ContentTop = ({ data }) => {
  console.log("top");
  console.log(data);
  return (
    <div className="contentTop">
      {data.map((contentTop) => (
        <ContentTopChild
          key={contentTop.id}
          contentTop={contentTop}
        ></ContentTopChild>
      ))}
    </div>
  );
};

export default ContentTop;
