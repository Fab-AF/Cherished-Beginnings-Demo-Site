"use client";
import React, { useEffect, useState } from "react";
import Usernav from "../../Usernav/Usernav";
import reqlisprofile from "../../../Assets/messagewindow/reqlistingporfiele.svg";
import Link from "next/link";
import Button from "../../Reusablecomponents/Buttoncomponent/Button";
import Image from "next/image";
import "./Mycontract.css";
import { getApi } from "@/Redux/api";
import { firstLatterCapital, isValidArray } from "@/modules/utils";
import CommonImage from "@/Components/common/Image/CommonImage";
import moment from "moment";
import CommonRating from "@/Components/common/CommonRating";
import CommonLoader from "@/Components/common/Loader";
import NotFound from "@/Components/NotFound/NotFound";

const MyContracts = () => {
  const [myContracts, setMyContracts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [limit, setLimit] = useState(5);
  const [loading, setIsLoading] = useState(true);

  const getMyContracts = async (page) => {
    await getApi(`/payment/contracts?page=${page}&limit=${limit}`).then(
      (res) => {
        if (res?.data?.success) {
          setPage(page);
          setTotalPage(res?.data?.pagination?.totalPages);
          setMyContracts([...myContracts, ...res?.data?.contracts]);
        }
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    getMyContracts(1);
  }, []);
  return (
    <>
      <div className="mycontractreqlistingcontainer">
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
              {!loading &&
                isValidArray(myContracts) &&
                myContracts?.map((d) => {
                  return (
                    <tr>
                      <td>
                        <CommonImage
                          className="rounded-5"
                          src={d?.doula?.profile_image || ""}
                          alt={d?.doula?.first_name}
                          width={100}
                          height={100}
                        />
                        {d?.doula?.first_name}
                      </td>
                      <td>
                        {d?.createdAt
                          ? moment(d?.createdAt).format("DD MMM YYYY")
                          : "-"}
                      </td>
                      <td>
                        {JSON.parse(d?.time)?.map((d) => {
                          return (
                            <p>
                              {d?.from} to {d?.to}
                            </p>
                          );
                        })}
                      </td>
                      <td>${d?.amount || 0}</td>
                      <td>{firstLatterCapital(d?.payment_status) || "-"}</td>
                      <td>
                        <CommonRating disabled={true} value={d?.review || 0} />
                      </td>

                      <td>
                        <Link
                          href={`/contracts/${d?.doula_id}`}
                          className="text-primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {loading && <CommonLoader />}
          {!loading && !isValidArray(myContracts) && <NotFound />}
          {+totalPage > +page && isValidArray(myContracts) && (
            <u
              className="d-flex justify-content-center"
              onClick={() => getMyContracts(page + 1)}
            >
              View More
            </u>
          )}
        </div>
      </div>
    </>
  );
};

export default MyContracts;
