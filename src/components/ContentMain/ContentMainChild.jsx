import React from "react";

const ContentMainChild = ({ contentMain }) => {
  return (
    <div>
      <h5 data-aos="fade-down">{contentMain.title}</h5>
      {contentMain.contents.map((content, index) => (
        <p data-aos="fade-down" key={index}>
          {content}
        </p>
      ))}
    </div>
  );
};

export default ContentMainChild;
