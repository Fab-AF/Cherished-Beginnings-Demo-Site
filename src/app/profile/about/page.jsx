"use client";
import React, { useEffect, useState } from "react";
import "./aboutthedoula.css";
import { useForm } from "react-hook-form";
import { errorMeg, numberValidation, successMeg } from "@/modules/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingStatus,
  updateDoulaProfile,
} from "../../../Redux/customer/doulaProfileSlice";
import { getUserProfile } from "../../../Redux/customer/getProfileSlice";
import {
  getAgeGroups,
  successStatus as successStatusGetAge,
} from "../../../Redux/getAgeGroups/getAgeGroupsSlice";
import { postApi } from "@/Redux/api";
import { additionalInformation } from "@/modules/staticData";

const DoulaAboutPage = ({ showBackBtn = false, setCurrent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAgeList = useSelector((state) => state?.getAgeGroups?.data);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      dispatch(loadingStatus());
      await postApi("/doula/profile/about-doula", {
        ...data,
        hourly_rate_currency: data?.hourly_rate_currency || "$",
        hourly_rate_recurring_currency:
          data?.hourly_rate_recurring_currency || "$",
        experience: data?.experience + " years",
      }).then((res) => {
        if (res?.data?.success) {
          successMeg(res?.data?.messaeg);
        } else {
          errorMeg(res?.data?.error);
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getUserProfile()).then((res) => {
      const data = res?.payload?.profileDetails;
      if (data) {
        setValue(
          "experience",
          data?.userDetail?.experience
            ? data?.userDetail?.experience?.split(" years")?.[0]
            : ""
        );
        setValue(
          "hourly_rate_recurring",
          data?.userDetail?.hourly_rate_recurring
        );
        setValue(
          "hourly_rate_recurring_currency",
          data?.userDetail?.hourly_rate_recurring_currency || "$"
        );
        setValue("location", data?.userDetail?.location);
        setValue("children_age_group", data?.userDetail?.children_age_group);
        setValue("availability", data?.userDetail?.availability);
        setValue("hourly_rate", data?.userDetail?.hourly_rate);
        setValue(
          "hourly_rate_currency",
          data?.userDetail?.hourly_rate_currency || "$"
        );
        setValue("group_size", data?.userDetail?.group_size);
        setValue("additional_info", data?.userDetail?.additional_info);
      }
    });
    dispatch(getAgeGroups()).then((res) => {
      const data = res?.payload?.data;
      if (data) {
        dispatch(successStatusGetAge(data));
      }
    });
  }, []);

  return (
    <>
      <div className="aboutthedoulaformcontainer">
        <div>About the Doula</div>
        <div>
          <hr />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="accformcontainer">
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Total Experience :
            </label>
            <div className="inputerrorparent">
              <input
                {...register("experience", {
                  required: "Experience is required",
                  validate: (value) =>
                    value >= 0 || "Number must be greater than 0",
                })}
                className="accinputbox"
                type="number"
              />
              {errors.experience && (
                <span className="error">{errors.experience.message}</span>
              )}
            </div>
          </div>

          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Location :
            </label>
            <div className="inputerrorparent">
              <input
                {...register("location", {
                  required: "Location is required",
                  validate: (value) =>
                    value >= 0 || "Please enter positive number",
                })}
                className="accinputbox"
                type="number"
              />
              {errors.location && (
                <span className="error">{errors.location.message}</span>
              )}
            </div>
          </div>

          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Childrens Age Group :
            </label>
            <div className="inputerrorparent">
              <select
                {...register("children_age_group", {
                  required: "Children age group is required",
                })}
              >
                <option value=""></option>
                {getAgeList?.map((d) => {
                  return <option value={d?.id}>{d?.age_group}</option>;
                })}
              </select>
              {errors.children_age_group && (
                <span className="error">
                  {errors.children_age_group.message}
                </span>
              )}
            </div>
          </div>

          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Availability :
            </label>
            <div className="inputerrorparent">
              <select
                {...register("availability", {
                  required: "Availability is required",
                })}
              >
                <option value=""></option>
                <option value="1">Full time</option>
                <option value="2">Part Time</option>
                <option value="3">Hourly</option>
                <option value="4">On-demand</option>
              </select>
              {errors.availability && (
                <span className="error">{errors.availability.message}</span>
              )}
            </div>
          </div>

          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Hourly Rate In USD :
            </label>
            <div className="inputerrorparent">
              <div
                className="customdollorwidth"
                style={{
                  display: "grid",
                  width: "80%",
                  gridTemplateColumns: "1fr auto",
                  columnGap: "1rem",
                }}
              >
                <input
                  {...register("hourly_rate", {
                    required: "Hourly rate is required",
                    validate: (value) =>
                      value >= 0 || "Please enter positive number",
                  })}
                  className="accinputbox w-100"
                  type="number"
                />
                <select
                  className="w-auto"
                  {...register("hourly_rate_currency")}
                >
                  <option value="$">$</option>
                  <option value="₹">₹</option>
                  <option value="€">€</option>
                </select>
              </div>
              {errors.hourly_rate && (
                <span className="error">{errors.hourly_rate.message}</span>
              )}
            </div>
          </div>
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Recurring Rate :
            </label>
            <div className="inputerrorparent">
              <div
                className=""
                style={{
                  display: "grid",
                  width: "80%",
                  gridTemplateColumns: "1fr auto",
                  columnGap: "1rem",
                }}
              >
                <input
                  {...register("hourly_rate_recurring", {
                    required: "Recurring Rate is required",
                    validate: (value) =>
                      value >= 0 || "Please enter positive number",
                  })}
                  className="accinputbox w-100"
                  type="number"
                />
                <select
                  className="w-auto"
                  {...register("hourly_rate_recurring_currency")}
                >
                  <option value="$">$</option>
                  <option value="₹">₹</option>
                  <option value="€">€</option>
                </select>
              </div>
              {errors.hourly_rate_recurring && (
                <span className="error">
                  {errors.hourly_rate_recurring.message}
                </span>
              )}
            </div>
          </div>
          <div className="acccinputboxcont align-items-baseline">
            <label className="acclabel" htmlFor="">
              Group Size :
            </label>
            <div className="inputerrorparent">
              <div className="d-flex flex-column customcolumn">
                <input
                  {...register("group_size", {
                    required: "Group size is required",
                    ...numberValidation,
                  })}
                  className="accinputbox "
                  type="number"
                />
                {/* <span className="cusstomguideline">Max 4 children allowed</span> */}
                {errors.group_size && (
                  <span className="error">{errors.group_size.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Additional Info :
            </label>
            <div className="inputerrorparent">
              <select
                {...register("additional_info", {
                  required: "Additional info is required",
                })}
              >
                <option value=""></option>
                {additionalInformation?.map((d, ind) => {
                  return <option value={ind + 1}>{d}</option>;
                })}
              </select>
              {errors.additional_info && (
                <span className="error">{errors.additional_info.message}</span>
              )}
            </div>
          </div>

          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor=""></label>
            <div className="buttonparentsaveanddelete accbtngrp">
              <button disabled={loading} className="savesettingbtn">
                {loading ? (
                  <div
                    className="spinner-border"
                    color="#9e4b34"
                    role="status"
                  ></div>
                ) : (
                  "Save Setting"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DoulaAboutPage;
