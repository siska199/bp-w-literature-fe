import React from "react";

const Loading = () => {
  return (
    <div class="svg-loader">
      <svg class="svg-container" height="20" width="20" viewBox="0 0 100 100">
        <circle class="loader-svg bg" cx="50" cy="50" r="45"></circle>
        <circle class="loader-svg animate" cx="50" cy="50" r="45"></circle>
      </svg>
    </div>
  );
};

export default Loading;
