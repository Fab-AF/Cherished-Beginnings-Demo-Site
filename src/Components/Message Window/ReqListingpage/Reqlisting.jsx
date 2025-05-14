import React from "react";
import Usernav from "../../Usernav/Usernav";
import reqlisprofile from "../../../Assets/messagewindow/reqlistingporfiele.svg";
import Link from "next/link";
import Button from "../../Reusablecomponents/Buttoncomponent/Button";
import Image from "next/image";
import "./Reqlisting.css";

const Reqlisting = () => {
  return (
    <>
      <Usernav />
      <div className="reqlistingcontainer">
        <div>My Requests</div>
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
                  excepturi recusandae ea, a nesciunt dicta totam in minus quam
                  omnis. Totam ipsam reiciendis alias a. Corporis, ipsa id. Ut
                  tempore quod reiciendis consequatur laudantium eos
                  consequuntur porro?
                </td>
                <td>16 Aug 2022</td>
                <td>
                  <Link href="/reqlisting/id">
                    <Button text="Book Now" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Reqlisting;
