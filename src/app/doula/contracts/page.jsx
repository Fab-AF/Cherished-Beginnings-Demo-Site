import React from "react";
import "./doulacontract.css";
import reqlisprofile from "../../../Assets/messagewindow/reqlistingporfiele.svg";
import Link from "next/link";
import Button from "@/Components/Reusablecomponents/Buttoncomponent/Button";
import Image from "next/image";
import Doulanav from "@/Components/Doulanav/Doulanav";

const page = () => {
  return (
    <>
      <Doulanav />
      <div className="reqlistingcontainer">
        <div>My Contracts</div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Doula name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Paid Amount</th>
                <th>Status</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Image
                    className="m-2"
                    src={reqlisprofile}
                    alt="Cherished beginnings"
                  />
                  Aakash
                </td>
                <td>16 Aug 2022</td>
                <td>8:00 to 12:00</td>
                <td>$500</td>
                <td>Incoming</td>
                <td>16 Aug 2022</td>

                <td>
                  <Link href="/doula/contracts/id" className="text-primary">
                    View                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default page;
