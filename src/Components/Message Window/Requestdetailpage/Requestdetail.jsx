"use client";
import Doulanav from "@/Components/Doulanav/Doulanav";
import Usernav from "@/Components/Usernav/Usernav";
import CommonRating from "@/Components/common/CommonRating";
import CommonImage from "@/Components/common/Image/CommonImage";
import { getUserRole } from "@/modules/authentication";
import { timeSince } from "@/modules/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoulaDetailsContact,
  successStatus,
} from "../../../Redux/contact/getContactDetailsSlice";
import { messageApi } from "../../../Redux/contact/messageSlice";
import Button from "../../Reusablecomponents/Buttoncomponent/Button";
import "./Requestdetail.css";
import reqlistchatprofile from "../../../Assets/messagewindow/reqlistchatprofile.svg"
import send from "../../../Assets/settings/send-svgrepo-com.svg";
import attachment from "../../../Assets/settings/attachment-svgrepo-com.svg";
import Image from "next/image";


const RequestdRequestDetail = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const route = useRouter();

  const getContactDetails = useSelector(
    (state) => state?.getDoulaDetailsContact?.data
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  const onSubmit = async () => {
    try {
      setLoading(true);
      dispatch(messageApi({ message, contact_id: id })).then(() => {
        setLoading(false);
        setMessage("");
        getContactDetailsData();
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const getContactDetailsData = async () => {
    try {
      dispatch(getDoulaDetailsContact(id)).then((res) => {
        if (
          res?.payload?.success &&
          Object.keys(res?.payload?.contacts)?.length > 0
        ) {
          dispatch(successStatus(res?.payload?.contacts));
        }
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (id) {
      getContactDetailsData();
    }
  }, [id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [getContactDetails?.messages]); // Scroll when messages change
  return (
    <>
      {+getUserRole() === 1 ? (
        <Usernav currentPath="/my-requests" />
      ) : +getUserRole() === 2 ? (
        <Doulanav />
      ) : (
        ""
      )}
      <div className="myrequestdetailcontainer">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/my-requests">My Requests</Link>
            </li>
            <li className="breadcrumb-item active">
              <p>{getContactDetails?.doula?.first_name || ""}</p>
            </li>
          </ol>
        </nav>
        {+getUserRole() === 1 && (
          <div className="listviewprofile">
            <div className="d-flex align-items-center justify-content-center gap-3">
              {getContactDetails?.doula?.profile_image && (
                <CommonImage
                  width={100}
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${getContactDetails?.doula?.profile_image}`}
                  alt="Cherished beginnings"
                  className="doulaprofileimage"
                />
              )}
              <div className="d-flex flex-column justify-content-center gap-2">
                <div className="reqlistusername">
                  {getContactDetails?.doula?.first_name}{" "}
                  {getContactDetails?.doula?.last_name}
                </div>
                <div className="reqlistexp">
                  {getContactDetails?.doula?.userDetail?.experience} Experience
                </div>
                <div className="reqlistrev ">
                  <span>
                    {(
                      +getContactDetails?.doula?.doulaRatings?.at(0)
                        ?.averageRating || 0
                    ).toFixed(1)}
                  </span>
                  <CommonRating
                    disabled={true}
                    value={
                      +getContactDetails?.doula?.doulaRatings?.at(0)
                        ?.averageRating || 0
                    }
                  />
                  <span>
                    (
                    {(
                      +getContactDetails?.doula?.doulaRatings?.at(0)
                        ?.ratingCount || 0
                    ).toFixed(1)}
                    review)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="reqlistprice d-flex align-items-center gap-2">
                <div>
                  {getContactDetails?.doula?.userDetail?.hourly_rate_currency}
                  {getContactDetails?.doula?.userDetail?.hourly_rate}
                </div>{" "}
                <span>per hour</span>
              </div>
              <div className="book-feedbackparent">
                <Button
                  onClick={() => {
                    route.push(`/listing/${getContactDetails?.doula_id}`);
                  }}
                  text="Book now"
                />
                <a href="" className="feedbackbutton">Feedback</a>
              </div>
            </div>
          </div>
        )}
        <div className="reqlistchatcontainer" ref={chatContainerRef}>
          <div>Message</div>
          <hr />
          {getContactDetails?.messages?.map((data) => {
            return (
              <>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <CommonImage
                      width={100}
                      height={100}
                      className="rounded-5"
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.senderUserDetails?.profile_image}`}
                      alt="Cherished beginnings"
                    />
                    <div>
                      <div className="chattername">
                        {`${getContactDetails?.[
                          +getUserRole() === 1 ? "customer_id" : "doula_id"
                        ] === data?.senderUserDetails?.id
                          ? "You"
                          : `${data?.senderUserDetails?.first_name} ${data?.senderUserDetails?.last_name}`
                          }`}
                      </div>
                      <div className="chattercont">{data?.message || ""}</div>
                    </div>
                  </div>
                  <div>{timeSince(data?.createdAt)}</div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
        <div className="d-flex justify-content-between align-items-start gap-2 chayshadowcont">
          {/* <Image src={reqlistchatprofile} alt="Cherished beginnings" /> */}
          <div className="w-100 d-flex flex-column gap-3">
            <div className="w-100">
              <input
                className="w-100 chatbox"
                type="text"
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
              />
            </div>
            <div>
              <Button
                onClick={onSubmit}
                disabled={!message || loading}
                text="Send message"
              />
            </div>
          </div>
        </div>
      </div>
      {/**************************************** live chat design*********************************** */}
      {/* <div className="chatcontainer">
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
              <Image src={reqlistchatprofile} alt="Cherished beginnings" />
              <div>
                <div>Ammiwats</div>
                <div>London | 12$ per hour</div>
              </div>
            </div>
            <Link href="/reqlisting/id/selectpaymentmethod">
              <button className="booknowbutton">Book Now</button>
            </Link>
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
      </div> */}
    </>
  );
};

export default RequestdRequestDetail;
