import React from "react";

const ContentMainChild = ({ contentMain }) => {
  return (
    <div>
      <h5>{contentMain.title}</h5>
      {contentMain.contents.map((content, index) => (
        <p key={index}>{content}</p>
      ))}
    </div>
  );
};

export default ContentMainChild;
