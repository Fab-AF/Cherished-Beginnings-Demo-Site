"use client";
import React, { useEffect, useState } from "react";
import "./Doulanav.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocalStore, getUserRole } from "@/modules/authentication";

const Doulanav = () => {
  const [activeLink, setActiveLink] = useState(""); // State to manage active link
  const pathName = usePathname();

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    if (+getUserRole() === 2) {
      if (pathName?.startsWith("/profile")) {
        setActiveLink("My Profile");
      } else if (pathName?.startsWith("/setting")) {
        setActiveLink("Setting");
      }else if (pathName?.startsWith("/availability")) {
        setActiveLink("Availability");
      }else if(pathName?.startsWith("/my-requests")){
        setActiveLink("My request")
      }else if(pathName?.startsWith("/contracts")){
        setActiveLink("My contracts")
      }else if(pathName?.startsWith("/calendar")){
        setActiveLink("Calendar")
      }
    }
  }, [pathName]);

  return (
    <>
      <div className="usernavcont">
        <ul className="d-flex align-items-center usernav unn">
          <li className={activeLink === "My request" ? "active" : ""}>
            <Link href="/my-requests">
              <div onClick={() => handleSetActiveLink("My request")}>
                My requests
              </div>
            </Link>
          </li>
          <li className={activeLink === "My contracts" ? "active" : ""}>
            <Link href="/contracts">
              <div onClick={() => handleSetActiveLink("My contracts")}>
                My contracts
              </div>
            </Link>
          </li>
          <li className={activeLink === "Calendar" ? "active" : ""}>
            <Link href="/calendar">
              <div onClick={() => handleSetActiveLink("Calendar")}>
                Calendar
              </div>
            </Link>
          </li>
          <li className={activeLink === "Availability" ? "active" : ""}>
            <Link href="/availability">
              <div onClick={() => handleSetActiveLink("Availability")}>
                Availability
              </div>
            </Link>
          </li>
          <li className={activeLink === "My Profile" ? "active" : ""}>
            <Link href="/profile">
              <div onClick={() => handleSetActiveLink("My Profile")}>
                My Profile
              </div>
            </Link>
          </li>
          <li className={activeLink === "Setting" ? "active" : ""}>
            <Link href="/setting">
              <div onClick={() => handleSetActiveLink("Setting")}>Setting</div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className="usernavcont">
        <ul className="d-flex align-items-center usernav">
          <Link href="/doula">
            <li>My request</li>
          </Link>
          <Link href="/doula/contracts">
            <li>My contracts</li>
          </Link>
          <Link href="/doula/calander">
            <li>Calander</li>
          </Link>
          <Link href="/doula/availability">
            <li>Availibility</li>
          </Link>
          <Link href="/doula/myprofile">
            <li>My Profile</li>
          </Link>
          <Link href="/doula/setting">
            <li>Setting</li>
          </Link>
        </ul>
      </div> */}
    </>
  );
};

export default Doulanav;
