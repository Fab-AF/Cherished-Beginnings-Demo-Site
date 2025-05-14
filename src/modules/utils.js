import { toast } from "react-toastify";
import {
  formateAFor24HoursTime,
  reversFormateAFor24HoursTime,
} from "./staticData";
import moment from "moment";
import { getAuthToken } from "./authentication";

export const successMeg = (meg) => {
  toast.success(meg);
};

export const errorMeg = (meg) => {
  toast.error(meg);
};

export const numberValidation = {
  min: {
    value: 0,
    message: "Min 0 children allowed",
  },
  max: {
    value: 4,
    message: "Max 4 children allowed",
  },
  validate: (value) => value >= 0 || "Number must be greater than 0",
};

export const phoneNumberValidation = {
  validate: {
    isNumber: (value) =>
      /^\d{10}$/.test(value) || "Phone number must be exactly 10 digits",
  },
};

export const zipCodeValidation = {
  pattern: {
    value: /^[0-9]+$/,
    message: "Zip code must only contain numbers",
  },
};

export const nameValidation = {
  pattern: {
    value: /^[A-Za-z]+$/,
    message: "First name should contain only letters",
  },
  minLength: {
    value: 2,
    message: "First name should have at least 2 characters",
  },
  maxLength: {
    value: 30,
    message: "First name should have at most 30 characters",
  },
};

export const emailValidation = {
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email address",
  },
};

export const timesFormate = [
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

export const firstLatterCapital = (value) => {
  return value?.charAt(0)?.toUpperCase() + value?.slice(1);
};

export const child_info_data = {
  Singleton: 1,
  Twins: 2,
  Triplets: 3,
};

export const yearOption = (
  startYear = 1900,
  endYear = new Date().getFullYear()
) => {
  const year = [];
  for (let index = startYear; index <= endYear; index++) {
    year.push(index);
  }
  return year;
};

export const getShortNameForDays = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wen",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export const formateTime = (time) => {
  return time?.split(":")?.slice(0, 2)?.join(":");
};

export const getValue12HorseTo24Horse = (data, flag = 1) => {
  return data?.map((value) => {
    const from = (
      flag ? formateAFor24HoursTime : reversFormateAFor24HoursTime
    )?.[value?.from];
    const to = (flag ? formateAFor24HoursTime : reversFormateAFor24HoursTime)?.[
      value?.to
    ];
    return {
      from,
      to,
    };
  });
};

export const getParamsValue = (data) => {
  const result = {};
  Object.keys(data).map((key) => {
    if (!!data[key] || key === "page") {
      result[key] = data[key];
    }
  });
  return result;
};

export const capitalizeFirstLatter = ([first, ...rest]) => {
  return [first.toUpperCase(), ...rest]?.join("");
};

export const isValidArray = (data) =>
  data && Array.isArray(data) && data.length > 0;

export const isValidObject = (data) =>
  data && typeof data === "object" ? Object.keys(data).length > 0 : false;

export const truncateString = (str, maxLength = 100) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str || "-";
};

export const getFirstNameAndLastName = (value) => {
  const name = value?.split(" ");
  return { first_name: name[0], last_name: name[1] || name[0] };
};

export const wait = async (time = 5000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const timeSince = (date) => {
  var a = moment(); //now
  var b = moment.utc(date);
  const sec = a.diff(b, "seconds");
  const minuts = a.diff(b, "minutes");
  const hours = a.diff(b, "hours");
  const days = a.diff(b, "days");
  const months = a.diff(b, "months");
  const years = a.diff(b, "year");
  return years === 0
    ? months == 0
      ? days == 0
        ? hours == 0
          ? minuts == 0
            ? sec >= 0 && `${sec}s ago`
            : `${minuts}m ago`
          : `${hours}h ago`
        : `${days}d ago`
      : `${months}months ago`
    : `${years} year ago`;
};

export function removeNullKeys(obj) {
  // Loop through the keys of the object
  for (let key in obj) {
    // Check if the value is null or an empty string
    if (obj[key] === null || obj[key] === "") {
      // If so, delete the key
      delete obj[key];
    }
  }
  return obj;
}

export const handleNumber = (data) => {
  let value = data?.replace(/\D/g, ""); // Remove non-digit characters

  if (value?.length > 10) {
    value = value?.slice(0, 10); // Limit to 10 digits
  }

  let formattedValue = value;
  if (value?.length > 6) {
    formattedValue = `(${value?.slice(0, 3)}) ${value?.slice(
      3,
      6
    )}-${value?.slice(6)}`;
  } else if (value?.length > 3) {
    formattedValue = `(${value?.slice(0, 3)}) ${value?.slice(3)}`;
  } else if (value?.length > 0) {
    formattedValue = `(${value}`;
  }

  return formattedValue;
};

export const withOutLoginServiceAccess = () => {
  const token = getAuthToken();

  if (!token) {
    toast.error(
      "Access Denied: You must be logged in to access this resource."
    );
    return false;
  }

  return true;
};

export const getCurrentWeekDates = () => {
  const currentDate = new Date();
  const firstDay = currentDate.getDate() - currentDate.getDay();
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.setDate(firstDay + i));
    weekDates.push(date);
  }

  return weekDates;
};
