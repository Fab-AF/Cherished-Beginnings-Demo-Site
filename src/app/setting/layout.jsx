"use client";
import Usernav from "@/Components/Usernav/Usernav";
import Link from "next/link";
import profile from "../../Assets/icons/password.png";
import verify from "../../Assets/icons/verification.png";
import notification from "../../Assets/icons/notification.png";

import "./settinglayout.css";

import Doulanav from "@/Components/Doulanav/Doulanav";
import { getUserRole } from "@/modules/authentication";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function Layout({ children }) {
  const [activeLink, setActiveLink] = useState("Password");
  const path = usePathname();

  useEffect(() => {
    if (path === "/setting/notification") {
      setActiveLink("Notification");
    } else if (path === "/setting/verification") {
      setActiveLink("Verification");
    } else {
      setActiveLink("Password");
    }
  }, [path]);

  return (
    <>
      {+getUserRole() === 1 ? <Usernav /> : <Doulanav />}
      <div className="d-flex justify-content-between usersettingpadding gap-5">
        <div className="sidemenusec doulasidemenu">
          <ul>
            <li className={activeLink === "Password" ? "active" : ""}>
              <Link href="/setting">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("Password")}
                >
                  <Image src={profile} alt="Cherished beginnings" />
                  <span>Password</span>
                </div>
              </Link>
            </li>
            <li className={activeLink === "Verification" ? "active" : ""}>
              <Link href="/setting/verification">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("Verification")}
                >
                  <Image src={verify} alt="Cherished beginnings" />
                  <span>Verification</span>
                </div>
              </Link>
            </li>
            <li className={activeLink === "Notification" ? "active" : ""}>
              <Link href="/setting/notification">
                <div
                  className="d-flex align-items-center gap-2"
                  onClick={() => setActiveLink("Notification")}
                >
                  <Image src={notification} alt="Cherished beginnings" />
                  <span>Notifications</span>
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
