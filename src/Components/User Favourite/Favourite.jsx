"use client";
import { getUserRole } from "@/modules/authentication";
import { isValidArray, truncateString } from "@/modules/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteDetail,
  removeAllFavoriteDetail,
} from "../../Redux/favorite/addSlice";
import {
  getFavoriteDetail,
  successStatus,
} from "../../Redux/favorite/getListSlice";
import favourite from "../../Assets/lisiting/favouritefill.svg";
import stars from "../../Assets/lisiting/starsgroup.svg";
import verify from "../../Assets/lisiting/verifybadge.svg";
import NotFound from "../NotFound/NotFound";
import Button from "../Reusablecomponents/Buttoncomponent/Button";
import Usernav from "../Usernav/Usernav";
import CommonLoader from "../common/Loader";
import CommonModal from "../common/CommonModal";
import ContactPopup from "../Message Window/ContactPopup/Contactpopup";
import CommonImage from "../common/Image/CommonImage";
import "./Favourite.css";
import CommonRating from "../common/CommonRating";

const Favourite = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fid, setFid] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectData, setSelectData] = useState({});
  const [favoriteList, setFavoriteList] = useState([]);
  const dispatch = useDispatch();

  const toggleContactModal = () => setShowModal(!showModal);

  if (+getUserRole() === 2) {
    redirect("/");
  }

  const handleAddFavorite = async (id) => {
    // API call to add doula to favorite
    try {
      setLoading(true);
      dispatch(addFavoriteDetail(id)).then((res) => {
        if (res?.payload?.success) {
          getFavoriteData(1);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  const handleHideShowText = (id) => {
    if (fid?.includes(id)) {
      setFid(fid.filter((item) => item !== id));
    } else {
      setFid([...fid, id]);
    }
  };

  const getFavoriteData = async (page) => {
    try {
      const query = `page=${page}&limit=${limit}`;
      dispatch(getFavoriteDetail(query)).then((res) => {
        if (res?.payload?.success) {
          setTotalPage(res?.payload?.pagination?.totalPages);
          setPage(page);
          setFavoriteList(
            page === 1
              ? res?.payload?.doulas
              : [...favoriteList, ...res?.payload?.doulas]
          );
        }
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleAllRemoveFavorite = async () => {
    try {
      const id = favoriteList?.map((d) => d?.doula_id)?.join(",");
      dispatch(removeAllFavoriteDetail({ id })).then((res) => {
        if (res?.payload?.success) {
          getFavoriteData(1);
        }
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getFavoriteData(1);
  }, []);
  return (
    <>
      <Usernav currentPath="/favourite" />
      <div className="mainlistright">
        {isValidArray(favoriteList) && (
          <div
            onClick={handleAllRemoveFavorite}
            className="d-flex justify-content-end align-items-center"
          >
            Remove All
          </div>
        )}
        <div className="listcontainer d-flex flex-column gap-3">
          {!isLoading &&
            isValidArray(favoriteList) &&
            favoriteList?.map((data) => {
              return (
                <div className="listcardcontainer d-flex justify-content-between align-items-center gap-4">
                  <div>
                    <CommonImage
                      className="m-2 doulaprofileimg"
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.user?.profile_image}`}
                      alt="Cherished beginnings"
                      width={100}
                      height={100}
                    />
                    <div>
                      <div>
                        <div className="d-flex gap-2">
                          <span className="caardusername">
                            {data?.user?.first_name} {data?.user?.last_name}
                          </span>
                          <Image
                            loading="lazy"
                            src={verify}
                            alt="Cherished beginnings"
                          />
                        </div>
                        <div className="carduserlocation">
                          {data?.user?.city} -{" "}
                          {data?.user?.userDetail?.location}
                        </div>
                        {(+data?.["user.doulaRatings"]?.averageRating || 0) !==
                          0 && (
                          <div className="d-flex align-items-center gap-2 my-2">
                            <div>
                              <strong>
                                {(
                                  +data?.["user.doulaRatings"]?.averageRating ||
                                  0
                                ).toFixed(1)}{" "}
                              </strong>
                            </div>
                            <CommonRating
                              allowHalf={true}
                              value={
                                +data?.["user.doulaRatings"]?.averageRating
                              }
                              disabled={true}
                            />
                            <div>
                              ({+data?.["user.doulaRatings"]?.ratingCount || 0}{" "}
                              Review)
                            </div>
                          </div>
                        )}
                        <div className="nannydesc">
                          {fid?.includes(data?.id)
                            ? data?.user?.userDetail?.profile_description
                            : truncateString(
                                data?.user?.userDetail?.profile_description
                              )}
                        </div>
                        {data?.user?.userDetail?.profile_description?.length >
                          100 &&
                          (!fid?.includes(data?.id) ? (
                            <u onClick={() => handleHideShowText(data?.id)}>
                              Read More
                            </u>
                          ) : (
                            <u onClick={() => handleHideShowText(data?.id)}>
                              Hide description
                            </u>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end listlast">
                    <div className="d-flex gap-2 align-items-center">
                      <Image
                        onClick={() =>
                          !loading && handleAddFavorite(data?.doula_id)
                        }
                        src={favourite}
                        className="favouriteicon"
                        alt="Cherished beginnings"
                      />
                      <Button
                        onClick={() => {
                          toggleContactModal();
                          setSelectData(data);
                        }}
                        text="Contact"
                      />
                    </div>
                    <div>
                      <div className="list-amount">
                        {data?.user?.userDetail?.hourly_rate_currency || "$"}
                        {data?.user?.userDetail?.hourly_rate || 0}
                      </div>
                      <div className="list-perhour">per hour</div>
                    </div>
                  </div>
                </div>
              );
            })}
          {isLoading && <CommonLoader />}
          {!isLoading && !isValidArray(favoriteList) && <NotFound />}
          {+totalPage > +page && isValidArray(favoriteList) && (
            <u
              className="d-flex justify-content-center"
              onClick={() => getFavoriteData(page + 1)}
            >
              View More
            </u>
          )}
        </div>
      </div>
      {showModal && (
        <CommonModal open={showModal} onClose={toggleContactModal}>
          <ContactPopup
            data={{
              ...selectData,
              id: selectData?.doula_id,
              profile_image: selectData?.user?.profile_image,
              userDetail: {
                experience: selectData?.user?.userDetail?.experience,
              },
            }}
            onClose={toggleContactModal}
          />
        </CommonModal>
      )}
    </>
  );
};

export default Favourite;
