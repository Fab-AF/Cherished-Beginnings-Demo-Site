import { Rate } from "antd";
import React from "react";

const CommonRating = ({
  disabled = false,
  allowHalf = false,
  value = 0,
  onChange,
}) => {
  return (
    <Rate
      allowHalf={true}
      onChange={onChange}
      disabled={disabled}
      value={value}
      style={{ color: "#9e4b34" }}
    />
  );
};

export default CommonRating;
