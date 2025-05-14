/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import arrowright from "../../Assets/arrow/Outlined/32/ArrowRight.svg";
import poverty from "../../Assets/below poverty.svg";
import uparrow from "../../Assets/up-arrow.png";
import {
  emailVerification,
  successStatus,
} from "../../Redux/auth/emailVerificationSlice";
import {
  successStatus as filterSearchSuccess,
  initialFilterValue,
} from "../../Redux/searchFilter/searchFilterSlice";
import "./Hero.css";

import {
  DOULA_FILTER,
  getUserRole,
  setLocalStore,
} from "@/modules/authentication";
import { filterService } from "@/modules/staticData";
import { removeNullKeys } from "@/modules/utils";
import moment from "moment";
import { useForm } from "react-hook-form";
import {
  openCreatePasswordFormModal,
  openForgotPasswordModal,
} from "../../Redux/modalSlice";
import "antd/dist/reset.css";
import CommonDatePicker from "../common/CommonDatePicker";
import * as Yup from "yup";
import { Formik } from "formik";

const Hero = () => {
  const initialValue = {
    service: [],
    location: "",
    dateFrom: "",
    dateTo: "",
    expectedDueDate: "",
    dob: "",
  };

  const validationSchema = Yup.object().shape({
    service: Yup.array(),
    location: Yup.string(),
    dateFrom: Yup.date().nullable(),
    dateTo: Yup.date().nullable(),
    expectedDueDate: Yup.date().nullable(),
    dob: Yup.date().nullable(),
  });

  const [loading, setLoading] = useState(false);

  const { slug } = useParams();
  const dispatch = useDispatch();
  const route = useRouter();

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.1, staggerChildren: 0.04 } },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const text = "Connecting families with quality, local caregivers";

  const onSubmit = (data, { resetForm }) => {
    let service = [];
    setLoading(true);
    data?.service?.forEach((d, ind) => {
      if (data?.service?.includes(d)) {
        service.push(ind + 1);
      }
    });

    const value = {
      ...data,
      ...(data?.dateFrom && {
        dateFrom: moment(data?.dateFrom).format("DD-MM-YYYY"),
      }),
      ...(data?.dateTo && {
        dateTo: moment(data?.dateTo).format("DD-MM-YYYY"),
      }),
      ...(service?.length > 0 && { service }),
      ...(data?.dob && {
        child_info: [
          { multiplicity: "", dob: moment(data?.dob).format("DD-MM-YYYY") },
        ],
      }),
    };

    if (Object.keys(value)?.includes("dob")) {
      delete value?.dob;
    }
    resetForm();
    setLocalStore(DOULA_FILTER, JSON.stringify(removeNullKeys(value)));
    setLoading(false);
    route.push("/listing");
  };

  const handleEmailVerify = useCallback(async () => {
    const token = slug?.[0]?.split("-");
    if (token?.length === 7) {
      dispatch(
        emailVerification({ email_token: token?.slice(0, 5)?.join("-") })
      ).then((res) => {
        if (res?.payload?.success) {
          dispatch(successStatus(res?.payload));
          if (slug?.[0]?.includes("create-password")) {
            dispatch(openCreatePasswordFormModal());
          }
          if (slug?.[0]?.includes("forgot-password")) {
            dispatch(openForgotPasswordModal());
          }
        }
      });
    }
  }, [slug]);

  const [isTokenFound, setIsTokenFound] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("CHERISHED_BEGINNINGS_TOKEN");
    if (token) {
      setIsTokenFound(true);
    } else {
      setIsTokenFound(false);
    }
  }, []);
  useEffect(() => {
    handleEmailVerify();
  }, [handleEmailVerify]);

  useEffect(() => {
    dispatch(filterSearchSuccess(initialFilterValue));
  }, []);

  return (
    <>
      <div className="herocontainer">
        <div className={isTokenFound ? "hero" : "herologout"}>
          <motion.div
            className="herotext"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={charVariants}>
                {char}
              </motion.span>
            ))}
          </motion.div>
          <Image src={poverty} className="poverty" alt="Cherished beginnings" />
          {getUserRole() !== 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="formcontainer"
              id="findcare"
            >
              <div className="formtitle text-center">Find care</div>
              <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, setFieldValue, handleSubmit }) => {
                  return (
                    <form className="formparentfindcare">
                      <div className="d-flex flex-column gap-3">
                        <div className="servicerow">
                          What service are you interested in
                        </div>
                        <div className="radioservice d-flex">
                          {filterService?.map((d) => {
                            return (
                              <div
                                key={d}
                                name="service"
                                onClick={() => {
                                  if (values?.service?.includes(d)) {
                                    setFieldValue(
                                      "service",
                                      values?.service?.filter((e) => e !== d)
                                    );
                                  } else {
                                    setFieldValue("service", [
                                      ...values?.service,
                                      d,
                                    ]);
                                  }
                                }}
                                className={`form-check px-5 py-3 ${
                                  values?.service?.includes(d)
                                    ? "active-bg"
                                    : ""
                                }`}
                              >
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault1"
                                >
                                  {d}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="d-flex gap-3 align-items-end justify-content-between boardingdate flex-wrap">
                        <div className="boardingnear d-flex flex-column gap-3">
                          <label className="servicerow" htmlFor="boardingnear">
                            Boarding near
                          </label>
                          <input
                            type="text"
                            name="location"
                            onChange={(e) => {
                              setFieldValue("location", e?.target?.value);
                            }}
                            placeholder="Zip Code or address"
                            className="px-4 py-3 forminoutset"
                          />
                        </div>
                        <div className="boardingnear d-flex flex-column gap-3">
                          <label className="servicerow" htmlFor="boardingnear">
                            For these days
                          </label>
                          <div className="d-flex">
                            <CommonDatePicker
                              value={values?.dateFrom}
                              name="dateFrom"
                              onChange={(date) => {
                                setFieldValue("dateFrom", date);
                                setFieldValue("dateTo", "");
                              }}
                              id="dateFrom"
                              placeholder="Start Date"
                              className="px-4 py-3 forminoutset"
                            />
                          </div>
                        </div>
                        <div className="boardingnear d-flex flex-column gap-3">
                          <CommonDatePicker
                            value={values?.dateTo}
                            name="dateTo"
                            onChange={(date) => {
                              setFieldValue("dateTo", date);
                            }}
                            id="dateTo"
                            placeholder="End Date"
                            className="px-4 py-3 forminoutset"
                          />
                        </div>
                      </div>
                      <div className="expecdaobparent">
                        <div className="d-flex flex-column gap-3">
                          <div className="servicerow">
                            Expected due date of birthday
                          </div>
                          <div className="flex-wrap gap-2">
                            <div className="d-flex gap-10 datepickerwidth">
                              <CommonDatePicker
                                value={values?.expectedDueDate}
                                name="expectedDueDate"
                                onChange={(date) => {
                                  setFieldValue("expectedDueDate", date);
                                }}
                                id="expectedDueDate"
                                placeholder="Date picker"
                                disabledDate={(current) =>
                                  current && current > moment().endOf("day")
                                }
                                className="px-4 py-3 forminoutset"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-column gap-3">
                          <div className="servicerow">Date of birth</div>
                          <div className="flex-wrap gap-2">
                            <div className="d-flex gap-10 datepickerwidth">
                              <CommonDatePicker
                                value={values?.dob}
                                name="dob"
                                onChange={(date) => setFieldValue("dob", date)}
                                id="dob"
                                placeholder="Date picker"
                                disabledDate={(current) =>
                                  current && current > moment().endOf("day")
                                }
                                className="px-4 py-3 forminoutset"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-decoration-none findbuttonparent">
                        <button
                          onClick={handleSubmit}
                          className="findbutton d-flex justify-content-center align-items-center gap-2"
                        >
                          <div className="find text-capitalize">find</div>
                          <Image src={arrowright} alt="Cherished beginnings" />
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </motion.div>
          )}
        </div>
      </div>
      <div>
        <a href="#">
          <Image className="uparrow" src={uparrow} alt="Cherished beginnings" />
        </a>
      </div>
    </>
  );
};

export default Hero;
