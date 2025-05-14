"use client"
import CommonLoader from "@/Components/common/Loader";
import CustomerContactList from "@/Components/Contact/CustomerContactList";
import DoulaContactList from "@/Components/Contact/DoulaContactList";
import { getUserRole } from "@/modules/authentication";

const page = () => {
  return (
    <>
      {
        +getUserRole() === 1 ? <CustomerContactList /> : +getUserRole() === 2 ? <DoulaContactList /> : <CommonLoader />
      }
    </>
  );
};

export default page;
