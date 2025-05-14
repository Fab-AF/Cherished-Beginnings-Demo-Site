"use client";
import ContactPopup from "@/Components/Message Window/ContactPopup/Contactpopup";
import CommonModal from "@/Components/common/CommonModal";
import CommonLoader from "@/Components/common/Loader";
import {
  DOULA_FILTER,
  getLocalStore,
  setLocalStore,
} from "@/modules/authentication";
import {
  additionalInformation,
  filterChildrenAgeRange,
  filterLanguages,
  filterService,
  professionalSkillRadioOption,
} from "@/modules/staticData";
import {
  firstLatterCapital,
  isValidArray,
  truncateString,
  withOutLoginServiceAccess,
} from "@/modules/utils";
import { Slider, Switch } from "antd";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fullhour from "../../../Assets/form2/24-hours 1.svg";
import locationImage from "../../../Assets/form2/Group 39213.svg";
import daytime from "../../../Assets/form2/daytime 1.svg";
import nighttime from "../../../Assets/form2/night-mode 1.svg";
import favourite from "../../../Assets/lisiting/favourite.svg";
import Addfavourite from "../../../Assets/lisiting/favouritefill.svg";
import notFoundDoula from "../../../Assets/lisiting/nocaregivers.svg";
import userimage from "../../../Assets/lisiting/profileimg.svg";
import stars from "../../../Assets/lisiting/starsgroup.svg";
import verify from "../../../Assets/lisiting/verifybadge.svg";
import {
  successStatus as doulaListingSuccessStatus,
  searchDoula,
} from "../../../Redux/customer/searchDoulaSlice";
import { addFavoriteDetail } from "../../../Redux/favorite/addSlice";
import "./Listview.css";
import CommonImage from "@/Components/common/Image/CommonImage";
import CommonRating from "@/Components/common/CommonRating";
import CommonDatePicker from "@/Components/common/CommonDatePicker";

const serviceImage = [
  {
    image: daytime,
  },
  {
    image: nighttime,
  },
  {
    image: fullhour,
  },
  {
    image: locationImage,
  },
];

