"use client";
import React, { useEffect, useState } from "react";
import "./profiledesc.css";
import { useFieldArray, useForm } from "react-hook-form";
import {
  getSpecialityList,
  successStatus,
} from "../../../../Redux/speciality/specialitySlice";
import addmore from "../../../../Assets/doula setting/addmore.svg";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  loadingStatus,
  updateDoulaProfile,
} from "../../../../Redux/customer/doulaProfileSlice";
import { getUserProfile } from "../../../../Redux/customer/getProfileSlice";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { speciality = [], loading = false } = useSelector((state) => ({
    speciality: state?.speciality?.data,
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
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getSpecialityList()).then((res) => {
      if (res?.payload?.success) {
        dispatch(successStatus(res?.payload?.speciality));
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="profiledescformcontainer"
      >
        <div>Profile Description</div>
        <div>
          <hr />
        </div>
        <div className="accformcontainer">
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Profile Headline :
            </label>
            <input
              {...register("profile_headline", {
                required: "Profile headline is required",
              })}
              className="accinputbox"
              type="text"
            />
          </div>
          {errors.profile_headline && (
            <span className="error">{errors.profile_headline.message}</span>
          )}
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

          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Select Service :
            </label>
            {fieldsService?.map((data, index) => {
              return (
                <div key={index}>
                  <select
                    {...register(`service.${index}.value`, {
                      required: "Service is required",
                    })}
                  >
                    <option value=""></option>
                    <option selected={data?.value === "1"} value="1">
                      Daytime service
                    </option>
                    <option selected={data?.value === "2"} value="2">
                      Overnight care
                    </option>
                    <option selected={data?.value === "3"} value="3">
                      24 hour care
                    </option>
                    <option selected={data?.value === "4"} value="4">
                      Location support
                    </option>
                  </select>
                  {errors?.service?.[index]?.value?.message && (
                    <div className="error">
                      {errors?.service?.[index]?.value?.message}
                    </div>
                  )}
                  <div onClick={() => removeServiceData(index)}>X</div>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => appendService({ value: "" })}
            className="d-flex justify-content-end addmorebutton align-items-center"
          >
            <Image src={addmore} alt="Cherished beginnings" />
            Add More
          </div>
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Select Speciality :
            </label>
            {fields.map((friend, index) => {
              return (
                <div key={index}>
                  <select
                    {...register(`speciality.${index}.value`, {
                      required: "Speciality is required",
                    })}
                  >
                    <option value=""></option>
                    {speciality?.map((d) => {
                      return (
                        <option selected={d?.id == friend?.value} value={d?.id}>
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
                  <div onClick={() => removeFriend(index)}>X</div>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => append({ value: "" })}
            className="d-flex justify-content-end addmorebutton align-items-center"
          >
            <Image src={addmore} alt="Cherished beginnings" />
            Add More
          </div>
          <div className="d-flex gap-3 justify-content-end accbtngrp">
            <button disabled={isLoading} className="savesettingbtn">
              Save Setting
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default page;
