'use client'
import React from "react";
import CustomerProfile from "../Customber/Account/page";
import DoulaProfile from "../Doula/Account/page";
import CommonLoader from "../common/Loader";
import { getUserRole } from "@/modules/authentication";

const Account = () => {
  return (
    <>{+getUserRole() == 1 ? <CustomerProfile /> : +getUserRole() == 2 ? <DoulaProfile /> : <CommonLoader/>}</>
  );
};

export default Account;
