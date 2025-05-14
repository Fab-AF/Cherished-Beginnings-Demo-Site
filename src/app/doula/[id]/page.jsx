import React from "react";
import "./createprofilelistview.css";
import Link from "next/link";
import Listviewprofile from "../../../Assets/messagewindow/listviewprofilecard.svg";
import reqlistchatprofile from "../../../Assets/messagewindow/reqlistchatprofile.svg";
import Image from "next/image";
import startgrp from "../../../Assets/messagewindow/startgrp.svg";
import Button from "@/Components/Reusablecomponents/Buttoncomponent/Button";
import send from "../../../Assets/settings/send-svgrepo-com.svg";
import attachment from "../../../Assets/settings/attachment-svgrepo-com.svg";

const page = () => {
  return (
    <>
      {/* <div className="myrequestdetailcontainer">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/doula">My Requests</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link href="">Aakash</Link>
            </li>
          </ol>
        </nav>

        <div className="reqlistchatcontainer">
          <div>Message</div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <Image src={reqlistchatprofile} alt="Cherished beginnings" />
              <div>
                <div className="chattername">you</div>
                <div className="chattercont">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  quidem quo voluptatem quas nemo hic ipsa quos incidunt, sed
                  sapiente odit vel in delectus quibusdam perferendis explicabo
                  modi maxime at quaerat illum repellat sunt! Omnis et nobis
                  nemo blanditiis! Eveniet maxime saepe quisquam praesentium
                  corporis magnam illum fugit voluptatum magni?
                </div>
              </div>
            </div>
            <div>2 weeks ago</div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <Image src={reqlistchatprofile} alt="Cherished beginnings" />
              <div>
                <div className="chattername">you</div>
                <div className="chattercont">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  quidem quo voluptatem quas nemo hic ipsa quos incidunt, sed
                  sapiente odit vel in delectus quibusdam perferendis explicabo
                  modi maxime at quaerat illum repellat sunt! Omnis et nobis
                  nemo blanditiis! Eveniet maxime saepe quisquam praesentium
                  corporis magnam illum fugit voluptatum magni?
                </div>
              </div>
            </div>
            <div>2 weeks ago</div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <Image src={reqlistchatprofile} alt="Cherished beginnings" />
              <div>
                <div className="chattername">you</div>
                <div className="chattercont">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  quidem quo voluptatem quas nemo hic ipsa quos incidunt, sed
                  sapiente odit vel in delectus quibusdam perferendis explicabo
                  modi maxime at quaerat illum repellat sunt! Omnis et nobis
                  nemo blanditiis! Eveniet maxime saepe quisquam praesentium
                  corporis magnam illum fugit voluptatum magni?
                </div>
              </div>
            </div>
            <div>2 weeks ago</div>
          </div>
          <hr />
        </div>
        <div className="d-flex justify-content-between align-items-start gap-2 chayshadowcont">
          <Image src={reqlistchatprofile} alt="Cherished beginnings" />
          <div className="w-100 d-flex flex-column gap-3">
            <div className="w-100">
              <input className="w-100 chatbox" type="text" name="" id="" />
            </div>
            <div>
              <Button text="Send message" />
            </div>
          </div>
        </div>
      </div> */}
      <div className="chatcontainer">
        <div className="leftchatsidebar">
          <div className="lefttopbar">
            <div>All Messages</div>
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              className="bi bi-three-dots-vertical"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
              </g>
            </svg>
          </div>
          <div className="lefttopbar">
            <input type="text" placeholder="search or start a new chat" />
          </div>
          <label htmlFor="chatlist1" className="d-flex">
            <input type="radio" id="chatlist1" name="chatlist" />
            <div className="chatcardlist">
              <Image src={reqlistchatprofile} alt="Cherished beginnings" />
              <div className="chatlistright">
                <div className="d-flex justify-content-between align-items-center">
                  <div>Doula 1</div>
                  <div>5:30pm</div>
                </div>
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, illum sed error
                </div>
              </div>
            </div>
          </label>
          <label htmlFor="chatlist2" className="d-flex">
            <input type="radio" id="chatlist2" name="chatlist" />
            <div className="chatcardlist">
              <Image src={reqlistchatprofile} alt="Cherished beginnings" />
              <div className="chatlistright">
                <div className="d-flex justify-content-between align-items-center">
                  <div>Doula 1</div>
                  <div>5:30pm</div>
                </div>
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, illum sed error
                </div>
              </div>
            </div>
          </label>
          <label htmlFor="chatlist3" className="d-flex">
            <input type="radio" id="chatlist3" name="chatlist" />
            <div className="chatcardlist">
              <Image src={reqlistchatprofile} alt="Cherished beginnings" />
              <div className="chatlistright">
                <div className="d-flex justify-content-between align-items-center">
                  <div>Doula 1</div>
                  <div>5:30pm</div>
                </div>
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, illum sed error
                </div>
              </div>
            </div>
          </label>
        </div>
        <div className="rightchatsidebar">
          <div className="toprightbar">
            <div className="toprightbarleftprofile">
              <Image src={reqlistchatprofile} />
              <div>
                <div>Ammiwats</div>
                <div>London </div>
              </div>
            </div>
            {/* <Link href="/reqlisting/id/selectpaymentmethod">
              <button className="booknowbutton">Book Now</button>
            </Link> */}
          </div>
          <div className="topchattime">Today | 12:00 AM</div>
          <div className="chatcontainermessage">
            <div className="chatbox">
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloremque impedit rerum eius alias cum magnam!
              </div>
              <div>04:00 PM</div>
            </div>
            <div className="chatbox">
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloremque impedit rerum eius alias cum magnam!
              </div>
              <div>04:00 PM</div>
            </div>
            <div className="chatbox">
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloremque impedit rerum eius alias cum magnam!
              </div>
              <div>04:00 PM</div>
            </div>
            <div className="chatbox">
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloremque impedit rerum eius alias cum magnam!
              </div>
              <div>04:00 PM</div>
            </div>
            <div className="sendcontainer">
              <input type="text" placeholder="Type your message here" />
              <Image className="sendmsg" src={send} alt="Cherished beginnings" />
              <Image className="attachment" src={attachment} alt="Cherished beginnings" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
