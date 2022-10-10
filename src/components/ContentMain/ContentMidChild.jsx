import React from "react";
import Skeleton from "react-loading-skeleton";

const ContentMainChild = ({ contentMain }) => {
  return (
    <div>
      <h5 data-aos="fade-down">{contentMain.title}</h5>
      {contentMain.contents.map((content, index) => (
        <p data-aos="fade-down" key={index}>
          {content || <Skeleton />}
        </p>
      ))}
    </div>
  );
};

export default ContentMainChild;
