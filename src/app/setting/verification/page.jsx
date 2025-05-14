"use client";
import React, { useEffect, useState } from "react";
import greentik from "../../../Assets/doula setting/greentik.svg";
import lock from "../../../Assets/doula setting/lock.svg";

import "./doulaverification.css";
import Image from "next/image";
import { getUserProfile } from "@/Redux/customer/getProfileSlice";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const [isVerifyProfile, setIsVerifyProfile] = useState(true);

  const getUserProfileData = () => {
    dispatch(getUserProfile()).then((res) => {
      setIsVerifyProfile(res?.payload?.profileDetails?.email_verified === 1);
    });
  };

  useEffect(() => {
    getUserProfileData();
  }, []);
  return (
    <>
      <div className="notificationountcontainer">
        <div>Profile Verification</div>
        <div>
          <hr />
        </div>
        <div className="profileverifiedcontainer">
          <div className="upper">
            {isVerifyProfile ? (
              <Image src={greentik} alt="Cherished beginnings" />
            ) : (
              "X"
            )}
            <div>
              <div className="divone">
                Your profile is {!isVerifyProfile && "not"} verified
              </div>
              <div className="divtwo">
                You will see verify badge near your name on your profile and
                customer will know that you have taken measure to prove your
                identity.
              </div>
            </div>
          </div>
          <div className="lower">
            <span>
              <Image src={lock} alt="Cherished beginnings" /> Safe
            </span>
            <div className="divtwo">
              We are not keeping your documents on our serves after the
              verification
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
