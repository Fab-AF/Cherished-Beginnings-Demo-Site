"use client";
import React, { useEffect, useState } from "react";
import "./Mycontractview.css";
import Link from "next/link";
import Image from "next/image";
import Listviewprofile from "../../../Assets/messagewindow/listviewprofilecard.svg";
import startgrp from "../../../Assets/messagewindow/startgrp.svg";
import Usernav from "@/Components/Usernav/Usernav";
import { useParams, useRouter } from "next/navigation";
import { getApi, postApi } from "@/Redux/api";
import {
  errorMeg,
  firstLatterCapital,
  isValidArray,
  successMeg,
} from "@/modules/utils";
import CommonImage from "@/Components/common/Image/CommonImage";
import CommonLoader from "@/Components/common/Loader";
import CommonRating from "@/Components/common/CommonRating";
import CommonModal from "@/Components/common/CommonModal";
import { getUserRole } from "@/modules/authentication";
import moment from "moment";

const MyContractView = () => {
  const { id } = useParams();
  const [contractData, setContractData] = useState(null);
  const [error, setError] = useState(null);
  const route = useRouter();
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState([]);

  const toggleRatingModal = () => setIsOpen(!isOpen);

  const getMyContractView = async (contractId) => {
    try {
      const res = await getApi(`/payment/contract/${contractId}`);
      if (res?.data?.success) {
        setContractData(res?.data?.contracts);
        setRatingValue(res?.data?.totalRating);
      } else {
        setError(res?.data?.error);
        route.push("/contracts"); // Navigate to contracts if there's an error
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("API error:", error);
      setError("An unexpected error occurred.");
      route.push("/contracts"); // Navigate to contracts in case of an exception
    }
  };

  const onSubmit = async () => {
    try {
      setRatingLoading(true);
      await postApi(`/payment/contract/rating/${id}`, {
        review: rating,
        description: message,
      }).then((res) => {
        if (res?.data?.success) {
          successMeg(res?.data?.message);
          toggleRatingModal();
          getMyContractView(id);
          setRatingLoading(false);
        }
      });
    } catch (error) {
      setRatingLoading(false);
    } finally {
      setRatingLoading(false);
    }
  };

  useEffect(() => {
    if (id && !contractData) {
      getMyContractView(id);
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      errorMeg(error);
    }
  }, [error]);
  return (
    <>
      <Usernav />
      {loading ? (
        <CommonLoader />
      ) : (
        <div className="mycontractviewcontainer">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/contracts">Contracts</Link>
              </li>

              <li className="breadcrumb-item active">
                <Link href="">
                  {firstLatterCapital(contractData?.doula?.first_name)}{" "}
                  {firstLatterCapital(contractData?.doula?.last_name)}
                </Link>
              </li>
            </ol>
          </nav>
          <div className="containershadow">
            <div className="listviewprofile">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <CommonImage
                  src={contractData?.doula?.profile_image}
                  className="w-auto"
                />
                <div className="d-flex flex-column justify-content-center gap-2">
                  <div className="reqlistusername">
                    {firstLatterCapital(contractData?.doula?.first_name) || "-"}
                  </div>
                  <div className="reqlistexp">
                    {contractData?.doula?.userDetail?.experience
                      ? contractData?.doula?.userDetail?.experience
                      : "0 year"}{" "}
                    Experience
                  </div>
                  <div className="reqlistrev ">
                    <span>{ }</span>
                    <CommonRating
                      disabled={true}
                      value={(+ratingValue?.at(0)?.averageRating || 0).toFixed(
                        1
                      )}
                    />
                    <span>({ratingValue?.at(0)?.ratingCount || 0} Review)</span>
                  </div>
                </div>
              </div>
              <div className="threedot">
                <p onClick={toggleRatingModal} style={{ cursor: "pointer" }}>
                  ...
                </p>
              </div>
            </div>
            <hr />
            <div className="contractinfocontainer">
              <div className="contractinfotitle">Contract info</div>
              {isValidArray(JSON.parse(contractData?.time) || []) &&
                JSON.parse(contractData?.time)?.map((d, ind) => {
                  return (
                    <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
                      <div className="startdate">
                        {ind === 0 ? "Date:" : ""}
                      </div>
                      <div className="datecontent">
                        {d?.date ? moment(d?.date).format("MMMM D, YYYY") : ""}{" "}
                        | {d?.from} to {d?.to}
                      </div>
                    </div>
                  );
                })}
              {/* <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
                <div className="startdate">End date:</div>
                <div className="datecontent">
                January 5, 2024 | 8:00 to 12:00
                </div>
                </div> */}
            </div>
            <hr />
            <div className="contractinfocontainer">
              <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
                <div className="startdate">Your feedback to doula :</div>
                <div className="datecontent">
                  {contractData?.doula_review_description || "-"}
                </div>
              </div>
              {+getUserRole() === 1 && (
                <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
                  <div className="startdate">Doula’s feedback to you :</div>
                  <div className="datecontent">
                    {contractData?.customer_review_description || "-"}
                  </div>
                </div>
              )}
            </div>
            <hr />
            <div className="contractinfocontainer">
              <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
                <div className="startdate">Contract id :</div>
                <div className="datecontent">
                  {contractData?.id || "-"}
                </div>
              </div>
            </div>
            <hr />
            <div className="contractinfocontainer">
              <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
                <div className="startdate">Budget amount :</div>
                <div className="datecontent">{contractData?.amount || 0}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center flex-wrap customizecolgrid">
                <div className="startdate">Status :</div>
                <div className="datecontent">
                  {contractData?.payment_status
                    ? firstLatterCapital(contractData?.payment_status)
                    : "-"}
                </div>
              </div>
            </div>
            <hr />
          </div>
          {isOpen && (
            <CommonModal open={isOpen} onClose={toggleRatingModal}>
              <form>
                <div className="contactpopup d-flex justify-content-center align-items-center flex-column gap-4">
                  <div>Ratting and Review</div>
                  <div className="d-flex justify-content-center align-items-center gap-2 popupreviewsection">
                    <CommonRating
                      onChange={(value) => setRating(value)}
                      value={rating}
                    />
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e?.target?.value)}
                    placeholder="Enter your  review"
                  />
                  <button onClick={onSubmit} disabled={ratingLoading}>
                    {ratingLoading ? (
                      <div
                        className="spinner-border"
                        color="#9e4b34"
                        role="status"
                      ></div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </CommonModal>
          )}
        </div>
      )}
    </>
  );
};

export default MyContractView;
