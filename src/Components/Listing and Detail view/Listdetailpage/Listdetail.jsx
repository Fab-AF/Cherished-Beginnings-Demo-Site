"use client";
import CalendarPage from "@/Components/Calender/Calender";
import CommonModal from "@/Components/common/CommonModal";
import CommonRatingAndReview from "@/Components/common/CommonRatingAndReview";
import ContactPopup from "@/Components/Message Window/ContactPopup/Contactpopup";
import { reversFormateAFor24HoursTime } from "@/modules/staticData";
import { getShortNameForDays, timeSince } from "@/modules/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import favourite from "../../../Assets/lisiting/favourite.svg";
import userimage from "../../../Assets/lisiting/profileimg.svg";
import singlestart from "../../../Assets/lisiting/singlestart.svg";
import stars from "../../../Assets/lisiting/starsgroup.svg";
import verify from "../../../Assets/lisiting/verifybadge.svg";
import { getDoulaDetail } from "../../../Redux/customer/getDoulsDetailSlice";
import { addFavoriteDetail } from "../../../Redux/favorite/addSlice";
import "./Listdetail.css";
import CommonRating from "@/Components/common/CommonRating";
import CommonImage from "@/Components/common/Image/CommonImage";
import CommonLoader from "@/Components/common/Loader";
import Addfavourite from "../../../Assets/lisiting/favouritefill.svg";
import SuccessPage from "@/Components/Success/SuccessPage";
import { getUserRole } from "@/modules/authentication";

