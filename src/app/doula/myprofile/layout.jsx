"use client";

import "./profilelayout.css";
import Link from "next/link";
import userprofile from "../../../Assets/settings/user.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathName = usePathname();
  const [activeLink, setActiveLink] = useState("General Information");

  useEffect(() => {
    if (pathName === "/doula/myprofile") {
      setActiveLink("General Information");
    } else if (pathName === "/doula/myprofile/profiledescription") {
      setActiveLink("Profile description");
    } else if (pathName === "/doula/myprofile/aboutthedoula") {
      setActiveLink("About the doula");
    } else if (pathName === "/doula/myprofile/resume") {
      setActiveLink("Resume");
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between usersettingpadding gap-5">
        <div className="sidemenusec doulasidemenu">
          <ul>
            <li
              className={activeLink === "General Information" ? "active" : ""}
            >
              <Link href="/doula/myprofile">
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
              <Link href="/doula/myprofile/profiledescription">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("Profile description")}
                >
                  <Image src={userprofile} alt="Cherished beginnings" />
                  <span>Profile Description</span>
                </div>
              </Link>
            </li>
            <li className={activeLink === "About the doula" ? "active" : ""}>
              <Link href="/doula/myprofile/aboutthedoula">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("About the doula")}
                >
                  <Image src={userprofile} alt="Cherished beginnings" />
                  <span>About Doula</span>
                </div>
              </Link>
            </li>
            <li className={activeLink === "Resume" ? "active" : ""}>
              <Link href="/doula/myprofile/resume">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("Resume")}
                >
                  <Image src={userprofile} alt="Cherished beginnings" />
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
