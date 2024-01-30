import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  
  margin:0,
  borderColor: "red",
};

function Loader() {
  const color = "#36D7B7"; // Replace with your desired color
   // Set loading to true or false based on your logic

  return (
    <ClipLoader
      color={color}
      
      css={override}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loader;
