"use client";
import React, { useEffect, useState } from "react";
import "./profiledesc.css";
import { useFieldArray, useForm } from "react-hook-form";
import {
  getSpecialityList,
  successStatus,
} from "../../../Redux/speciality/specialitySlice";
import addmore from "../../../Assets/doula setting/addmore.svg";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  loadingStatus,
  updateDoulaProfile,
} from "../../../Redux/customer/doulaProfileSlice";
import { getUserProfile } from "../../../Redux/customer/getProfileSlice";
import {
  getServicesList,
  successStatus as serviceSuccessStatus,
} from "../../../Redux/services/servicesSlice";
import closeicon from "../../../Assets/arrow/close.png";
import { postApi } from "@/Redux/api";
import { errorMeg, successMeg } from "@/modules/utils";

const ProfileDescriptionModal = ({ showBackBtn = false, setCurrent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { speciality = [], services = [] } = useSelector((state) => ({
    speciality: state?.speciality?.data,
    services: state?.services?.data,
    loading: state?.doulaProfile?.loading,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    clearErrors,
  } = useForm({
    defaultValues: {
      speciality: [{ value: "" }],
      service: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "speciality",
  });

  const {
    fields: fieldsService,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "service",
  });

  const dispatch = useDispatch();

  const removeFriend = (index) => {
    if (fields.length === 1) {
      reset({ speciality: [{ value: "" }] });
    } else {
      remove(index);
    }
  };

  const removeServiceData = (index) => {
    if (fieldsService.length === 1) {
      reset({ service: [{ value: "" }] });
    } else {
      removeService(index);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      dispatch(loadingStatus());
      dispatch(
        updateDoulaProfile({
          data: {
            ...data,
            service: data?.service?.map((d) => d?.value)?.join(","),
            speciality: data?.speciality?.map((d) => d?.value)?.join(","),
          },
          step: 2,
        })
      ).then(() => {
        if (showBackBtn) {
          setCurrent(2);
        }
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getServicesList()).then((res) => {
      if (res?.payload?.success) {
        dispatch(serviceSuccessStatus(res?.payload?.services));
      }
    });
    dispatch(getSpecialityList()).then((res) => {
      if (res?.payload?.success) {
        dispatch(successStatus(res?.payload?.specialities));
      }
    });
    dispatch(getUserProfile()).then((res) => {
      const data = res?.payload?.profileDetails;
      if (data) {
        setValue("profile_headline", data?.userDetail?.profile_headline);
        setValue("profile_description", data?.userDetail?.profile_description);
        setValue(
          "service",
          data?.userDetail?.service?.split(",")?.map((d) => {
            return { value: d };
          })
        );
        setValue(
          "speciality",
          data?.userDetail?.speciality?.split(",")?.map((d) => {
            return { value: d };
          })
        );
      }
    });
  }, []);

  return (
    <>
      <div className="maxwidth800">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="profiledescformcontainerdoula"
        >
          <div>Profile Description</div>
          <div>
            <hr />
          </div>
          <div className="accformcontainer">
            <div className="acccinputboxcont ">
              <label className="acclabel" htmlFor="">
                Profile Headline :
              </label>
              <div className="inputerrorparent">
                <input
                  {...register("profile_headline", {
                    required: "Profile headline is required",
                  })}
                  className="accinputbox"
                  type="text"
                />
                {errors.profile_headline && (
                  <span className="error">{errors.profile_headline.message}</span>
                )}
              </div>
            </div>

            <div className="acccinputboxcont align-items-baseline">
              <label className="acclabel" htmlFor="">
                Description :
              </label>

              <div className="d-flex flex-column customcolumn">
                <input
                  {...register("profile_description", {
                    required: "Profile description is required",
                  })}
                  className="accinputbox descriptionacccinputboxcont"
                  type="text"
                />
                {errors.profile_description && (
                  <span className="error">
                    {errors.profile_description.message}
                  </span>
                )}
                <span className="customguideline">
                  Help students get to know you better. Tell about your tutoring
                  experience and methods you use. share why you enjoy teaching
                  others.
                </span>
              </div>
            </div>

            <div style={{ alignItems: "start" }} className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Select Service :
              </label>
              <div style={{ display: "grid", rowGap: "1rem" }}>
                {fieldsService?.map((data, index) => {
                  return (
                    <div className="closebuttoninputparent" key={index}>
                      <div className="w-100">
                        <select
                          className="accinputbox w-100"
                          {...register(`service.${index}.value`, {
                            required: "Service is required",
                          })}
                        >
                          <option value=""></option>
                          {services?.map((d) => {
                            return (
                              <option
                                selected={+data?.value === +d?.id}
                                value={+d?.id}
                              >
                                {d?.service}
                              </option>
                            );
                          })}
                        </select>
                        {errors?.service?.[index]?.value?.message && (
                          <div className="error">
                            {errors?.service?.[index]?.value?.message}
                          </div>
                        )}

                        <div
                          className="closeiconexception"
                          onClick={() => removeServiceData(index)}
                        >
                          <Image src={closeicon} alt="closeicon" />{" "}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor=""></label>
              <div
                onClick={() => appendService({ value: "" })}
                className="addmorebutton align-items-center"
              >
                <Image src={addmore} alt="Cherished beginnings" />
                Add More
              </div>
            </div>

            <div style={{ alignItems: "start" }} className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Select Speciality :
              </label>
              <div style={{ display: "grid", rowGap: "1rem" }}>
                {fields.map((friend, index) => {
                  return (
                    <div className="closebuttoninputparent" key={index}>
                      <div className="w-100">
                        <select
                          {...register(`speciality.${index}.value`, {
                            required: "Speciality is required",
                          })}
                          className="accinputbox w-100"
                        >
                          <option value=""></option>
                          {speciality?.map((d) => {
                            return (
                              <option
                                selected={d?.id == friend?.value}
                                value={d?.id}
                              >
                                {d?.speciality}
                              </option>
                            );
                          })}
                        </select>
                        {errors?.speciality?.[index]?.value?.message && (
                          <div className="error">
                            {errors?.speciality?.[index]?.value?.message}
                          </div>
                        )}
                      </div>
                      <div
                        className="closeiconexception"
                        onClick={() => removeFriend(index)}
                      >
                        {" "}
                        <Image src={closeicon} alt="closeicon" />{" "}
                      </div>{" "}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor=""></label>
              <div
                onClick={() => append({ value: "" })}
                className="d-flex justify-content-end addmorebutton align-items-center"
              >
                <Image src={addmore} alt="Cherished beginnings" />
                Add More
              </div>
            </div>

            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor=""></label>
              <div className="buttonparentsaveanddelete">
                {showBackBtn && (
                  <button onClick={() => setCurrent(0)}>Back</button>
                )}
                <button disabled={isLoading} className="savesettingbtn">
                  {isLoading ? (
                    <div
                      className="spinner-border"
                      color="#9e4b34"
                      role="status"
                    ></div>
                  ) : (
                    "Save setting"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileDescriptionModal;
