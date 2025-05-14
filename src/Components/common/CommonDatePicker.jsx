import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "DD-MM-YYYY";

const CommonDatePicker = ({
  value,
  onChange,
  disabledDate,
  className,
  name,
  id,
  placeholder,
}) => {
  return (
    <DatePicker
      value={value ? dayjs(value, dateFormat) : null}
      onChange={onChange}
      name={name}
      id={id}
      inputReadOnly
      placeholder={placeholder}
      format="DD-MM-YYYY"
      disabledDate={disabledDate}
      className={className}
    />
  );
};

export default CommonDatePicker;
