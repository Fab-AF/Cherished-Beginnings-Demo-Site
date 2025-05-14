"use client";
import Usernav from "@/Components/Usernav/Usernav";
import { getUserRole } from "@/modules/authentication";
import Doulanav from "@/Components/Doulanav/Doulanav";
import CustomerProfileSidebar from "@/Components/Customber/Sidebar/page";
import DoulaProfileSidebar from "@/Components/Doula/Sidebar/page";
import CommonLoader from "@/Components/common/Loader";

export default function Layout({ children }) {
  return (
    <>
      {+getUserRole() === 1 ? (
        <Usernav currentPath="/profile" />
      ) : +getUserRole() === 2 ? (
        <Doulanav />
      ) : (
        ""
      )}
      {+getUserRole() === 1 ? (
        <CustomerProfileSidebar children={children} />
      ) : +getUserRole() === 2 ? (
        <DoulaProfileSidebar children={children} />
      ) : (
        <CommonLoader />
      )}
    </>
  );
}
