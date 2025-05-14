"use client";
import React, { useEffect, useState } from "react";
import "./account.css";
import defaultimage from "../../../Assets/settings/defaultimage.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountryList,
  successStatus,
} from "../../../Redux/country/countrysSlice";
import {
  nameValidation,
  phoneNumberValidation,
  emailValidation,
  handleNumber,
} from "@/modules/utils";
import { updateUserProfile } from "../../../Redux/customer/userProfileSlice";
import {
  getUserProfile,
  successStatus as profileSuccess,
} from "../../../Redux/customer/getProfileSlice";
import CommonModal from "@/Components/common/CommonModal";
import { postApi } from "@/Redux/api";
import CommonImage from "@/Components/common/Image/CommonImage";

const CustomerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    value: "",
    validation: "",
  });

  const dispatch = useDispatch();
  const { country = [] } = useSelector((state) => ({
    country: state?.country?.data,
  }));

  const toggleDeleteAccountModal = () =>
    setOpenDeleteAccount(!openDeleteAccount);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!phoneNumber?.value) {
        setPhoneNumber({
          ...phoneNumber,
          validation: "Phone number is required",
        });
        return;
      }

      if (phoneNumber?.validation) {
        return;
      }

      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      {
        file && formData.append("image_file", file);
      }
      formData.append("phone", phoneNumber?.value?.replace(" ", ""));
      formData.append("country", data.country);
      formData.append("city", data.city);
      setLoading(true);
      dispatch(
        updateUserProfile({
          ...data,
          image_file: file,
          phone: phoneNumber?.value,
        })
      ).then(() => {
        dispatch(getUserProfile()).then((res) => {
          dispatch(profileSuccess(res?.payload?.profileDetails));
        });
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await postApi("/users/delete-account");
      if (response?.data?.success) {
        toggleDeleteAccountModal();
        getUserProfileData();
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const validateImage = (value) => {
    const allowedFormats = [".jpg", ".png"];
    const maxSizeInBytes = 2 * 1024 * 1024;
    const file = value[0];
    if (!allowedFormats?.some((d) => file?.name?.endsWith(d))) {
      setError("image_file", {
        type: "manual",
        message: "Only JPG and PNG formats are allowed",
      });
      return false;
    }
    if (file.size > maxSizeInBytes) {
      setError("image_file", {
        type: "manual",
        message: "Maximum file size allowed is 2MB",
      });
      return false;
    }
    setFile(value[0]);
    return true;
  };

  const handleFileChange = (event) => {
    validateImage(event.target.files);
  };

  const getUserProfileData = async () => {
    try {
      dispatch(getUserProfile()).then((res) => {
        const data = res?.payload?.profileDetails;
        if (data) {
          setValue("first_name", data?.first_name);
          setValue("last_name", data?.last_name);
          setValue("email", data?.email);
          setPhoneNumber({
            ...phoneNumber,
            value: handleNumber(data?.phone),
          });
          setValue("country", data?.country);
          setValue("gender", data?.userDetail?.gender);
          setValue("city", data?.city);
          setValue("image_file", data?.profile_image);
          setFile(data?.profile_image);
          setValue(
            "language",
            data?.userDetail?.language?.split(",")?.map((d) => {
              return { value: d };
            })
          );
          setValue("cuntry_of_birth", data?.userDetail?.cuntry_of_birth);
          setValue("year_of_birth", data?.userDetail?.year_of_birth);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    dispatch(getCountryList()).then((res) => {
      if (res?.payload?.success) {
        dispatch(successStatus(res?.payload?.countrys));
      }
    });
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="accountcontainer">
            <div>Account setting</div>
            <div>
              <hr />
            </div>
            <div className="accformcontainer">
              <div className="acccinputboxcont">
                <label className="acclabel" htmlFor="">
                  Photo :
                </label>
                <div className="accinputboxphoto">
                  {file ? (
                    <CommonImage
                      src={
                        typeof file === "string"
                          ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}${file}`
                          : URL.createObjectURL(file)
                      }
                      alt="image"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      className="profileimagesetting"
                      src={defaultimage}
                      alt="Cherished beginnings"
                    />
                  )}
                  <div className="d-flex flex-column uploadphotofont">
                    <p>
                      We recommanded you to use a portraite photo. profilw
                      without a photo will not be approved. <br /> maximum size
                      - 2 MB JPG or PNG
                    </p>
                    <input
                      type="file"
                      {...register("image_file", {
                        // validate: validateImage,
                      })}
                      onChange={handleFileChange}
                    />
                    {errors.image_file && (
                      <span className="error">{errors.image_file.message}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="acccinputboxcont">
                <label className="acclabel" htmlFor="">
                  First Name :
                </label>
                <div className="inputerrorparent">
                  <input
                    {...register("first_name")}
                    disabled={true}
                    className="accinputbox"
                    type="text"
                  />
                  {errors.first_name && (
                    <span className="error">{errors.first_name.message}</span>
                  )}
                </div>
              </div>

              <div className="acccinputboxcont">
                <label className="acclabel" htmlFor="">
                  Last Name :
                </label>
                <div className="inputerrorparent">
                  <input
                    {...register("last_name")}
                    disabled={true}
                    className="accinputbox"
                    type="text"
                  />
                  {errors.last_name && (
                    <span className="error">{errors.last_name.message}</span>
                  )}
                </div>
              </div>

              <div className="acccinputboxcont">
                <label className="acclabel" htmlFor="">
                  Phone Number :
                </label>
                <div className="inputerrorparent">
                  <div className="d-flex gap-2 align-items-center phoneinput">
                    {/* <span className="badgenone">+91</span> */}
                    <input
                      value={phoneNumber?.value}
                      onChange={(e) => {
                        setPhoneNumber({
                          ...phoneNumber,
                          value: handleNumber(e?.target?.value),
                          validation:
                            !e?.target?.value || e?.target?.value === "+"
                              ? "Phone number is required"
                              : e?.target?.value?.length < 14
                              ? "Phone number must be exactly 10 digits"
                              : "",
                        });
                      }}
                      className="accinputbox"
                      type="text"
                    />
                  </div>
                  {phoneNumber?.validation && (
                    <span className="error">{phoneNumber?.validation}</span>
                  )}
                </div>
              </div>

              <div className="acccinputboxcont">
                <label className="acclabel" htmlFor="">
                  Country :
                </label>
                <div className="inputerrorparent">
                  <select
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="accinputbox"
                  >
                    <option></option>
                    {country?.length > 0 &&
                      country?.map((d) => {
                        return <option value={d?.id}>{d?.country}</option>;
                      })}
                  </select>
                  {errors.country && (
                    <span className="error">{errors.country.message}</span>
                  )}
                </div>
              </div>

              <div className="acccinputboxcont">
                <label className="acclabel" htmlFor="">
                  City :
                </label>
                <div className="inputerrorparent">
                  <input
                    {...register("city", {
                      required: "City is required",
                    })}
                    className="accinputbox"
                    type="text"
                  />
                  {errors.city && (
                    <span className="error">{errors.city.message}</span>
                  )}
                </div>
              </div>

              <div className="acccinputboxcont">
                <label className="acclabel" htmlFor="">
                  E-Mail :
                </label>
                <div className="inputerrorparent">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      ...emailValidation,
                    })}
                    disabled={true}
                    className="accinputbox"
                    type="text"
                  />
                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="acccinputboxcont">
                <label className="acclabel" htmlFor=""></label>
                <div className="buttonparentsaveanddelete">
                  <button
                    type="submit"
                    onClick={() => {
                      if (!phoneNumber?.value) {
                        setPhoneNumber({
                          ...phoneNumber,
                          validation: "Phone number is required",
                        });
                        return;
                      }
                    }}
                    disabled={loading}
                    className="savesettingbtn"
                  >
                    Save setting
                  </button>
                  <button
                    type="button"
                    className="dltbutton"
                    onClick={toggleDeleteAccountModal}
                  >
                    Delete account
                  </button>
                </div>
              </div>
              {/* <div className="d-flex gap-3 justify-content-end accbtngrp">
                <button disabled={loading} className="savesettingbtn">
                  Save setting
                </button>
                <button className="dltbutton">Delete account</button>
              </div> */}
            </div>
          </div>
        </form>
        {openDeleteAccount && (
          <CommonModal
            open={openDeleteAccount}
            onClose={toggleDeleteAccountModal}
          >
            <div className="delete-account-modal-container">
              <div className="delete-account-modal-box">
                <div className="delete-account-modal-title">
                  Are you sure want delete this account?
                </div>
                <form
                  onSubmit={(e) => e?.preventDefault()}
                  className="d-flex flex-row w-100 gap-3"
                >
                  <button
                    className="cancel-btn"
                    onClick={toggleDeleteAccountModal}
                  >
                    Cancel
                  </button>
                  <button disabled={loading} onClick={handleDeleteAccount}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </CommonModal>
        )}
      </div>
    </>
  );
};

export default CustomerProfile;
