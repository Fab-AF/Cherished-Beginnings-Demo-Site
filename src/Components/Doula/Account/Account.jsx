"use client";
import React, { useEffect, useState } from "react";
import "./genralinfo.css";
import Image from "next/image";
import defaultimage from "../../../Assets/settings/defaultimage.svg";
import {
  getCountryList,
  successStatus,
} from "../../../Redux/country/countrysSlice";
import addmore from "../../../Assets/doula setting/addmore.svg";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  nameValidation,
  phoneNumberValidation,
  emailValidation,
  yearOption,
  handleNumber,
} from "@/modules/utils";
import {
  getLanguagesList,
  successStatus as languageSuccessStatus,
} from "../../../Redux/languages/languagesSlice";
import { updateDoulaProfile } from "../../../Redux/customer/doulaProfileSlice";
import {
  errorStatus,
  getUserProfile,
  loadingStatus,
} from "../../../Redux/customer/getProfileSlice";
import closeicon from "../../../Assets/arrow/close.png";

const DoulaProfileModal = ({ showBackBtn = false, setCurrent }) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  console.log("isSubmit", isSubmit);

  const [phoneNumber, setPhoneNumber] = useState({
    value: "",
    validation: "",
  });

  const dispatch = useDispatch();
  const {
    country = [],
    languages = [],
    countryOfBirth = [],
  } = useSelector((state) => ({
    country: state?.country?.data,
    languages: state?.languages?.data,
    countryOfBirth: [{ value: 1, label: "Egypt" }],
  }));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      language: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "language",
  });

  const removeFriend = (index) => {
    if (fields.length === 1) {
      reset({ language: [{ value: "" }] });
    } else {
      remove(index);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!!!file) {
        return setError("image_file", { message: "Image is required!" });
      }

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

      setLoading(true);
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("image_file", file);
      formData.append("phone", phoneNumber?.value?.replace(" ", ""));
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("gender", data.gender);
      formData.append(
        "language",
        data.language?.map((d) => d?.value)?.join(",")
      );
      formData.append("cuntry_of_birth", data.cuntry_of_birth);
      formData.append("year_of_birth", data.year_of_birth);

      dispatch(updateDoulaProfile({ data: formData, step: 1 })).then(() => {
        if (showBackBtn) {
          setCurrent(1);
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  const validateImage = (value) => {
    if (!value[0]) return true;
    const allowedFormats = [".jpg", ".png"];
    const maxSizeInBytes = 2 * 1024 * 1024;
    const file = value[0];
    if (!allowedFormats?.some((d) => file.name?.endsWith(d))) {
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
    clearErrors(["image_file"]);
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
            validation:
              !data?.phone || data?.phone === "+"
                ? "Phone number is required"
                : "",
          });
          setValue("country", data?.country);
          setValue("gender", data?.userDetail?.gender);
          setValue("city", data?.city);
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
      dispatch(errorStatus(error));
    }
  };

  useEffect(() => {
    dispatch(getCountryList()).then((res) => {
      if (res?.payload?.success) {
        dispatch(successStatus(res?.payload?.countrys));
      }
    });
    dispatch(getLanguagesList()).then((res) => {
      if (res?.payload?.success) {
        dispatch(languageSuccessStatus(res?.payload?.language));
      }
    });
  }, []);

  useEffect(() => {
    getUserProfileData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="genrelinfomaincontainerdoula">
          <div>General Information</div>
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
                  <img
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
                    We recommanded you to use a portraite photo. profilw without
                    a photo will not be approved. <br /> maximum size - 2 MB JPG
                    or PNG
                  </p>
                  <input
                    type="file"
                    {...register("image_file", {
                      // required: "Image is required",
                      validate: validateImage,
                    })}
                    onChange={handleFileChange}
                    name="photo"
                    id=""
                  />
                  {errors.image_file && (
                    <span className="error">{errors.image_file.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Gender :
              </label>
              <div className="inputerrorparent">
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                >
                  <option value=""></option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Others</option>
                </select>
                {errors.gender && (
                  <span className="error">{errors.gender.message}</span>
                )}
              </div>
            </div>
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                First Name :
              </label>
              <div className="inputerrorparent ">
                <input
                  {...register("first_name", {
                    required: "First name is required",
                    ...nameValidation,
                  })}
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
                Last name :
              </label>
              <div className="inputerrorparent ">
                <input
                  {...register("last_name", {
                    required: "Last name is required",
                    ...nameValidation,
                  })}
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
              <div className="inputerrorparent ">
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

            <div style={{ alignItems: "start" }} className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Language You speak :
              </label>
              <div style={{ display: "grid", rowGap: "1rem" }}>
                {fields.map((friend, index) => (
                  <div key={index} className="closebuttoninputparent ">
                    <div className="w-100">
                      {" "}
                      <select
                        {...register(`language.${index}.value`, {
                          required: "Language is required",
                        })}
                        className="accinputbox w-100"
                      >
                        <option></option>
                        {languages?.length > 0 &&
                          languages?.map((d) => {
                            return (
                              <option
                                selected={+d?.id === +friend?.value}
                                value={d?.id}
                              >
                                {d?.language}
                              </option>
                            );
                          })}
                      </select>
                      {errors?.language?.[index]?.value?.message && (
                        <div className="error">
                          {errors?.language?.[index]?.value?.message}
                        </div>
                      )}
                    </div>
                    <div
                      className="closeiconexception"
                      onClick={() => removeFriend(index)}
                    >
                      {" "}
                      <Image src={closeicon} alt="closeicon" />{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="acccinputboxcont">
              <label htmlFor=""></label>
              <div
                className="d-flex addmorebutton align-items-center"
                onClick={() => append({ value: "" })}
              >
                <Image src={addmore} alt="closeicon" /> Add another languages
              </div>
            </div>
            {/* {errors.language && (
              <span className="error">{errors.language.message}</span>
            )} */}
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Country Of Birth :
              </label>
              <div className="inputerrorparent">
                <select
                  {...register("cuntry_of_birth", {
                    required: "Country of birth is required",
                  })}
                >
                  <option value=""></option>
                  {country?.length > 0 &&
                    country?.map((d) => {
                      return <option value={d?.id}>{d?.country}</option>;
                    })}
                </select>
                {errors.cuntry_of_birth && (
                  <span className="error">
                    {errors.cuntry_of_birth.message}
                  </span>
                )}
              </div>
            </div>
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Year Of Birth
              </label>
              <div className="inputerrorparent">
                <select
                  {...register("year_of_birth", {
                    required: "Year of birth is required",
                    pattern: {
                      value: /^(?!-1)\d*$/,
                      message: "Please enter a valid positive number",
                    },
                  })}
                >
                  <option></option>
                  {yearOption()?.map((d) => {
                    return (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    );
                  })}
                </select>
                {errors.year_of_birth && (
                  <span className="error">{errors.year_of_birth.message}</span>
                )}
              </div>
            </div>
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Phone Number :
              </label>
              <div className="inputerrorparent d-block ">
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
                {isSubmit && phoneNumber?.validation && (
                  <span className="error">{phoneNumber?.validation}</span>
                )}
              </div>
            </div>
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                E-Mail :
              </label>
              <div className="inputerrorparent ">
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
                  className="savesettingbtn"
                  onClick={() => setIsSubmit(true)}
                  disabled={showBackBtn ? false : loading}
                >
                  {loading ? (
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
        </div>
      </form>
    </>
  );
};

export default DoulaProfileModal;
