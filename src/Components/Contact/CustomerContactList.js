"use client";
import Usernav from "@/Components/Usernav/Usernav";
import { isValidArray } from "@/modules/utils";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoulaContact,
  successStatus,
} from "../../Redux/contact/getContactSlice";
import NotFound from "../NotFound/NotFound";
import CommonImage from "../common/Image/CommonImage";
import CommonLoader from "../common/Loader";
import "./reqlisting.css";

const CustomerContactList = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [getContactList, seGetContactList] = useState([]);

  const route = useRouter();
  const dispatch = useDispatch();

  const getContactDoulaList = async (page) => {
    try {
      const query = `page=${page}&limit=${limit}`;
      dispatch(getDoulaContact(query)).then((res) => {
        if (res?.payload?.success) {
          setPage(page);
          setTotalPage(res?.payload?.pagination?.totalPages);
          seGetContactList(
            page === 1
              ? res?.payload?.contacts
              : [...getContactList, ...res?.payload?.contacts]
          );
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContactDoulaList(1);
  }, []);

  return (
    <>
      <Usernav currentPath="/my-requests" />
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
              {!loading &&
                isValidArray(getContactList) &&
                getContactList?.map((data) => {
                  return (
                    <tr>
                      <td>
                        <CommonImage
                          className="m-2 m-2 rounded-5"
                          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.doula?.profile_image}`}
                          alt="Cherished beginnings"
                          width={57}
                          height={57}
                        />
                        {data?.doula?.first_name || ""}
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
                        <a
                          className="text-primary"
                          onClick={() => route.push(`/my-requests/${data?.id}`)}
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {loading && <CommonLoader />}
          {!loading && !isValidArray(getContactList) && <NotFound />}
          {+totalPage > +page && isValidArray(getContactList) && (
            <u
              className="d-flex justify-content-center"
              onClick={() => getContactDoulaList(page + 1)}
            >
              View More
            </u>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerContactList;
