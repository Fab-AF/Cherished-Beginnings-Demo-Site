import React from "react";
import "./doulacontractdetailpage.css";
import Link from "next/link";
import Image from "next/image";
import Listviewprofile from "../../../../Assets/messagewindow/listviewprofilecard.svg";
import startgrp from "../../../../Assets/messagewindow/startgrp.svg";
import Button from "@/Components/Reusablecomponents/Buttoncomponent/Button";
import Usernav from "@/Components/Usernav/Usernav";

const page = () => {
  return (
    <>
      <div className="mycontractviewcontainer">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/doula/contracts">Contracts</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link href="">Aakash</Link>
            </li>
          </ol>
        </nav>
        <div className="containershadow">
          <div className="listviewprofile">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <Image
                src={Listviewprofile}
                className="w-auto"
                alt="Cherished beginnings"
              />
              <div className="d-flex flex-column justify-content-center gap-2">
                <div className="reqlistusername">Aakash</div>
                <div className="reqlistexp">3 yrs Experience</div>
                <div className="reqlistrev ">
                  <span>4.0</span>
                  <Image src={startgrp} alt="Cherished beginnings" />
                  <span>(7review)</span>
                </div>
              </div>
            </div>
            <div className="threedot">
              <sup>...</sup>
            </div>
          </div>
          <hr />
          <div className="contractinfocontainer">
            <div className="contractinfotitle">Contract info</div>
            <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
              <div className="startdate">Start date:</div>
              <div className="datecontent">January 5, 2024 | 8:00 to 12:00</div>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
              <div className="startdate">End date:</div>
              <div className="datecontent">January 5, 2024 | 8:00 to 12:00</div>
            </div>
          </div>
          <hr />
          <div className="contractinfocontainer">
            <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
              <div className="startdate">Your feedback to doula :</div>
              <div className="datecontent">Star & description</div>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
              <div className="startdate">Doula’s feedback to you :</div>
              <div className="datecontent">Star & description</div>
            </div>
          </div>
          <hr />
          <div className="contractinfocontainer">
            <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
              <div className="startdate">Contract id :</div>
              <div className="datecontent">12345</div>
            </div>
          </div>
          <hr />
          <div className="contractinfocontainer">
            <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
              <div className="startdate">Budget amount :</div>
              <div className="datecontent">$3,000.00</div>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
              <div className="startdate">Status :</div>
              <div className="datecontent">Paid</div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default page;
