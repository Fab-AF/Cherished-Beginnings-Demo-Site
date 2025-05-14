"use client";
import Doulanav from "@/Components/Doulanav/Doulanav";
import Button from "@/Components/Reusablecomponents/Buttoncomponent/Button";
import { getLocalStore, setLocalStore } from "@/modules/authentication";
import { isValidArray } from "@/modules/utils";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoulaArchiveAchive } from "../../Redux/contact/getArchiveAchiveSlice";
import {
  getDoulaContact,
  successStatus,
} from "../../Redux/contact/getContactSlice";
import "../../app/doula/customerprofile.css";
import NotFound from "../NotFound/NotFound";
import CommonImage from "../common/Image/CommonImage";
import CommonLoader from "../common/Loader";

const DoulaContactList = () => {
  const [activeRequest, setActiveRequest] = useState(true);
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  const [getDoulaContactList, setGetDoulaContactList] = useState([]);

  const route = useRouter();

  const dispatch = useDispatch();

  const toggleLayout = () => {
    setLocalStore("my-requests", !activeRequest);
    setActiveRequest(!activeRequest);
  };

  const handleAchiveArchive = async (type = "achive", id) => {
    try {
      setLoading(true);
      dispatch(
        getDoulaArchiveAchive(
          `${type === "achive" ? "achive" : "archive"}/${id}`
        )
      ).then((res) => {
        if (res?.payload?.success) {
          getContactDoulaList(1);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const getContactDoulaList = async (page) => {
    try {
      dispatch(
        getDoulaContact(
          `${
            activeRequest ? "active" : "achived"
          }=true&limit=${limit}&page=${page}`
        )
      ).then((res) => {
        if (res?.payload?.success) {
          setPage(page);
          setTotalPage(res?.payload?.pagination?.totalPages);
          setGetDoulaContactList(
            page === 1
              ? res?.payload?.contacts
              : [...getDoulaContactList, ...res?.payload?.contacts]
          );
        }
        setRequestLoading(false);
      });
    } catch (error) {
      setRequestLoading(false);
      console.log({ error });
    }
  };

  useEffect(() => {
    getContactDoulaList(1);
  }, [activeRequest]);

  useEffect(() => {
    const getActiveTab =
      getLocalStore("my-requests") === "false" ? false : true;
    setActiveRequest(getActiveTab);
  }, []);

  return (
    <>
      {/* active request layout */}
      <Doulanav />
      {activeRequest ? (
        <div className="createprofile">
          <div className="reqlistingcontainer">
            <div className="d-flex justify-content-between align-items-center">
              <div>Active Request</div>
              <div
                onClick={() => {
                  toggleLayout();
                }}
              >
                Archived Request
              </div>
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
                  {!requestLoading &&
                    isValidArray(getDoulaContactList) &&
                    getDoulaContactList?.map((data) => {
                      return (
                        <tr
                          onClick={() => route.push(`/my-requests/${data?.id}`)}
                        >
                          <td>
                            <CommonImage
                              className="m-2"
                              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.customer?.profile_image}`}
                              alt={
                                data?.customer?.first_name ||
                                "Cherished beginnings"
                              }
                              width={100}
                              height={100}
                            />
                            {data?.customer?.first_name || ""} (
                            {data?.messages?.length || 0})
                          </td>
                          <td className="messagewidth">
                            {data?.messages?.at(0)?.message || "-"}
                          </td>
                          <td>
                            {moment(data?.messages?.at(0)?.createdAt).format(
                              "DD MMM YYYY"
                            ) || "-"}
                          </td>
                          <td className="gap-5">
                            <Button
                              text="Achive request"
                              disabled={loading}
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleAchiveArchive("achive", data?.id);
                              }}
                            />
                            <Button
                              text="Archive request"
                              disabled={loading}
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleAchiveArchive("archive", data?.id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {requestLoading && <CommonLoader />}
              {!requestLoading && !isValidArray(getDoulaContactList) && (
                <NotFound />
              )}
              {+totalPage > +page && isValidArray(getDoulaContactList) && (
                <u
                  className="d-flex justify-content-center"
                  onClick={() => getContactDoulaList(page + 1)}
                >
                  View More
                </u>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="createprofile">
          <div className="reqlistingcontainer">
            <div className="d-flex justify-content-between align-items-center">
              <div>Achieved Request</div>
              <div
                onClick={() => {
                  toggleLayout();
                }}
              >
                Back to Active Request
              </div>
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
                  {!requestLoading &&
                    isValidArray(getDoulaContactList) &&
                    getDoulaContactList?.map((data) => {
                      return (
                        <tr>
                          <td
                            onClick={() =>
                              route.push(`/my-requests/${data?.id}`)
                            }
                          >
                            <CommonImage
                              className="m-2"
                              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.customer?.profile_image}`}
                              alt={data?.customer?.first_name}
                              width={100}
                              height={100}
                            />
                            {data?.customer?.first_name || ""}(
                            {data?.messages?.length || 0})
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
                            <Button
                              text="Achive request"
                              disabled={loading}
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleAchiveArchive("achive", data?.id);
                              }}
                            />
                            <Button
                              text="Archive request"
                              disabled={loading}
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleAchiveArchive("archive", data?.id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {requestLoading && <CommonLoader />}
              {!requestLoading && !isValidArray(getDoulaContactList) && (
                <NotFound />
              )}
              {+totalPage > +page && isValidArray(getDoulaContactList) && (
                <u
                  className="d-flex justify-content-center"
                  onClick={() => getContactDoulaList(page + 1)}
                >
                  View More
                </u>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoulaContactList;