const Listview = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [isFilterLoading, setIsFilterLoading] = useState(true);
  const [fid, setFid] = useState([]);
  const [total, setTotal] = useState(0);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [listingLoading, setListingLoading] = useState(true);
  const dispatch = useDispatch();
  const route = useRouter();
  const doulaListing = useSelector((state) => state?.searchDoula?.data);

  const handleHideShowText = (id) => {
    if (fid?.includes(id)) {
      setFid(fid.filter((item) => item !== id));
    } else {
      setFid([...fid, id]);
    }
  };

  const initialValue = {
    dateTo: "",
    dateFrom: "",
    child_info: [],
    child_age_range: [],
    additional_info: "",
    timeAvailability: "",
    languages: [],
    service: [],
    location: "",
    rate_per_night: {
      min: 20,
      max: 50,
    },
  };

  const [filter, setFilter] = useState(initialValue);
  const [selectData, setSelectData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const toggleContactModal = () => setShowModal(!showModal);

  const filterCount = () => {
    let count = 0;
    filter?.dateFrom && (count += 1);
    filter?.child_info?.length > 0 && (count += 1);
    !!filter?.additional_info && (count += 1);
    filter?.child_age_range?.length > 0 && (count += 1);
    filter?.timeAvailability && (count += 1);
    filter?.service?.length > 0 && (count += 1);
    !!filter?.location && (count += 1);
    filter?.languages?.length > 0 && (count += 1);

    return count;
  };

  const handleAddFavorite = async (id) => {
    // API call to add doula to favorite
    try {
      setLoading(true);
      dispatch(addFavoriteDetail(id)).then((res) => {
        if (res?.payload?.success) {
          getDoulaList();
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  const getDoulaList = useCallback(async () => {
    try {
      let obj = {};

      if (filter?.dateFrom) {
        obj = {
          ...obj,
          dateFrom: moment(filter?.dateFrom).format("DD-MM-YYYY"),
          dateTo: moment(filter?.dateTo).format("DD-MM-YYYY"),
        };
      }

      if (filter?.child_info?.length > 0) {
        obj = {
          ...obj,
          child_info: filter?.child_info?.map((d) => ({
            ...d,
            dob: moment(d?.dob).format("DD-MM-YYYY"),
          })),
        };
      }

      if (filter?.child_age_range?.length > 0) {
        obj = {
          ...obj,
          child_age_range: filter?.child_age_range?.join(","),
        };
      }

      if (filter?.timeAvailability) {
        obj = {
          ...obj,
          timeAvailability: filter?.timeAvailability,
        };
      }

      if (filter?.languages?.length > 0) {
        obj = {
          ...obj,
          languages: filter?.languages?.join(","),
        };
      }

      if (filter?.service?.length > 0) {
        obj = {
          ...obj,
          service: filter?.service?.join(),
        };
      }

      if (!!filter?.location) {
        obj = {
          ...obj,
          location: filter?.location,
        };
      }

      if (!!filter?.additional_info) {
        obj = {
          ...obj,
          additional_info: +filter?.additional_info,
        };
      }

      const query = `page=${pagination?.page}&limit=${pagination?.limit}`;
      setListingLoading(true);
      await dispatch(searchDoula({ data: obj, query })).then((res) => {
        if (res?.payload?.success) {
          setTotal(res?.payload?.pagination?.total || 0);
          dispatch(
            doulaListingSuccessStatus({
              data:
                pagination?.page === 1
                  ? res?.payload?.doulas
                  : [...(doulaListing?.data || []), ...res?.payload?.doulas],
            })
          );
        }
      });
      setListingLoading(false);
    } catch (error) {
      setListingLoading(false);
      console.log({ error });
    }
  }, [pagination, filter]);

  const handleFilter = (value, key) => {
    if (filter?.[key]?.includes(value)) {
      setFilter({
        ...filter,
        [key]: filter?.[key]?.filter((d) => d !== value),
      });
      setLocalStore(
        DOULA_FILTER,
        JSON.stringify({
          ...filter,
          [key]: filter?.[key]?.filter((d) => d !== value),
        })
      );
    } else {
      setFilter({
        ...filter,
        [key]: [...filter?.[key], value],
      });
      setLocalStore(
        DOULA_FILTER,
        JSON.stringify({
          ...filter,
          [key]: [...filter?.[key], value],
        })
      );
    }
    setPagination({ ...pagination, page: 1 });
  };

  const handleSetFilter = () => {
    setIsFilterLoading(true);
    const localFilter = JSON.parse(getLocalStore(DOULA_FILTER));
    if (!localFilter || Object.keys(localFilter)?.length === 0) {
      setIsFilterLoading(false);
      return;
    }

    if (localFilter?.location) {
      setLocation(localFilter?.location);
    }

    const updatedFilter = {
      ...filter,
      ...localFilter,
      ...(localFilter?.dateFrom && {
        dateFrom: localFilter?.dateFrom,
      }),
      ...(localFilter?.dateTo && {
        dateTo: localFilter?.dateTo,
      }),
      ...(localFilter?.child_info?.length > 0 && {
        child_info: localFilter?.child_info?.map((d) => {
          return {
            ...d,
            dob: localFilter?.child_info?.at(0)?.dob,
          };
        }),
      }),
    };

    setFilter(updatedFilter);
    setIsFilterLoading(false);
  };

  useEffect(() => {
    handleSetFilter();
  }, []);

  useEffect(() => {
    if (!isFilterLoading) {
      getDoulaList();
    }
  }, [getDoulaList, isFilterLoading]);

  return (
    <>
      {" "}
      <nav className="listingnavtwo">
        <div className="listleft position-relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e?.target?.value)}
            placeholder="Enter Zip"
          />
          <button
            disabled={!!!location}
            onClick={() => setFilter({ ...filter, location: location })}
          >
            Find
          </button>
        </div>
        <div className="listright d-flex justify-content-center align-items-center gap-5">
          {filterService?.map((data, ind) => {
            return (
              <label
                onClick={() => handleFilter(ind + 1, "service")}
                htmlFor={data?.toLocaleLowerCase()}
                className={`radio-label ${
                  filter?.service?.includes(ind + 1) ? "header-active" : ""
                }`}
              >
                <div className="d-flex justify-content-center align-items-center gap-2 ">
                  <Image
                    src={serviceImage[ind]?.image}
                    alt="Cherished beginnings"
                  />
                  <div>{data}</div>
                </div>
              </label>
            );
          })}
        </div>
      </nav>
      <div className="mainlistviewcontainer mt-4 d-flex">
        <div className="mainlistleft">
          <div className="d-flex justify-content-between align-items-center">
            <div className="filtertitle">Filter ({filterCount()})</div>
            <input
              className="clearallfilter"
              type="reset"
              disabled={filterCount() === 0}
              onClick={() => {
                if (filterCount() !== 0) {
                  setFilter(initialValue);
                  setLocation("");
                  setLocalStore(DOULA_FILTER, JSON.stringify({}));
                }
              }}
              value="Clear All"
            />
          </div>
          <div>
            <hr />
          </div>
          <div className="d-flex flex-column gap-3">
            <div>
              <label className="filtertitle" htmlFor="">
                Select Care Date
                <div>
                  <CommonDatePicker
                    onChange={(date) => {
                      setFilter({
                        ...filter,
                        dateFrom: date || "",
                        dateTo: date || "",
                      });
                    }}
                    value={filter?.dateFrom}
                    name="start"
                    className="px-4 py-3 forminoutset"
                    id=""
                  />
                </div>
              </label>
            </div>
            <div>
              <label className="filtertitle" htmlFor="">
                Date of Birth
                <div>
                  <CommonDatePicker
                    value={filter?.child_info?.[0]?.dob || ""}
                    onChange={(date) => {
                      setFilter({
                        ...filter,
                        child_info: !!date
                          ? [{ dob: date, multiplicity: "" }]
                          : [],
                      });
                    }}
                    disabledDate={(current) =>
                      current && current > moment().endOf("day")
                    }
                    className="px-4 py-3 forminoutset"
                    name="dob"
                    id="dob"
                  />
                </div>
              </label>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="filtertitle"> Child age Range</div>
              <div className="d-flex flex-wrap gap-2">
                {filterChildrenAgeRange?.map((d, ind) => {
                  return (
                    <label
                      key={d}
                      htmlFor="yrs0-11"
                      className={` ${
                        filter?.child_age_range?.includes(ind + 1)
                          ? "active-bg radius-5rm"
                          : ""
                      } d-flex  align-items-center gap-1 `}
                      onClick={() => handleFilter(ind + 1, "child_age_range")}
                    >
                      <div className="radioparrent">
                        <span> {d}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="filtertitle"> Professional Skill</div>
              <div className="d-flex flex-wrap gap-2">
                {additionalInformation?.map((data, ind) => {
                  return (
                    <label
                      key={data}
                      htmlFor={data?.toLocaleLowerCase()}
                      className="d-flex align-items-center gap-1 "
                    >
                      <input
                        type="radio"
                        onChange={() =>
                          setFilter({
                            ...filter,
                            additional_info: ind + 1,
                          })
                        }
                        checked={filter?.additional_info === ind + 1}
                        name="skill"
                        id={data?.toLocaleLowerCase()}
                      />
                      <div className="radioparrent">
                        <span>{data}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="filtertitle"> Time availability</div>
              <div className="d-flex flex-wrap gap-2">
                <label
                  htmlFor="fullTime"
                  className="d-flex align-items-center gap-1 "
                >
                  <input
                    type="radio"
                    name="availability"
                    onChange={() =>
                      setFilter({ ...filter, timeAvailability: 1 })
                    }
                    checked={filter?.timeAvailability === 1}
                    id="fullTime"
                  />
                  <div className="radioparrent">
                    <span>Full time</span>
                  </div>
                </label>
                <label
                  htmlFor="partTime"
                  className="d-flex align-items-center gap-1 "
                >
                  <input
                    type="radio"
                    name="availability"
                    id="partTime"
                    onChange={() =>
                      setFilter({ ...filter, timeAvailability: 2 })
                    }
                    checked={filter?.timeAvailability === 2}
                  />
                  <div className=" radioparrent">
                    <span>Part time</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="filtertitle">Language spoken</div>
              <div className="d-flex flex-wrap gap-2">
                {filterLanguages?.map((d, ind) => {
                  return (
                    <label
                      htmlFor={d?.toLocaleLowerCase()}
                      key={d}
                      className={`${
                        filter?.languages?.includes(ind + 1)
                          ? "active-bg radius-5rm"
                          : ""
                      } d-flex align-items-center gap-1 `}
                      onClick={() => handleFilter(ind + 1, "languages")}
                    >
                      <div className="radioparrent">
                        <span>{d}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="filtertitle"> Rate per night</div>
              <Slider
                range
                defaultValue={[20, 50]}
                onChange={(value) => {
                  const min = Math.min(...value);
                  const max = Math.max(...value);
                  setFilter({
                    ...filter,
                    rate_per_night: {
                      ...filter?.rate_per_night,
                      min: min,
                      max: max,
                    },
                  });
                }}
              />
              <div className="d-flex gap-2 minmaxparent">
                <div className="d-flex flex-column gap-1 ">
                  <span>Min Price</span>
                  <div>{filter?.rate_per_night?.min || 0}</div>
                </div>
                <div className="d-flex flex-column gap-1 ">
                  <span>Max Price</span>
                  <div>{filter?.rate_per_night?.max || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainlistright">
          <div>{total || 0} Caregivers available in this area</div>
          <div className="listcontainer d-flex flex-column gap-3">
            {isValidArray(doulaListing?.data) ? (
              doulaListing?.data?.map((data) => {
                return (
                  <div
                    key={data}
                    onClick={() => {
                      if (withOutLoginServiceAccess()) {
                        route?.push(`/listing/${data?.id}`);
                      }
                    }}
                    className="listcardcontainer d-flex justify-content-between align-items-center gap-4"
                  >
                    <div>
                      <CommonImage
                        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${data?.profile_image}`}
                        width={100}
                        height={100}
                        className="m-2 doulaprofileimg"
                        alt="Cherished beginnings"
                      />
                      <div>
                        <div className="d-flex gap-2">
                          <span className="caardusername">{`${firstLatterCapital(
                            data?.first_name || ""
                          )} ${firstLatterCapital(
                            data?.last_name || ""
                          )}`}</span>
                          <Image src={verify} alt="Cherished beginnings" />
                        </div>
                        <div className="carduserlocation">
                          {data?.city || ""} -{" "}
                          {data?.userDetail?.location || ""}
                        </div>
                        {(+data?.doulaRatings?.at(0)?.averageRating || 0) !==
                          0 && (
                          <div className="d-flex align-items-center gap-2 my-2">
                            <div>
                              <strong>
                                {" "}
                                {(
                                  +data?.doulaRatings?.at(0)?.averageRating || 0
                                ).toFixed(1)}{" "}
                              </strong>
                            </div>
                            <CommonRating
                              disabled={true}
                              value={
                                +data?.doulaRatings?.at(0)?.averageRating || 0
                              }
                            />
                            <div>
                              (
                              {(
                                +data?.doulaRatings?.at(0)?.ratingCount || 0
                              ).toFixed(0)}{" "}
                              Review)
                            </div>
                          </div>
                        )}
                        <div className="nannydesc">
                          {fid?.includes(data?.id)
                            ? data?.userDetail?.profile_description
                            : truncateString(
                                data?.userDetail?.profile_description
                              )}
                        </div>
                        {data?.userDetail?.profile_description?.length > 100 &&
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
                    <div className="d-flex flex-column align-items-end listlast">
                      <div className="d-flex gap-2 align-items-center">
                        <Image
                          onClick={(e) => {
                            e?.stopPropagation();
                            if (withOutLoginServiceAccess()) {
                              !loading && handleAddFavorite(data?.id);
                            }
                          }}
                          src={
                            data?.is_favorite === 0 ? favourite : Addfavourite
                          }
                          disabled={loading}
                          className="favouriteicon"
                          alt="Cherished beginnings"
                        />
                        <button
                          className="contactbutton"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (withOutLoginServiceAccess()) {
                              toggleContactModal();
                              setSelectData(data);
                            }
                          }}
                        >
                          Contact
                        </button>
                      </div>
                      <div>
                        <div className="list-amount">
                          {data?.userDetail?.hourly_rate_currency || "$"}
                          {data?.userDetail?.hourly_rate || 0}
                        </div>
                        <div className="list-perhour">per hour</div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : listingLoading ? (
              <CommonLoader />
            ) : (
              <Image className="nodoulafound" src={notFoundDoula} />
            )}

            {total !== doulaListing?.data?.length &&
              isValidArray(doulaListing?.data) &&
              pagination?.limit < total && (
                <u
                  className="text-center"
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination?.page + 1 })
                  }
                >
                  View More
                </u>
              )}
          </div>
        </div>
        {showModal && (
          <CommonModal open={showModal} onClose={toggleContactModal}>
            <ContactPopup data={selectData} onClose={toggleContactModal} />
          </CommonModal>
        )}
      </div>
    </>
  );
};

export default Listview;
