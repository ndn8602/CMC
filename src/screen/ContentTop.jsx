import React from "react";
import ContentTopChild from "../components/ContentTopChild";

const ContentTop = ({data}) => {
  return (
    <div>
      {data.contentTops.map((contentTop) => (
        <ContentTopChild
          key={contentTop.No}
          contentTop={contentTop}
        ></ContentTopChild>
      ))}
    </div>
  );
};

export default ContentTop;
