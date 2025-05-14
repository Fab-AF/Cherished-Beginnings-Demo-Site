"use client";
import React, { useEffect, useState } from "react";
import Usernav from "@/Components/Usernav/Usernav";
import Image from "next/image";
import Link from "next/link";
import Button from "@/Components/Reusablecomponents/Buttoncomponent/Button";
import "./reqlisting.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  getDoulaContact,
  successStatus,
  loadingStatus,
} from "../../Redux/contact/getContactSlice";
import moment from "moment";
import CommonImage from "@/Components/common/Image/CommonImage";

const page = () => {
  const { getContactList = [] } = useSelector((state) => ({
    getContactList: state?.getDoulaContact?.data,
    loading: state?.getDoulaContact?.loading,
  }));

  const route = useRouter();
  const dispatch = useDispatch();

  const getContactDoulaList = async () => {
    try {
      dispatch(loadingStatus());
      dispatch(getDoulaContact()).then((res) => {
        if (res?.payload?.success) {
          dispatch(successStatus(res?.payload?.contacts));
        }
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getContactDoulaList();
  }, []);

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
              {getContactList?.map((data) => {
                return (
                  <tr>
                    <td onClick={() => route.push(`/my-request/${data?.id}`)}>
                      <CommonImage
                        className="m-2"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.customer?.profile_image}`}
                        alt="Cherished beginnings"
                        width={100}
                        height={100}
                      />
                      {data?.customer?.first_name || ""}
                    </td>
                    <td className="messagewidth">
                      {data?.messages?.at(0)?.message || "-"}
                    </td>
                    <td>
                      {moment(data?.messages?.at(0)?.createdAt).format(
                        "DD MMM YYYY"
                      ) || "-"}
                    </td>
                    <td>
                      <Link href="#">
                        <Button text="Book Now" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default page;
