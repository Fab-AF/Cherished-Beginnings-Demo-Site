// import React from "react";
// import "./Calendar.css";
// import { getCurrentWeekDates } from "@/modules/utils";
// import moment from "moment";
// import { formateAFor24HoursTime } from "@/modules/staticData";

// const CalendarPage = () => {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const dates = ["3", "4", "5", "6", "7", "8", "9"];
//   const times = ["08:00 pm", "12:00 pm", "04:00 am"];

//   const activeSlots = {
//     Sun: ["08:00 pm"],
//     Mon: ["04:00 pm"],
//     Wed: ["12:00 pm"],
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col">
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <button className="btn btn-light">&lt;</button>
//             <h5 className="text-center">Feb 3–9, 2024</h5>
//             <button className="btn btn-light">&gt;</button>
//           </div>
//           <div className="d-flex justify-content-end">
//             <button className="btn btn-primary me-2">Today</button>
//             <button className="btn btn-outline-primary">Week</button>
//           </div>
//         </div>
//       </div>
//       <div className="row mt-3">
//         {days.map((day, index) => (
//           <div key={index} className="col text-center">
//             {day} <br />{" "}
//             {moment(getCurrentWeekDates()[index]).format("DD/MM/YYYY")}
//           </div>
//         ))}
//       </div>
//       {Object.keys(formateAFor24HoursTime)?.map((time, timeIndex) => (
//         <div key={timeIndex} className="row mt-2">
//           {days.map((day, dayIndex) => (
//             <div
//               key={dayIndex}
//               className={`col text-center time-slot ${
//                 activeSlots[dayIndex] ? "active" : ""
//               }`}
//             >
//               {time}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CalendarPage;
"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CommonModal from "../common/CommonModal";
import { errorMeg, successMeg } from "@/modules/utils";
import { postApi } from "@/Redux/api";
import { useParams } from "next/navigation";
import { getUserRole } from "@/modules/authentication";

const localizer = momentLocalizer(moment);

// Helper function to get random time
// const getRandomTime = () => {
//   const hour = Math.floor(Math.random() * 9) + 8; // Random hour between 8 AM and 5 PM
//   const minute = Math.random() > 0.5 ? "00" : "30"; // Randomly choose 00 or 30 minutes
//   return `${hour}:${minute}`;
// };

// // Helper function to get random end time based on start time
// const getEndTime = (startTime) => {
//   const [startHour, startMinute] = startTime.split(":").map(Number);
//   const endHour = startHour + 1; // Events are 1 hour long
//   return `${endHour}:${startMinute === 0 ? "00" : startMinute}`;
// };

// // Helper function to generate random titles
// const getRandomTitle = () => {
//   const titles = [
//     "Meeting",
//     "Workshop",
//     "Conference",
//     "Break",
//     "Team Sync",
//     "Lunch",
//   ];
//   return titles[Math.floor(Math.random() * titles.length)];
// };

// // Helper function to generate random dates within the current week
// const getRandomDateForThisWeek = (dayOffset) => {
//   const today = new Date();
//   const firstDayOfWeek = today.getDate() - today.getDay(); // Get Sunday of this week
//   const randomDay = new Date(today.setDate(firstDayOfWeek + dayOffset)); // Random day of the week
//   return randomDay;
// };

// // Generate 10 random events for the current week
// const generateRandomData = () => {
//   const events = [];
//   for (let i = 0; i < 10; i++) {
//     const randomDayOffset = Math.floor(Math.random() * 7); // Random day of the current week (0 to 6)
//     const startTime = getRandomTime();
//     const endTime = getEndTime(startTime);

//     events.push({
//       id: i + 1,
//       title: getRandomTitle(),
//       startTime,
//       endTime,
//       date: getRandomDateForThisWeek(randomDayOffset),
//     });
//   }
//   return events;
// };

// // Convert generated data into react-big-calendar's event format
// const mapDataToEvents = (data) => {
//   return data.map((event) => {
//     const startDate = new Date(event.date);
//     const endDate = new Date(event.date);

