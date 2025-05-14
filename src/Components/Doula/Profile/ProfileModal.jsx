"use client";
import { Steps } from "antd";
import React, { useState } from "react";
import DoulaProfile from "../Account/page";
import DoulaAboutPage from "@/app/profile/about/page";
import ProfileDescriptionPage from "@/app/profile/profile-description/page";
import ResumePage from "@/app/profile/resume/page";
import DoulaProfileModal from "../Account/Account";
import ProfileDescriptionModal from "@/app/profile/profile-description/ProfileDescriptionModal";
import DoulaAboutModal from "@/app/profile/about/DoulaAboutModal";
import ResumeModal from "@/app/profile/resume/ResumeModal";

const ProfileModal = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      content: "First-content",
    },
    {
      content: "Second-content",
    },
    {
      content: "three-content",
    },
    {
      content: "four-content",
    },
  ];

  const items = steps.map((item) => ({ key: item.title }));

  return (
    <div>
      <Steps current={current} items={items} />
      <div className="mt-4">
        {current === 0 && (
          <DoulaProfileModal showBackBtn={true} setCurrent={setCurrent} />
        )}
        {current === 1 && (
          <ProfileDescriptionModal showBackBtn={true} setCurrent={setCurrent} />
        )}
        {current === 2 && (
          <DoulaAboutModal showBackBtn={true} setCurrent={setCurrent} />
        )}
        {current === 3 && (
          <ResumeModal showBackBtn={true} setCurrent={setCurrent} />
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
