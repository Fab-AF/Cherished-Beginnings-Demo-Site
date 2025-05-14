"use client";
import CalendarComponent from "@/Components/Calender/Calender";
import CommonLoader from "@/Components/common/Loader";
import Doulanav from "@/Components/Doulanav/Doulanav";
import { getDoulaDetail } from "@/Redux/customer/getDoulsDetailSlice";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const [doulaDetails, serDoulaDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getDoulaDetailsData = useCallback(async () => {
    try {
      setLoading(true);
      dispatch(getDoulaDetail(3)).then((res) => {
        if (!!res?.payload?.doula) {
          serDoulaDetails(res?.payload?.doula);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDoulaDetailsData();
  }, [getDoulaDetailsData]);
  return (
    <div>
      <Doulanav />
      <div className="p-5">
        {loading ? (
          <CommonLoader />
        ) : (
          <CalendarComponent scheduleData={doulaDetails?.doulaAvailabilities} />
        )}
      </div>
    </div>
  );
};

export default page;
