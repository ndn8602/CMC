import React from "react";
import ContentMainChild from "../components/ContentMainChild";

const ContentMain = ({ data }) => {
  return (
    <div>
      {data.contentMains.map((contentMain, index) => (
        <ContentMainChild key={index} contentMain={contentMain} />
      ))}
    </div>
  );
};

export default ContentMain;
