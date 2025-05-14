export const filterService = [
  "Daytime Services",
  "Overnight Care",
  "24 Hour Care",
  "Location Support",
];

export const filterChildrenAgeRange = [
  "0-11 Month",
  "1-3 Yrs",
  "4-5 Yrs",
  "6-11 Yrs",
  "12+ Yrs",
];

export const filterLanguages = [
  "English",
  "Hindi",
  "French",
  "German",
  "Portuguese",
  "Spanish",
];

export const professionalSkillRadioOption = [
  "Special needs care",
  "CPR Training",
];

export const doulaFilterInitialValue = {
  monday: [{ from: "", to: "" }],
  tuesday: [{ from: "", to: "" }],
  wednesday: [{ from: "", to: "" }],
  thursday: [{ from: "", to: "" }],
  friday: [{ from: "", to: "" }],
  saturday: [{ from: "", to: "" }],
  sunday: [{ from: "", to: "" }],
};

export const USER_ROLE = {
  DOULA: 2,
  CUSTOMER: 1,
};

export const bcryptRoles = {
  1: "Jtffk9U5mhPvdtZfSOA1Mg1ALox",
  2: "6pixcvKk0Ihg7YMpBqUpR3LQRFp",
};

export const parseRoles = {
  Jtffk9U5mhPvdtZfSOA1Mg1ALox: 1,
  "6pixcvKk0Ihg7YMpBqUpR3LQRFp": 2,
};

export const formateAFor24HoursTime = {
  "12:00 AM": "12:00",
  "12:30 AM": "12:30",
  "1:00 AM": "1:00",
  "1:30 AM": "1:30",
  "2:00 AM": "2:00",
  "2:30 AM": "2:30",
  "3:00 AM": "3:00",
  "3:30 AM": "3:30",
  "4:00 AM": "4:00",
  "4:30 AM": "4:30",
  "5:00 AM": "5:00",
  "5:30 AM": "5:30",
  "6:00 AM": "6:00",
  "6:30 AM": "6:30",
  "7:00 AM": "7:00",
  "7:30 AM": "7:30",
  "8:00 AM": "8:00",
  "8:30 AM": "8:30",
  "9:00 AM": "9:00",
  "9:30 AM": "9:30",
  "10:00 AM": "10:00",
  "10:30 AM": "10:30",
  "11:00 AM": "11:00",
  "11:30 AM": "11:30",
  "12:00 PM": "12:00",
  "12:30 PM": "12:30",
  "1:00 PM": "13:00",
  "1:30 PM": "13:30",
  "2:00 PM": "14:00",
  "2:30 PM": "14:30",
  "3:00 PM": "15:00",
  "3:30 PM": "15:30",
  "4:00 PM": "16:00",
  "4:30 PM": "16:30",
  "5:00 PM": "17:00",
  "5:30 PM": "17:30",
  "6:00 PM": "18:00",
  "6:30 PM": "18:30",
  "7:00 PM": "19:00",
  "7:30 PM": "19:30",
  "8:00 PM": "20:00",
  "8:30 PM": "20:30",
  "9:00 PM": "21:00",
  "9:30 PM": "21:30",
  "10:00 PM": "22:00",
  "10:30 PM": "22:30",
  "11:00 PM": "23:00",
  "11:30 PM": "23:30",
};

export const reversFormateAFor24HoursTime = {
  "12:00:00": "12:00 AM",
  "12:30:00": "12:30 AM",
  "01:00:00": "1:00 AM",
  "01:30:00": "1:30 AM",
  "02:00:00": "2:00 AM",
  "02:30:00": "2:30 AM",
  "03:00:00": "3:00 AM",
  "03:30:00": "3:30 AM",
  "04:00:00": "4:00 AM",
  "04:30:00": "4:30 AM",
  "05:00:00": "5:00 AM",
  "05:30:00": "5:30 AM",
  "06:00:00": "6:00 AM",
  "06:30:00": "6:30 AM",
  "07:00:00": "7:00 AM",
  "07:30:00": "7:30 AM",
  "08:00:00": "8:00 AM",
  "08:30:00": "8:30 AM",
  "09:00:00": "9:00 AM",
  "09:30:00": "9:30 AM",
  "10:00:00": "10:00 AM",
  "10:30:00": "10:30 AM",
  "11:00:00": "11:00 AM",
  "11:30:00": "11:30 AM",
  "12:00:00": "12:00 PM",
  "12:30:00": "12:30 PM",
  "13:00:00": "1:00 PM",
  "13:30:00": "1:30 PM",
  "14:00:00": "2:00 PM",
  "14:30:00": "2:30 PM",
  "15:00:00": "3:00 PM",
  "15:30:00": "3:30 PM",
  "16:00:00": "4:00 PM",
  "16:30:00": "4:30 PM",
  "17:00:00": "5:00 PM",
  "17:30:00": "5:30 PM",
  "18:00:00": "6:00 PM",
  "18:30:00": "6:30 PM",
  "19:00:00": "7:00 PM",
  "19:30:00": "7:30 PM",
  "20:00:00": "8:00 PM",
  "20:30:00": "8:30 PM",
  "21:00:00": "9:00 PM",
  "21:30:00": "9:30 PM",
  "22:00:00": "10:00 PM",
  "22:30:00": "10:30 PM",
  "23:00:00": "11:00 PM",
  "23:30:00": "11:30 PM",
};

export const customerHeaderData = [
  {
    title: "My requests",
    path: "/my-requests",
  },
  {
    title: "My contracts",
    path: "/contracts",
  },
  {
    title: "Favourite",
    path: "/favourite",
  },
  {
    title: "Setting",
    path: "/profile",
  },
];

export const additionalInformation = [
  "CPR and First Aid",
  "Infant Sleep Specialist",
  "Massage Therapy",
  "Hypnobirthing Practitioner",
  "Newborn Care Specialist",
];
