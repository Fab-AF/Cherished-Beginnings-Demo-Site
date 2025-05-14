"use client";
import { filterService } from "@/modules/staticData";
import { child_info_data } from "@/modules/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import closeicon from "../../Assets/arrow/close.png";
import arrow from "../../Assets/arrow/Outlined/32/ArrowRight.svg";
import fullhour from "../../Assets/form2/24-hours 1.svg";
import daytime from "../../Assets/form2/daytime 1.svg";
import group from "../../Assets/form2/Group 39213.svg";
import nighttime from "../../Assets/form2/night-mode 1.svg";
import singleton from "../../Assets/form2/singleton.svg";
import triplet from "../../Assets/form2/triplets.svg";
import twins from "../../Assets/form2/twins.svg";
import form1logo from "../../Assets/logo-powerful-logo-for-newborn/logo-powerful-logo-for-newborn/Cherished Beginnings - final 1.png";
import { closeFindcareFormoneModal } from "../../Redux/modalSlice";
import "./FindCareForm.css";
// import { successStatus as doulaListingSuccessStatus } from "../../../Redux/customer/searchDoulaSlice";
import { DOULA_FILTER, setLocalStore } from "@/modules/authentication";
import moment from "moment";

const FindCareForm = () => {
  const [filterSearch, setFilterSearch] = useState({
    service: [],
  });
  const [childrenInfo, setChildrenInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      child_info: [{ multiplicity: "", dob: "" }],
    },
  });
  const route = useRouter();

  const handleChildrenInfo = (key, value, index) => {
    if (childrenInfo?.some((d) => d?.id === index)) {
      const update = childrenInfo?.map((d) => {
        if (d?.id === index) {
          return {
            ...d,
            [key]: value,
          };
        }
        return d;
      });
      setChildrenInfo(update);
    } else {
      setChildrenInfo([...childrenInfo, { id: index, [key]: value }]);
    }
  };
  const handleChangeCheckbox = (service) => {
    if (!filterSearch.service.includes(service)) {
      setFilterSearch({
        ...filterSearch,
        service: [...filterSearch.service, service],
      });
    } else {
      setFilterSearch({
        ...filterSearch,
        service: filterSearch.service.filter((d) => d !== service),
      });
    }
  };

  const validateStartDate = (e) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(e?.target?.value).setHours(0, 0, 0, 0);
    if (selectedDate <= today && today !== selectedDate) {
      return setError("dateTo", {
        message: "Start date cannot be in the past",
      });
    }
    clearErrors(["dateTo"]);
  };

  const validateEndDate = (e) => {
    const startDate = new Date(getValues("dateTo")).setHours(0, 0, 0, 0);
    const selectedDate = new Date(e?.target?.value).setHours(0, 0, 0, 0);

    if (selectedDate <= startDate && selectedDate !== startDate) {
      return setError("dateFrom", {
        message: "End date cannot be before start date",
      });
    }
    clearErrors(["dateFrom"]);
  };

  const serviceImage = {
    0: daytime,
    1: nighttime,
    2: fullhour,
    3: group,
  };

  const filterData = useSelector((state) => state?.searchFilter?.data);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "child_info",
  });

  const removeData = (index) => {
    if (fields.length === 1) {
      reset({ child_info: [{ multiplicity: "", dob: "" }] });
    } else {
      remove(index);
    }
  };

  const dispatch = useDispatch(); // Get dispatch function

  const onSubmit = (data) => {
    try {
      // Add your form submission logic here
      // if (selectedDate <= startDate && selectedDate !== startDate) {
      //   return setError("dateFrom", {
      //     message: "End date cannot be before start date",
      //   });
      // }

      setLoading(true);
      let service = [];
      filterSearch?.service?.forEach((d, ind) => {
        if (filterService?.includes(d)) {
          service.push(ind + 1);
        }
      });
      const updateChildrenData =
        childrenInfo
          ?.map((d) => {
            return {
              multiplicity: child_info_data[d?.multiplicity],
              dob: moment(d?.dob).format("DD-MM-YYYY"),
            };
          })
          ?.filter((d) => d?.dob || d?.multiplicity) || [];

      let obj = {};

      if (data?.location) {
        obj = { ...obj, location: data?.location };
      }

      if (data?.dateTo) {
        obj = { ...obj, dateTo: moment(data?.dateTo).format("DD-MM-YYYY") };
      }

      if (data?.dateFrom) {
        obj = { ...obj, dateFrom: moment(data?.dateFrom).format("DD-MM-YYYY") };
      }

      if (service?.length > 0) {
        obj = { ...obj, service };
      }

      if (updateChildrenData?.length > 0) {
        obj = { ...obj, child_info: updateChildrenData };
      }

      setLocalStore(DOULA_FILTER, JSON.stringify(obj));

      // dispatch(filterSearchSuccess(obj));

      // dispatch(searchDoula({ data: obj })).then((res) => {
      //   dispatch(
      //     doulaListingSuccessStatus({ show: true, data: res?.payload?.doulas })
      //   );
      // });

      setFilterSearch({ service: [] });
      setChildrenInfo([]);
      route.push("/listing");
      reset();
      setLoading(false);
      dispatch(closeFindcareFormoneModal());
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterData) {
      setValue("location", filterData?.location);
    }
  }, []);

  return (
    <>
      <div className="findcaremodal1">
        <Link href="/">
          <div className="form1header">
            <Image
              className="h-auto "
              src={form1logo}
              alt="Cherished beginnings"
            />
          </div>
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="form1main"
        >
          <div className="form1title">Find a care near by you</div>
          <div className="formcontainer1">
            <input
              className="f1zip"
              type="text"
              placeholder="Enter ZIP Code"
              {...register("location")}
            />
          </div>
          <div className="form1title">What kind of care do you need?</div>
          <div className="formcontainer1">
            <div className="servicesf2 d-flex flex-column gap-3">
              {filterService?.map((service, index) => {
                return (
                  <label
                    className={
                      filterSearch?.service?.includes(service)
                        ? "active-bg"
                        : ""
                    }
                    htmlFor={`service_${index}`}
                    key={service}
                  >
                    <div
                      onClick={() => {
                        handleChangeCheckbox(service);
                      }}
                      className="service1 d-flex align-items-center gap-2"
                    >
                      <Image
                        src={serviceImage?.[index]}
                        alt="Cherished beginnings"
                      />
                      <div>{service}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="form1title text-center">Select care date</div>

          <div className="position-relative datepicker">
            <input
              type="date"
              name="boardingnear"
              id="boardingnearInput"
              placeholder="Select date href"
              className="px-4 py-3 forminoutset"
              {...register("dateTo")}
              onChange={validateStartDate}
            />
            {errors?.dateTo && (
              <span className="error">{errors?.dateTo?.message}</span>
            )}
          </div>
          <div className="position-relative datepicker">
            <input
              type="date"
              placeholder="Select date from"
              className="px-4 py-3 forminoutset"
              {...register("dateFrom")}
              onChange={validateEndDate}
            />
            {errors.dateFrom && (
              <span className="error">{errors.dateFrom.message}</span>
            )}
          </div>
          <div className="form1title">Enter child information</div>
          {fields?.map((children, ind) => {
            return (
              <div className="form1width d-flex flex-column gap-3">
                {ind === 0 && <div className="expect">Are you expecting</div>}
                <div className="formcontainer1">
                  <div className="optionmobile d-flex">
                    <label
                      htmlFor="singleton"
                      className={
                        childrenInfo?.find(
                          (d) =>
                            d?.multiplicity === "Singleton" && d?.id === ind
                        )
                          ? "active-bg radius-2rm"
                          : ""
                      }
                    >
                      <div
                        onClick={() =>
                          handleChildrenInfo("multiplicity", "Singleton", ind)
                        }
                        className="child"
                      >
                        <Image src={singleton} alt="Cherished beginnings" />
                        <div>Singleton</div>
                      </div>
                    </label>
                    <label
                      className={
                        childrenInfo?.find(
                          (d, i) => d?.multiplicity === "Twins" && d?.id === ind
                        )
                          ? "active-bg radius-2rm"
                          : ""
                      }
                      htmlFor="twins"
                    >
                      <div
                        className="child"
                        onClick={() => {
                          handleChildrenInfo("multiplicity", "Twins", ind);
                        }}
                      >
                        <Image src={twins} alt="Cherished beginnings" />
                        <div>Twins</div>
                      </div>
                    </label>
                    <label
                      htmlFor="triplet"
                      className={
                        childrenInfo?.find(
                          (d, i) =>
                            d?.multiplicity === "Triplets" && d?.id === ind
                        )
                          ? "active-bg radius-2rm"
                          : ""
                      }
                    >
                      <div
                        onClick={() => {
                          handleChildrenInfo("multiplicity", "Triplets", ind);
                        }}
                        className="child"
                      >
                        <Image src={triplet} alt="Cherished beginnings" />
                        <div>Triplets</div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="position-relative">
                  <div className="d-flex gap-3 position-relative">
                    <input
                      type="date"
                      name="boardingnear"
                      id="boardingnearInput"
                      placeholder="Child's Date of birth?"
                      onChange={(e) => {
                        handleChildrenInfo("dob", e?.target?.value, ind);
                      }}
                      className="px-4 py-3 forminoutset"
                    />
                    {ind !== 0 && (
                      <div
                        className="closeicon"
                        onClick={() => {
                          const deleteData = childrenInfo?.filter(
                            (d) => d?.id !== ind
                          );
                          setChildrenInfo(deleteData);
                          removeData(ind);
                        }}
                      >
                        <Image src={closeicon} alt="Cherished beginnings" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div
            onClick={() => append({ multiplicity: "", dob: "" })}
            className="addanother"
            alt="Cherished beginnings"
          >
            + Add another child
          </div>
          <button
            disabled={loading}
            className="nextbutton d-flex justify-content-center align-items-center gap-2 w-100"
          >
            <div>Next</div>
            <Image src={arrow} alt="Cherished beginnings" />
          </button>
        </form>
      </div>
    </>
  );
};

export default FindCareForm;
