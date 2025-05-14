import React from "react";

const CommonImage = ({ src, className, height, width }) => {
  const handleErrorImage = (e) => {
    e.target.src = "https://picsum.photos/200/300";
  };
  return (
    <img
      src={src}
      width={width}
      height={height}
      className={className}
      alt={src}
      onError={handleErrorImage}
    />
  );
};

export default CommonImage;