//     const [startHour, startMinute] = event.startTime.split(":");
//     const [endHour, endMinute] = event.endTime.split(":");

//     startDate.setHours(startHour, startMinute);
//     endDate.setHours(endHour, endMinute);

//     return {
//       id: event.id,
//       title: event.title,
//       start: startDate,
//       end: endDate,
//     };
//   });
// };

const getWeekDayDate = (currentDate, dayOfWeek) => {
  const startOfWeek = moment(currentDate).startOf("week"); // Start of the week (Sunday)

  // Map day_of_week to day index
  const daysOfWeekMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  return startOfWeek.add(daysOfWeekMap[dayOfWeek.toLowerCase()], "days"); // Get the date for the day_of_week
};

// Function to map schedule data to events for react-big-calendar, based on the current date
const mapDataToEvents = (data, currentDate) => {
  return data.map((event) => {
    const dayOfWeek = getWeekDayDate(currentDate, event.day_of_week); // Get the date for the day_of_week
    const startDate = moment(dayOfWeek)
      .set({
        hour: event.start_time.split(":")[0],
        minute: event.start_time.split(":")[1],
      })
      .toDate(); // Set the time for start_time

    const endDate = moment(dayOfWeek)
      .set({
        hour: event.end_time.split(":")[0],
        minute: event.end_time.split(":")[1],
      })
      .toDate(); // Set the time for end_time

    return {
      id: event.id,
      title: `User ${event.user_id}`, // You can customize the title as needed
      start: startDate,
      end: endDate,
    };
  });
};

const CalendarComponent = ({ scheduleData, toggleOpenSuccess }) => {
  const { id } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const events = mapDataToEvents(scheduleData, currentDate);

  const handleSelectEvent = (event) => {
    const now = new Date();

    if (event.start < now) {
      errorMeg("You cannot interact with past events.");
      return;
    }
    setSelectedEvent(event);
  };

  const handleBookDoula = async () => {
    setLoading(true);
    await postApi("/payment/bookDoula/" + id, {
      time_slots: [
        {
          from: moment(selectedEvent.start).format("HH:mm"),
          to: moment(selectedEvent.end).format("HH:mm"),
          date: moment(selectedEvent).format("DD-MM-YYYY"),
        },
      ],
    }).then((res) => {
      if (res?.data?.success) {
        successMeg(res?.data?.message);
        setSelectedEvent(null);
        toggleOpenSuccess(res?.data);
      } else {
        errorMeg(res?.data?.error);
      }
      setLoading(false);
    });
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleNavigate = (date) => {
    setCurrentDate(date); // Update the current date when navigating
  };

  return (
    <div style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        eventPropGetter={(event) => {
          const now = new Date();
          const isPastEvent = event.start < now;
          const style = {
            backgroundColor: isPastEvent ? "lightgray" : "#3174ad",
            color: "white",
            cursor: isPastEvent ? "not-allowed" : "pointer",
          };
          return { style };
        }}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["day", "week"]}
        view={currentView}
        date={currentDate}
        step={15}
        onNavigate={handleNavigate}
        onSelectEvent={handleSelectEvent}
        onView={handleViewChange}
      />

      {/* Conditionally render event details */}
      {!!selectedEvent && (
        <CommonModal
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        >
          {!!selectedEvent ? (
            <div className="event-details">
              <h3>Event Details</h3>
              <p>Name : {selectedEvent.title}</p>
              <p>
                Time : {moment(selectedEvent.start).format("hh:mm A")} -{" "}
                {moment(selectedEvent.end).format("hh:mm A")}
              </p>
              {+getUserRole() === 1 && (
                <button
                  disabled={loading}
                  className="addcardbutton w-100"
                  onClick={handleBookDoula}
                >
                  {loading ? (
                    <div
                      className="spinner-border"
                      color="#9e4b34"
                      role="status"
                    ></div>
                  ) : (
                    "Book Now"
                  )}
                </button>
              )}
            </div>
          ) : (
            <p>No event selected</p>
          )}
        </CommonModal>
      )}
    </div>
  );
};

export default CalendarComponent;
