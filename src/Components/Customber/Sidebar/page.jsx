"use client";
import Usernav from "@/Components/Usernav/Usernav";
import "./userset.css";
import Link from "next/link";
import userprofile from "../../../Assets/icons/account.png";
import passwordimage from "../../../Assets/icons/password.png";
import notificationimage from "../../../Assets/icons/notification.png";
import paymentmethod from "../../../Assets/icons/payment-method.png";
import paymenthistory from "../../../Assets/icons/transaction-history.png";
// import 'remixicon/fonts/remixicon.css'
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomerProfileSidebar({ children }) {
  const [activeLink, setActiveLink] = useState("Account");
  const pathName = usePathname();

  const setActive = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    if (pathName === "/profile/password") {
      setActiveLink("Password");
    } else if (pathName === "/profile/payment-method") {
      setActiveLink("Payment methods");
    } else if (pathName === "/profile/payment-history") {
      setActiveLink("Payment history");
    } else if (pathName === "/profile/notification") {
      setActiveLink("Notification");
    }else if (pathName === "/profile") {
      setActiveLink("Account");
    } 
  }, [pathName]);

  return (
    <>
      <div className="d-flex justify-content-between usersettingpadding gap-5 position-relative">
        <div className="sidemenusec">
          <ul>
            <MenuItem image={userprofile} text="Account" link="/profile" />
            <MenuItem
              image={passwordimage}
              text="Password"
              link="/profile/password"
            />
            <MenuItem
              image={paymentmethod}
              text="Payment methods"
              link="/profile/payment-method"
            />
            <MenuItem
              image={paymenthistory}
              text="Payment history"
              link="/profile/payment-history"
            />
            <MenuItem
              image={notificationimage}
              text="Notification"
              link="/profile/notification"
            />
          </ul>
        </div>
        <div className="accountscreenrigtsection">{children}</div>
      </div>
    </>
  );

  function MenuItem({ image, text, link }) {
    return (
      <>
        <li className={activeLink === text ? "active" : ""}>
          <Link href={link}>
            <div className="alignmetn" onClick={() => setActive(text)}>
              <Image src={image} alt="Cherished beginnings" />
              <span>{text}</span>
            </div>
          </Link>
        </li>
      </>
    );
  }
}
