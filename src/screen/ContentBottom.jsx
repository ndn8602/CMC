import React from "react";
import ContentBottomChild from "../components/ContentBottomChild";

const ContentBottom = ({ data }) => {
  return (
    <div>
      {data.contentBottoms.map((contentBottom) => (
        <ContentBottomChild
          key={contentBottom.No}
          contentBottom={contentBottom}
        />
      ))}
    </div>
  );
};

export default ContentBottom;
