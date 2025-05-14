"use client";
import React from "react";
import "./Footer.css";
import footerlogo from "../../Assets/logo-powerful-logo-for-newborn/logo-powerful-logo-for-newborn/Cherished Beginnings - final 1.png";
import footerinsta from "../../Assets/footerinsta.svg";
import footerfacebook from "../../Assets/footerfacebook.svg";
import footertwittter from "../../Assets/Footertwittter.svg";
import footerlinkedin from "../../Assets/Footerlinkedin.svg";
import Image from "next/image";
import Link from "next/link";
import {
  DOULA_FILTER,
  getUserRole,
  setLocalStore,
} from "@/modules/authentication";
import { openFindcareFormoneModal } from "@/Redux/modalSlice";
import { useDispatch } from "react-redux";
import { removeNullKeys } from "@/modules/utils";
import { useRouter } from "next/navigation";

const Footer = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  let year = new Date().getFullYear();
  const handleOpenFindCareFormOneModal = () => {
    dispatch(openFindcareFormoneModal());
  };
  const handleSetFilter = (value) => {
    setLocalStore(
      DOULA_FILTER,
      JSON.stringify(removeNullKeys({ service: [value] }))
    );
  };

  return (
    <>
      <div className="footercontainer">
        <div className="footerrow1">
          <div className="newsletter">Newsletter Sign Up</div>
          <div className="position-relative newsletterinputparent">
            <input type="text" className="newsletterinput w-100" />
            <button className="submitbutton">Submit</button>
          </div>
        </div>
        <div className="footerrow2">
          <div>
            <div className="fottertitle">About cherished beginnings</div>
            <ul className="p-0">
              <Link href="/">
                <li>Home </li>
              </Link>
              <Link href="">
                <li>Set location</li>
              </Link>
              <Link href="/#service">
                <li>Service</li>
              </Link>
              {+getUserRole() !== 2 && (
                <Link
                  href="/"
                  onClick={() => {
                    handleOpenFindCareFormOneModal();
                  }}
                >
                  <li>Find care</li>
                </Link>
              )}
              <Link href="/contact">
                <li>Contact</li>
              </Link>
            </ul>
          </div>
          <div>
            <div className="fottertitle">Our services</div>
            <ul className="p-0">
              <Link href="/listing" onClick={() => handleSetFilter(1)}>
                <li>Daytime service </li>
              </Link>
              <Link href="/listing" onClick={() => handleSetFilter(2)}>
                <li>Overnight care </li>
              </Link>
              <Link href="/listing" onClick={() => handleSetFilter(3)}>
                <li>24 hour care</li>
              </Link>
              <Link href="/listing" onClick={() => handleSetFilter(4)}>
                <li>Location support</li>
              </Link>
              <Link href="">
                <li>Services in US</li>
              </Link>
            </ul>
          </div>
          <div>
            <div className="fottertitle">Explore</div>
            <ul className="p-0">
              <a href="">
                <li>Services </li>
              </a>
              <a href="">
                <li>Privacy Policy</li>
              </a>
              <a href="">
                <li>Find care</li>
              </a>
              <a href="">
                <li>Terms of Service</li>
              </a>
              <a href="">
                <li>Cookie policies</li>
              </a>
            </ul>
          </div>
          <div>
            <div className="fottertitle">Talk to us</div>
            <ul className="p-0">
              <a href="">
                <li>support@ercom.com </li>
              </a>
              <a href="">
                <li>+66 2399 1145</li>
              </a>
              <a href="">
                <li>Contact Us</li>
              </a>
            </ul>
          </div>
        </div>
        <div className="footerrow3">
          <Image
            alt="Cherished beginnings"
            className="footrlogo"
            src={footerlogo}
          />
          <div>© {year} Cherished beginnings. 2024 All Rights Reserved</div>
          <div className="d-flex gap-2 align-items-center">
            <Image src={footerfacebook} alt="Cherished beginnings" />
            <Image src={footerlinkedin} alt="Cherished beginnings" />
            <Image src={footertwittter} alt="Cherished beginnings" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
