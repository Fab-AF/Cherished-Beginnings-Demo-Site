"use client";
import React, { useEffect, useState } from "react";
import "./resume.css";
import Image from "next/image";
import addmore from "../../../Assets/doula setting/addmore.svg";
import defaultidimage from "../../../Assets/doula setting/idproofdefaultimage.png";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  errorStatus,
  loadingStatus,
  updateDoulaProfile,
} from "../../../Redux/customer/doulaProfileSlice";
import {
  getUserProfile,
  loadingStatus as getProfileLoadingStatus,
  errorStatus as getProfileErrorStatus,
} from "../../../Redux/customer/getProfileSlice";
import { yearOption } from "@/modules/utils";
import { closeDoulaModal } from "../../../Redux/modalSlice";
import closeicon from "../../../Assets/arrow/close.png";
import { postApi } from "@/Redux/api";

const ResumeModal = ({ showBackBtn = false, setCurrent }) => {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      year_of_study: [{ to: "", from: "" }],
      year_of_employeement: [{ to: "", from: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "year_of_study",
  });

  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: "year_of_employeement",
  });

  const validateImage = (value) => {
    if (!value?.[0]) return true;
    const allowedFormats = [".jpg", ".png"];
    const maxSizeInBytes = 2 * 1024 * 1024;
    const file = value[0];
    if (!allowedFormats?.some((d) => file.name?.endsWith(d))) {
      setError("id_proof_file", {
        type: "manual",
        message: "Only JPG and PNG formats are allowed",
      });
      return false;
    }
    if (file.size > maxSizeInBytes) {
      setError("id_proof_file", {
        type: "manual",
        message: "Maximum file size allowed is 2MB",
      });
      return false;
    }
    clearErrors(["id_proof_file"]);
    setFile(value[0]);
    return true;
  };

  const handleFileChange = (event) => {
    validateImage(event.target.files);
  };

  const removeYearOfStudy = (index) => {
    if (fields.length === 1) {
      reset({ year_of_study: [{ to: "", from: "" }] });
    } else {
      remove(index);
    }
  };

  const removeYearOfEmployeement = (index) => {
    if (employmentFields.length === 1) {
      reset({ year_of_employeement: [{ to: "", from: "" }] });
    } else {
      removeEmployment(index);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!!!file) {
        return setError("id_proof_file", { message: "Id proof is required!" });
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append("link_to_video_clip", data?.link_to_video_clip);
      formData.append("university_college", data.university_college);
      formData.append("degree", data.degree);
      formData.append(
        "year_of_study",
        data?.year_of_study?.map((d) => `${d?.to}-${d?.from}`)?.join(",")
      );
      formData.append("company_hospita", data.company_hospita);
      formData.append("position", data.position);
      formData.append(
        "year_of_employeement",
        data?.year_of_employeement?.map((d) => `${d?.to}-${d?.from}`)?.join(",")
      );
      formData.append("id_proof_file", file);

      dispatch(loadingStatus());
      dispatch(updateDoulaProfile({ data: formData, step: 4 })).then(() => {
        if (showBackBtn) {
          dispatch(closeDoulaModal());
        }
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(errorStatus(error));
    }
  };

  const getUserProfileData = async () => {
    try {
      dispatch(getProfileLoadingStatus());
      dispatch(getUserProfile()).then((res) => {
        const data = res?.payload?.profileDetails;
        if (data) {
          const data = res?.payload?.profileDetails;
          setValue("link_to_video_clip", data?.userDetail?.link_to_video_clip);
          setValue("university_college", data?.userDetail?.university_college);
          setValue("degree", data?.userDetail?.degree);
          setValue(
            "year_of_employeement",
            data?.userDetail?.year_of_employeement?.split(",")?.map((d) => {
              const data = d?.split("-");
              return {
                to: data?.[0],
                from: data?.[1],
              };
            })
          );

          setValue(
            "year_of_study",
            data?.userDetail?.year_of_study?.split(",")?.map((d) => {
              const data = d?.split("-");
              return {
                to: data?.[0],
                from: data?.[1],
              };
            })
          );

          setValue("company_hospita", data?.userDetail?.company_hospita);
          setValue("position", data?.userDetail?.position);
          setValue("id_proof_file", data?.userDetail?.id_proof_file);
          setFile(data?.userDetail?.id_proof);
        }
      });
    } catch (error) {
      dispatch(getProfileErrorStatus(error));
    }
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="doularesumeformcontainerdoula"
      >
        <div>Resume</div>
        <div>
          <hr />
        </div>
        <div className="acccinputboxcontresume flex-column">
          <div className="alltitle">Video Introduction</div>
          <div className="d-flex w-80 gap-0 align-items-baseline">
            <label className="acclabel" htmlFor="">
              Link To Video Clip :
            </label>
            <div className="d-flex flex-column customcolumn">
              <div className="d-flex flex-column inputerrorparent">
                <input
                  {...register("link_to_video_clip", {
                    required: "Video URL is required",
                    pattern: {
                      value: /^(ftp|http|https):\/\/[^ "]+$/,
                      message: "Invalid URL",
                    },
                  })}
                  className="accinputbox w-100 "
                  type="text"
                  placeholder="http://abc.com"
                />
                <span className="customguideline">
                  Paste the URL to your youtube video
                </span>
                {errors.link_to_video_clip && (
                  <span className="error">
                    {errors.link_to_video_clip.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div className="acccinputboxcontresume align-items-baseline flex-column">
          <div className="alltitle">
            Education<sup>*</sup>
          </div>
          <div className="gap-1 w-80">
            <label className="acclabel" htmlFor="">
              University/College :
            </label>
            <div className="inputerrorparent">
              <input
                {...register("university_college", {
                  required: "University college is required",
                })}
                className="accinputbox w-100"
                type="text"
              />
              {errors.university_college && (
                <span className="error">
                  {errors.university_college.message}
                </span>
              )}
            </div>
          </div>

          <div className="gap-1 w-80">
            <label className="acclabel" htmlFor="">
              Degree :
            </label>
            <div className="inputerrorparent">
              <input
                {...register("degree", {
                  required: "Degree is required",
                })}
                className="accinputbox w-100"
                type="text"
              />
              {errors.degree && (
                <span className="error">{errors.degree.message}</span>
              )}
            </div>
          </div>

          <div className="d-flex align-items-baseline w-80 gap-0">
            <label htmlFor="" className="acclabel">
              Year Of Study :
            </label>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flex: "3 1",
              }}
            >
              {fields.map((friend, index) => {
                return (
                  <div className="acccinputboxcontresume gap-1">
                    <div
                      className="d-flex position-relative"
                      style={{ gap: "0.5rem", alignItems: "center" }}
                    >
                      <select
                        {...register(`year_of_study.${index}.to`, {
                          required: "Both are required",
                        })}
                      >
                        <option value=""></option>
                        {yearOption()?.map((d) => {
                          return (
                            <option
                              selected={+friend?.to === d}
                              key={d}
                              value={d}
                            >
                              {d}
                            </option>
                          );
                        })}
                      </select>
                      -
                      <select
                        {...register(`year_of_study.${index}.from`, {
                          required: "Both are required",
                        })}
                      >
                        <option value=""></option>
                        {yearOption()?.map((d) => {
                          return (
                            <option
                              selected={+friend?.from === d}
                              key={d}
                              value={d}
                            >
                              {d}
                            </option>
                          );
                        })}
                      </select>
                      <div
                        className="closeiconexception"
                        onClick={() => removeYearOfStudy(index)}
                      >
                        <Image src={closeicon} alt="closeicon" />{" "}
                      </div>
                    </div>
                    {(errors?.year_of_study?.[index]?.to ||
                      errors?.year_of_study?.[index]?.from) && (
                        <div className="error">To and From are required</div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="gap-1 w-80">
            <label className="acclabel" htmlFor=""></label>
            <div className="inputerrorparent">
              <div
                onClick={() => append({ to: "", from: "" })}
                className="d-flex justify-content-end addmorebutton align-items-center"
              >
                <Image src={addmore} alt="Cherished beginnings" />
                Add More
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div className="acccinputboxcontresume  align-items-baseline flex-column">
          <div className="alltitle">
            Experience<sup>*</sup>
          </div>
          <div className="gap-1 w-80">
            <label className="acclabel" htmlFor="">
              Company/Hospital :
            </label>
            <div className="inputerrorparent">
              <input
                {...register("company_hospita", {
                  required: "Company hospita is required",
                })}
                className="accinputbox w-100"
                type="text"
              />
              {errors.company_hospita && (
                <span className="error">{errors.company_hospita.message}</span>
              )}
            </div>
          </div>

          <div className="gap-1 w-80">
            <label className="acclabel" htmlFor="">
              Position :{" "}
            </label>
            <div className="inputerrorparent">
              <input
                {...register("position", {
                  required: "Position is required",
                })}
                className="accinputbox w-100"
                type="text"
              />{" "}
              {errors.position && (
                <span className="error">{errors.position.message}</span>
              )}
            </div>
          </div>

          <div className="gap-0 w-80 align-items-baseline">
            <label className="acclabel" htmlFor="">
              Year Of Employeement :
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flex: "3 1",
              }}
            >
              {employmentFields.map((friend, index) => {
                return (
                  <div className="acccinputboxcontresume gap-1" key={index}>
                    <div
                      className="d-flex position-relative"
                      style={{ gap: "0.5rem", alignItems: "center" }}
                    >
                      <select
                        {...register(`year_of_employeement.${index}.to`, {
                          required: "Both are required",
                        })}
                      >
                        <option value=""></option>
                        {yearOption()?.map((d) => {
                          return (
                            <option
                              selected={+friend?.to === d}
                              key={d}
                              value={d}
                            >
                              {d}
                            </option>
                          );
                        })}
                      </select>
                      -
                      <select
                        {...register(`year_of_employeement.${index}.from`, {
                          required: "Both are required",
                        })}
                      >
                        <option value=""></option>
                        {yearOption()?.map((d) => {
                          return (
                            <option
                              selected={+friend?.from === d}
                              key={d}
                              value={d}
                            >
                              {d}
                            </option>
                          );
                        })}
                      </select>
                      <div
                        className="closeiconexception"
                        onClick={() => removeYearOfEmployeement(index)}
                      >
                        <Image src={closeicon} alt="closeicon" />{" "}
                      </div>
                    </div>
                    {(errors?.year_of_employeement?.[index]?.to ||
                      errors?.year_of_employeement?.[index]?.from) && (
                        <div className="error">To and From are required</div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="gap-1 w-80">
            <label className="acclabel" htmlFor=""></label>
            <div className="inputerrorparent">
              <div
                onClick={() => appendEmployment({ to: "", from: "" })}
                className="d-flex justify-content-end addmorebutton align-items-center"
              >
                <Image src={addmore} alt="Cherished beginnings" />
                Add More
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div className="documentparentclass">
          <div className="alltitle">
            Documents <sup>*</sup>
          </div>

          <div className="gap-1 w-80 exceptiongrid">
            <label className="acclabel" htmlFor="">
              Photo :
            </label>
            <div className="accinputboxphoto accinputboxphotogap">
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
                  src={defaultidimage}
                  width={100}
                  height={100}
                  alt="Cherished beginnings"
                />
              )}
              <div className="d-flex flex-column">
                <p>
                  We recommanded you to use a portraite photo or PDF file.
                  <br />
                  maximum size - 2 MB JPG or PNG
                </p>
                <input
                  type="file"
                  {...register("id_proof_file", {
                    validate: validateImage,
                  })}
                  onChange={handleFileChange}
                  name="photo"
                />
                {errors.id_proof_file && (
                  <span className="error">{errors.id_proof_file.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* {showBackBtn && <button onClick={() => setCurrent(2)}>Back</button>} */}
          {/* <div className="gap-1 w-80">
            <label className="acclabel" htmlFor=""></label>
            <div className="inputerrorparent">
              <div className="buttonparentsaveanddelete w-100">
                <button className="savesettingbtn" disabled={isLoading}>
                  {isLoading ? (
                    <div
                      className="spinner-border"
                      color="#9e4b34"
                      role="status"
                    ></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div> */}
          <div className="acccinputboxcont w-80 exceptiongrid">
            <label className="acclabel" htmlFor=""></label>
            <div className="buttonparentsaveanddelete  w-100 accbtngrp">
              {showBackBtn && <button onClick={() => setCurrent(2)}>Back</button>}

              <button className="savesettingbtn w-100" disabled={isLoading}>
                {isLoading ? (
                  <div
                    className="spinner-border"
                    color="#9e4b34"
                    role="status"
                  ></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResumeModal;
