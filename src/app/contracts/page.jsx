"use client";
import Doulanav from "@/Components/Doulanav/Doulanav";
import Usercontracts from "@/Components/User Contracts/Mycontracts/Mycontracts";
import Usernav from "@/Components/Usernav/Usernav";
import { getUserRole } from "@/modules/authentication";
import React from "react";

const page = () => {
  return (
    <>
      {+getUserRole() === 1 ? (
        <Usernav currentPath="/contracts" />
      ) : +getUserRole() === 2 ? (
        <Doulanav />
      ) : (
        ""
      )}
      <Usercontracts />
    </>
  );
};

export default page;
