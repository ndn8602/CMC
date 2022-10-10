import React from "react";
import ContentBottomChild from "../../components/ContentBottom/ContentBottomChild";

const ContentBottom = ({ data }) => {
  return (
    <div className="contentBottom">
      {data.map((contentBottom) => (
        <ContentBottomChild
          key={contentBottom.id}
          contentBottom={contentBottom}
        />
      ))}
    </div>
  );
};

export default ContentBottom;
