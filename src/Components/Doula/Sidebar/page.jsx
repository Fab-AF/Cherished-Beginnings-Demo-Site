"use client";
import "./profilelayout.css";
import Link from "next/link";
import userprofile from "../../../Assets/icons/account.png";
import description from "../../../Assets/icons/description.png";
import about from "../../../Assets/icons/about.png";
import resume from "../../../Assets/icons/resume.png";


import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DoulaProfileSidebar({ children }) {
  const pathName = usePathname()
  const [activeLink, setActiveLink] = useState("General Information");

  useEffect(() => {
    if (pathName === "/profile") {
      setActiveLink("General Information")
    } else if (pathName === "/profile/profile-description") {
      setActiveLink("Profile description")
    } else if (pathName === "/profile/about") {
      setActiveLink("About the doula")
    } else if (pathName === "/profile/resume") {
      setActiveLink("Resume")
    }
  }, [])
  return (
    <>
      <div className="d-flex justify-content-between usersettingpadding gap-5">
        <div className="sidemenusec doulasidemenu">
          <ul>
            <li
              className={activeLink === "General Information" ? "active" : ""}
            >
              <Link href="/profile">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("General Information")}
                >
                  <Image src={userprofile} alt="Cherished beginnings" />
                  <span>General Information</span>
                </div>
              </Link>
            </li>
            <li
              className={activeLink === "Profile description" ? "active" : ""}
            >
              <Link href="/profile/profile-description">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("Profile description")}
                >
                  <Image src={description} alt="Cherished beginnings" />
                  <span>Profile Description</span>
                </div>
              </Link>
            </li>
            <li className={activeLink === "About the doula" ? "active" : ""}>
              <Link href="/profile/about">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("About the doula")}
                >
                  <Image src={about} alt="Cherished beginnings" />
                  <span>About Doula</span>
                </div>
              </Link>
            </li>
            <li className={activeLink === "Resume" ? "active" : ""}>
              <Link href="/profile/resume">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("Resume")}
                >
                  <Image src={resume} alt="Cherished beginnings" />
                  <span>Resume</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="accountscreenrigtsection">{children}</div>
      </div>
    </>
  );
}
