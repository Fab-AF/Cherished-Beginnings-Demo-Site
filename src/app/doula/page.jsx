"use client";
import React, { useState } from "react";
import "./customerprofile.css";
import reqlisprofile from "../../Assets/messagewindow/reqlistingporfiele.svg";
import Link from "next/link";
import Button from "@/Components/Reusablecomponents/Buttoncomponent/Button";
import Image from "next/image";
const page = () => {
  const [activeRequest, setActiveRequest] = useState(true); // State to track which layout to show

  const toggleLayout = () => {
    setActiveRequest(!activeRequest); // Toggle between active and archive request layouts
  };
  return (
    <>
      {/* active request layout */}
      {activeRequest ? (
        <div className="createprofile">
          <div className="reqlistingcontainer">
            <div className="d-flex justify-content-between align-items-center">
              <div>Active Request</div>
              <div onClick={toggleLayout}>Archive Request</div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer name</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Image className="m-2" src={reqlisprofile} alt="Cherished beginnings" />
                      Aakash
                    </td>
                    <td className="messagewidth">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatum explicabo praesentium ex quidem veniam, placeat
                      doloribus sequi ullam commodi fugit architecto molestias
                      excepturi recusandae ea, a nesciunt dicta totam in minus
                      quam omnis. Totam ipsam reiciendis alias a. Corporis, ipsa
                      id. Ut tempore quod reiciendis consequatur laudantium eos
                      consequuntur porro?
                    </td>
                    <td>16 Aug 2022</td>
                    <td>
                      <Link href="/doula/id">
                        <Button text="Book Now" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="createprofile">
          <div className="reqlistingcontainer">
            <div className="d-flex justify-content-between align-items-center">
              <div>Archive Request</div>
              <div onClick={toggleLayout}>Back to Active Request</div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer name</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Image className="m-2" src={reqlisprofile} alt="Cherished beginnings" />
                      Aakash
                    </td>
                    <td className="messagewidth">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatum explicabo praesentium ex quidem veniam, placeat
                      doloribus sequi ullam commodi fugit architecto molestias
                      excepturi recusandae ea, a nesciunt dicta totam in minus
                      quam omnis. Totam ipsam reiciendis alias a. Corporis, ipsa
                      id. Ut tempore quod reiciendis consequatur laudantium eos
                      consequuntur porro?
                    </td>
                    <td>16 Aug 2022</td>
                    <td>
                      <Link href="/doula/id">
                        <Button text="Book Now" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