const Listdetail = () => {
  const [doulaDetails, serDoulaDetails] = useState({});

  const [openSuccess, setOpenSuccess] = useState(false);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [ratingList, setRatingList] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState({});
  const [loading, setLoading] = useState(true);
  const [ratingModalOpen, seRatingModalOpen] = useState(false);
  const route = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  if (+getUserRole() === 2) {
    return route.back();
  }

  const handleToggleContactToDoula = () => setShow(!show);
  const handleToggleRatingModal = () => seRatingModalOpen(!ratingModalOpen);
  const toggleOpenSuccess = (data) => {
    setPaymentSuccess(data);
    setOpenSuccess(!openSuccess);
  };

  const handleAddFavorite = async () => {
    try {
      dispatch(addFavoriteDetail(id)).then((res) => {
        if (res?.payload?.success) {
          setData({
            ...data,
            is_favorite:
              res?.payload?.messaeg === "Doula add to favorite." ? 1 : 0,
          });
        }
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getDoulaDetailsData = useCallback(async () => {
    try {
      setLoading(true);
      dispatch(getDoulaDetail(id)).then((res) => {
        if (!!res?.payload?.doula) {
          const doulaAvailabilities =
            res?.payload?.doula?.doulaAvailabilities?.sort(
              (a, b) => a?.id - b?.id
            );
          setData(res?.payload);
          setRatingList(res?.payload?.ratings);
          serDoulaDetails({ ...res?.payload?.doula, doulaAvailabilities });
          setLoading(false);
        } else {
          setLoading(false);
          route.push("/listing");
        }
      });
    } catch (error) {
      route.back();
    }
  }, [id]);

  useEffect(() => {
    getDoulaDetailsData();
  }, [getDoulaDetailsData]);

  if (loading) {
    return <CommonLoader />;
  }
  return (
    <>
      {show && (
        <CommonModal open={show} onClose={handleToggleContactToDoula}>
          <ContactPopup
            data={doulaDetails}
            onClose={handleToggleContactToDoula}
          />
        </CommonModal>
      )}
      {ratingModalOpen && (
        <CommonModal open={ratingModalOpen} onClose={handleToggleRatingModal}>
          <CommonRatingAndReview
            getDoulaDetailsData={getDoulaDetailsData}
            id={id}
            onClose={handleToggleRatingModal}
          />
        </CommonModal>
      )}
      <div className="listing__details">
        <div className="detailprofilecont">
          <div className="listdetailcardcontainer d-flex justify-content-between align-items-center gap-4">
            <div className="d-flex align-items-center gap-3">
              {doulaDetails?.profile_image ? (
                <CommonImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${doulaDetails?.profile_image}`}
                  width={100}
                  height={100}
                  className="listdetailprofileimg"
                  alt="Cherished beginnings"
                />
              ) : (
                <Image
                  src={userimage}
                  className="listdetailprofileimg"
                  alt="Cherished beginnings"
                />
              )}
              <div className="d-flex flex-column">
                <div className="d-flex gap-2">
                  <span className="caardusername">
                    {doulaDetails?.first_name}
                  </span>
                  <Image src={verify} alt="Cherished beginnings" />
                </div>
                <div className="detailcarduserlocation">
                  {doulaDetails?.city} - {doulaDetails?.userDetail?.location}
                </div>
                <div className="d-flex align-items-center gap-2 my-2">
                  <div>
                    <strong>
                      {" "}
                      {(+ratingList?.averageRating || 0).toFixed(1)}{" "}
                    </strong>
                  </div>
                  <CommonRating
                    disabled={true}
                    value={+ratingList?.averageRating || 0}
                  />
                  <div>
                    ({(+ratingList?.totalRatings || 0).toFixed(0)} Review)
                  </div>
                </div>
                <div className="detailnannydesc">
                  From {doulaDetails?.userDetail?.hourly_rate_currency || "$"}
                  {doulaDetails?.userDetail?.hourly_rate} per hour
                </div>
                <div className="detailnannydesc">
                  {doulaDetails?.userDetail?.experience} of experience
                </div>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <Image
                onClick={handleAddFavorite}
                src={data?.is_favorite === 1 ? Addfavourite : favourite}
                alt="Cherished beginnings"
                className="favouriteicon"
              />
              <button
                className="contactbutton"
                onClick={handleToggleContactToDoula}
              // data-bs-toggle="modal"
              // data-bs-target="#contactpopup"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
        <div className="aboutlistdetail">
          {/* ABout */}
          <div className="detailinfo d-flex flex-column gap-2">
            <div className="detailinfotitle">About Katie</div>
            <div className="detailinfoddesctitle">
              Experience: {doulaDetails?.userDetail?.experience}
            </div>
            <div className="detailinfoddesc">
              {doulaDetails?.userDetail?.profile_description}
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div className="detailinfo">
            <div className="detailinfotitle">Services</div>
            <div className="detailinfoddesc d-flex justify-content-between">
              <ul>
                {doulaDetails?.doulaServices?.slice(0, 3)?.map((d) => {
                  return <li>{d?.service?.serviceName}</li>;
                })}
              </ul>
              <ul>
                {doulaDetails?.doulaServices?.slice(3, 6)?.map((d) => {
                  return <li>{d?.service?.serviceName}</li>;
                })}
              </ul>
              <ul>
                {doulaDetails?.doulaServices?.slice(6, 9)?.map((d) => {
                  return <li>{d?.service?.serviceName}</li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div className="detailinfo">
            <div className="detailinfotitle">Rates</div>
            <div className="ratesfont d-flex gap-3">
              <div>Hourly Rate: </div>

              <div>
                {doulaDetails?.userDetail?.hourly_rate_currency}
                {doulaDetails?.userDetail?.hourly_rate || 0}/hr
              </div>
            </div>
            {/* <div className="ratesfont d-flex gap-3">
              <div>1 Child</div>
              <div>$20/hr</div>
            </div> */}
          </div>
          <div>
            <hr />
          </div>
          <div className="detailinfo">
            <div className="detailinfotitle">Availability</div>

            <div className="d-flex gap-5">
              <div>
                {doulaDetails?.doulaAvailabilities?.slice(0, 3)?.map((d) => {
                  return (
                    <div className="ratesfont d-flex gap-3">
                      <div>{getShortNameForDays[d?.day_of_week]} :</div>
                      <div>
                        {reversFormateAFor24HoursTime[d?.start_time]}–
                        {reversFormateAFor24HoursTime[d?.end_time]}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                {doulaDetails?.doulaAvailabilities?.slice(3, 6)?.map((d) => {
                  return (
                    <div className="ratesfont d-flex gap-3">
                      <div>{getShortNameForDays[d?.day_of_week]} :</div>
                      <div>
                        {reversFormateAFor24HoursTime[d?.start_time]}–
                        {reversFormateAFor24HoursTime[d?.end_time]}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                {doulaDetails?.doulaAvailabilities?.slice(6)?.map((d) => {
                  return (
                    <div className="ratesfont d-flex gap-3">
                      <div>{getShortNameForDays[d?.day_of_week]} :</div>
                      <div>
                        {reversFormateAFor24HoursTime[d?.start_time]}–
                        {reversFormateAFor24HoursTime[d?.end_time]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div className="detailinfo">
            <div className="detailinfotitle">Schedule</div>
            <div className="d-flex gap-5">
              <div className="languagefonts d-flex flex-column ">
                <div>Education</div>
                <div>{doulaDetails?.userDetail?.university_college || "-"}</div>
              </div>
              <div className="languagefonts d-flex flex-column ">
                <div>Language</div>
                <div>
                  {doulaDetails?.userLanguages?.length > 0
                    ? doulaDetails?.userLanguages
                      ?.map((d) => d?.language?.languageName)
                      ?.join(",")
                    : "-"}
                </div>
              </div>
              <div className="languagefonts d-flex flex-column ">
                <div>Professional skills</div>
                <div>College degree</div>
              </div>
            </div>
          </div>
          <div>
            <hr />
            <CalendarPage
              scheduleData={doulaDetails?.doulaAvailabilities || []}
              toggleOpenSuccess={toggleOpenSuccess}
            />
          </div>
          <div className="detailinfo">
            <div className="detailinfotitle">Review & Rating</div>
            <button className="addcardbutton" onClick={handleToggleRatingModal}>
              Edit your review
            </button>
            <div className="reviewcontainer d-flex justify-content-between align-items-center">
              <div className="reviewleft w-75">
                {ratingList?.ratingPercentages
                  ?.sort((a, b) => {
                    return b?.rating - a?.rating;
                  })
                  ?.map((d) => {
                    return (
                      <div className="d-flex align-items-center gap-2">
                        <div className="starttitel">{d?.rating}</div>
                        <Image src={singlestart} alt="Cherished beginnings" />
                        <progress
                          id="file"
                          value={
                            +(
                              (d?.percentage?.toString() === "NaN"
                                ? 0
                                : +d?.percentage) || 0
                            )
                          }
                          max="100"
                        ></progress>
                      </div>
                    );
                  })}
              </div>
              <div className="reviewright">
                <div>{(+ratingList?.averageRating || 0).toFixed(1)}</div>
                <div>
                  <CommonRating
                    disabled={true}
                    value={+ratingList?.averageRating || 0}
                  />
                </div>
                <div>{(+ratingList?.totalRatings || 0).toFixed(0)} Reviews</div>
              </div>
            </div>
          </div>

          <div className="detailpagetestimnoaials mt-4">
            {data?.ratingByUsers?.map((data) => {
              return (
                <>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center gap-3">
                      <div className="testpprofile">
                        <CommonImage
                          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.user?.profile_image}`}
                          width={100}
                          height={100}
                          className="listdetailprofileimgtestimonial"
                          alt="Cherished beginnings"
                        />
                      </div>
                      <div>
                        <div>
                          {data?.user?.first_name} {data?.user?.last_name}
                        </div>
                        <div>
                          {data?.ratings}{" "}
                          <CommonRating disabled={true} value={data?.ratings} />
                          <span>{timeSince(data?.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div>{data?.description || "-"}</div>
                  </div>
                  <div>
                    <hr />
                  </div>
                </>
              );
            })}

            <div className="detailinfo">
              <div className="detailinfotitle">Similar caregivers nearby</div>
              <div className="d-flex align-items-center gap-3 overflow-x-auto">
                {data?.similarDoulas?.map((data) => {
                  return (
                    <div>
                      <CommonImage
                        src={
                          data?.profile_image
                            ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.profile_image}`
                            : userimage
                        }
                        width={100}
                        height={100}
                        alt={data?.first_name || `Cherished beginnings`}
                      />
                      <div>
                        {data?.first_name} {data?.last_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {openSuccess && (
              <CommonModal onClose={toggleOpenSuccess} open={openSuccess}>
                <SuccessPage data={paymentSuccess} />
              </CommonModal>
            )}
            <div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listdetail;
