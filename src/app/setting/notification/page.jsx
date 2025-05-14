"use client"
import React, { useEffect, useState } from "react";
import "./doulanotifiaction.css";
import { useDispatch } from "react-redux";
import { getUserProfile } from "@/Redux/customer/getProfileSlice";
import { postApi } from "@/Redux/api";
import { errorMeg, successMeg } from "@/modules/utils";

const page = () => {
  const [notificationType, setNotificationType] = useState("email");
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await postApi("/users/notifacation-setting", {
        notifacationType: notificationType,
      }).then((res) => {
        if (res?.data?.success) {
          successMeg(res?.data?.messaeg);
        } else {
          errorMeg(res?.data?.messaeg);
        }
      });
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserProfileData = () => {
    dispatch(getUserProfile()).then((res) => {
      setNotificationType(res?.payload?.profileDetails?.notifacation_type);
    });
  };

  useEffect(() => {
    getUserProfileData();
  }, []);
  return (
    <>
      <div className="notificationountcontainer">
        <div>Notifications </div>
        <div>
          <hr />
        </div>
        <div className="d-flex flex-column gap-3">
          <label
            htmlFor="emailnoti"
            className="d-flex align-items-center gap-2"
          >
            <input
              type="radio"
              name="notification"
              value="email"
              onChange={(e) => setNotificationType(e?.target?.value)}
              checked={notificationType === "email"}
            />
            <div
              onClick={() => setNotificationType("email")}
              className="d-flex flex-column align-items-start gap-1"
            >
              <div className="notificationtitle">E-mails Notifications</div>
              <div className="notificationdesc">
                About contract, doula messages & payments
              </div>
            </div>
          </label>
          <label
            htmlFor="smsnotification"
            className="d-flex align-items-center gap-2"
          >
            <input
              type="radio"
              value="sms"
              name="notification"
              onChange={(e) => setNotificationType(e?.target?.value)}
              checked={notificationType === "sms"}
            />
            <div
              onClick={() => setNotificationType("sms")}
              className="d-flex flex-column align-items-start gap-1"
            >
              <div className="notificationtitle">SMS Notifications</div>
              <div className="notificationdesc">
                About contract, doula messages & payments
              </div>
            </div>
          </label>
        </div>
        <div className="d-flex gap-3 justify-content-start notificationbtngrp  mt-4">
          <button
            disabled={loading}
            className="savesettingbtn"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="spinner-border" color="#9e4b34" role="status"></div>
            ) : (
              "Save Setting"
            )}
          </button>
          {/* <button className="dltbutton">Unssuscribe all</button> */}
        </div>
      </div>
    </>
  );
};

export default page;
