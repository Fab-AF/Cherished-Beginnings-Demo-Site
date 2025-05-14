"use client";
import React, { useEffect, useState } from "react";
import "./Usernav.css";
import Link from "next/link";
import { customerHeaderData } from "@/modules/staticData";
import { usePathname, useRouter } from "next/navigation";
import { getUserRole } from "@/modules/authentication";

const Usernav = ({ currentPath }) => {
  const pathName = usePathname();
  const [activeLink, setActiveLink] = useState("");
  const route = useRouter();

  const handleSetActiveLink = (link, tab) => {
    route.push(link);
    setActiveLink(tab);
  };

  useEffect(() => {
    if (+getUserRole() === 1) {
      if (pathName?.startsWith("/my-requests")) {
        setActiveLink("My requests");
      } else if (pathName?.startsWith("/contracts")) {
        setActiveLink("My contracts");
      } else if (pathName?.startsWith("/favourite")) {
        setActiveLink("Favourite");
      } else if (pathName?.startsWith("/my-requests")) {
        setActiveLink("My request");
      } else if (pathName?.startsWith("/profile")) {
        setActiveLink("Setting");
      }
    }
  }, [pathName]);

  return (
    <>
      <div className="usernavcont">
        <ul className="d-flex align-items-center usernav">
          <li
            onClick={() => {
              handleSetActiveLink("/my-requests", "My requests");
            }}
            className={activeLink === "My requests" ? "active" : ""}
          >
            <Link href={"/my-requests"}>
              <li>My requests</li>
            </Link>
          </li>
          <li
            onClick={() => {
              handleSetActiveLink("/contracts", "My contracts");
            }}
            className={activeLink === "My contracts" ? "active" : ""}
          >
            <Link href={"/contracts"}>
              <li>My contracts</li>
            </Link>
          </li>
          <li
            onClick={() => {
              handleSetActiveLink("/favourite", "Favourite");
            }}
            className={activeLink === "Favourite" ? "active" : ""}
          >
            <Link href={"/favourite"}>
              <li>Favourite</li>
            </Link>
          </li>
          <li
            onClick={() => {
              handleSetActiveLink("/profile", "Setting");
            }}
            className={activeLink === "Setting" ? "active" : ""}
          >
            <Link href={"/profile"}>
              <li>Setting</li>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Usernav;
