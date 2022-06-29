import React from "react";

const Review = (props) => {
  return (
    <>
      <h1>Review</h1>
      <button onClick={props.previousStep}>Back</button>
    </>
  );
};

export default Review;
