import React from "react";
import ContentBottomChild from "../../components/ContentBottom/ContentBottomChild";

const ContentBottom = ({ data }) => {
  return (
    <div className="contentBottom">
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
