import React from "react";
import "./Nocaregivers.css";
import Link from "next/link";
import Logo from "../../../Assets/logo-powerful-logo-for-newborn/logo-powerful-logo-for-newborn/Cherished Beginnings - final 1.png";
import nocaregivers from "../../../Assets/lisiting/nocaregivers.svg";
import Image from "next/image";

const Nocaregivers = () => {
  return (
    <>
      <div className="nocaregiverscontainer">
        <div className="d-flex align-items-center justify-content-center gap-2 alertnocaregivers">
          <div>No Caregivers available in this area</div>
          <u>Change</u>
        </div>
        <div className="d-flex justify-content-center align-items-center nocareimg">
          <Image src={nocaregivers} alt="Cherished beginnings" />
        </div>
      </div>
    </>
  );
};

export default Nocaregivers;
