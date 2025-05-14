"use client";
import React, { useEffect, useState } from "react";
import "./paymenthistory.css";
import { Modal } from "react-bootstrap";
import { getApi, postApi } from "@/Redux/api";
import { isValidArray, successMeg } from "@/modules/utils";
import Image from "next/image";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import CommonLoader from "@/Components/common/Loader";
import NotFound from "@/Components/NotFound/NotFound";
import downloadicon from "../../../Assets/settings/downloadicon.svg";

const initialValue = {
  postal_code: "",
  name: "",
  // customerName: "",
  line1: "",
  city: "",
  state: "",
  country: "",
  email: "",
};

const page = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [billingInfoValue, setBillingInfoValue] = useState(initialValue);
  const [billingLoading, setBillingLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    postal_code: Yup.string()
      .required("Postal code is required")
      .matches(/^[0-9]{5}$/, "Postal code must be 5 digits"), // Example pattern for 5-digit postal code
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    line1: Yup.string().required("Address line is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    email: Yup.string().email().required("Email is required"),
  });

  const handleShowSaveCardModal = () => setShow(true);
  const handleCloseSaveCardModal = () => setShow(false);

  const getUpdateBillingValue = async () => {
    await getApi("/payment/billing-info").then((res) => {
      if (res?.data?.success) {
        setBillingInfoValue(res?.data?.billingInfo);
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      setBillingLoading(true);
      await postApi("/payment/billing-info", {
        postal_code: data?.postal_code,
        name: data?.name,
        line1: data?.line1,
        email: data?.email,
        city: data?.city,
        state: data?.state,
        country: data?.country,
      }).then((res) => {
        if (res?.data?.success) {
          successMeg(res?.data?.message);
          handleCloseSaveCardModal();
          getUpdateBillingValue();
        }
        setBillingLoading(false);
      });
    } catch (error) {
      setBillingLoading(false);
    }
  };

  const getPaymentHistory = async (page) => {
    try {
      await getApi(`/payment/payment-history?page=${page}&limit=${limit}`).then(
        (res) => {
          if (isValidArray(res?.data?.invoices)) {
            setPage(page);
            setTotalPage(res?.data?.pagination?.totalPages);
            if (page === 1) {
              setPaymentMethod([...res?.data?.invoices]);
            } else {
              setPaymentMethod([...paymentMethod, ...res?.data?.invoices]);
            }
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPaymentHistory(1);
  }, []);

  useEffect(() => {
    if (show) {
      getUpdateBillingValue();
    }
  }, [show]);

  return (
    <>
      {/* updatebillni info start */}
      <Modal
        className="custommodalwidth"
        centered
        show={show}
        onHide={handleCloseSaveCardModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-0">
          <Formik
            initialValues={billingInfoValue}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleSubmit, handleChange, errors, touched }) => {
              return (
                <div className="savecardmodalbody">
                  <div className="addcardtitle">Update billing info</div>
                  <div className="acccinputboxcont">
                    <label className="acclabel" htmlFor="">
                      Customer name :
                    </label>
                    <input
                      className="accinputbox"
                      onChange={handleChange}
                      value={values?.name}
                      name="name"
                      type="text"
                    />
                  </div>
                  {touched?.name && errors?.name && (
                    <p className="text-danger">{errors?.name}</p>
                  )}
                  <div className="acccinputboxcont">
                    <label className="acclabel" htmlFor="">
                      Email :
                    </label>
                    <input
                      className="accinputbox"
                      onChange={handleChange}
                      value={values?.email}
                      name="email"
                      type="text"
                    />
                  </div>
                  {touched?.email && errors?.email && (
                    <p className="text-danger">{errors?.email}</p>
                  )}
                  <div className="acccinputboxcont">
                    <label className="acclabel" htmlFor="">
                      Vat number :
                    </label>
                    <input
                      name="postal_code"
                      className="accinputbox"
                      type="text"
                      onChange={handleChange}
                      value={values?.postal_code}
                    />
                  </div>
                  {touched?.postal_code && errors?.postal_code && (
                    <p className="text-danger">{errors?.postal_code}</p>
                  )}
                  <div className="acccinputboxcont">
                    <label className="acclabel" htmlFor="">
                      Address :
                    </label>
                    <input
                      name="line1"
                      onChange={handleChange}
                      value={values?.line1}
                      className="accinputboxaddress"
                      type="text"
                    />
                  </div>
                  {touched?.line1 && errors?.line1 && (
                    <p className="text-danger">{errors?.line1}</p>
                  )}
                  <div className="acccinputboxcont">
                    <label className="acclabel" htmlFor="">
                      Country :
                    </label>
                    <input
                      name="country"
                      className="accinputbox"
                      type="text"
                      onChange={handleChange}
                      value={values?.country}
                    />
                  </div>
                  {touched?.country && errors?.country && (
                    <p className="text-danger">{errors?.country}</p>
                  )}
                  <div className="acccinputboxcont">
                    <label className="acclabel" htmlFor="">
                      State :
                    </label>
                    <input
                      name="state"
                      className="accinputbox"
                      type="text"
                      onChange={handleChange}
                      value={values?.state}
                    />
                  </div>
                  {touched?.state && errors?.state && (
                    <p className="text-danger">{errors?.state}</p>
                  )}
                  <div className="acccinputboxcont">
                    <label className="acclabel" htmlFor="">
                      City :
                    </label>
                    <input
                      name="city"
                      className="accinputbox"
                      type="text"
                      onChange={handleChange}
                      value={values?.city}
                    />
                  </div>
                  {touched?.city && errors?.city && (
                    <p className="text-danger">{errors?.city}</p>
                  )}
                  <div
                    className="d-flex justify-content-center"
                    style={{
                      width: "45%",
                      position: "relative",
                      left: "148px",
                    }}
                  >
                    <button
                      className="addcardbutton w-100"
                      onClick={handleSubmit}
                      disabled={billingLoading}
                    >
                      {billingLoading ? (
                        <div
                          className="spinner-border"
                          color="#9e4b34"
                          role="status"
                        ></div>
                      ) : (
                        "Update billing info"
                      )}
                    </button>
                  </div>
                </div>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
      {/* updatebillni info end */}
      <div className="paymenthistoryountcontainer">
        <div className="d-flex justify-content-between">
          <div>Payment history</div>
          <div onClick={handleShowSaveCardModal}>update billing info</div>
        </div>
        <div>
          <hr />
        </div>
        <table className="w-100">
          <thead>
            <tr>
              <th>Reference id</th>
              <th>Date</th>
              <th>Doula name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Total payment</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {isValidArray(paymentMethod) &&
              paymentMethod?.map((d, ind) => {
                return (
                  <tr>
                    <td>{ind + 1}</td>
                    <td>
                      {d?.createdAt
                        ? moment(d?.createdAt).format("DD MMM YYYY")
                        : "-"}
                    </td>
                    <td>
                      {d?.doula?.first_name} {d?.doula?.last_name}
                    </td>
                    <td>{d?.description || "-"}</td>
                    <td>Fixed price</td>
                    <td>${d?.amount || 0}</td>
                    <td>
                      {d?.receipt_url ? (
                        <a href={d?.receipt_url} target="_blank" download>
                          <Image
                            src={downloadicon}
                            alt="Cherished beginnings"
                          />
                        </a>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {loading && <CommonLoader />}
        {!loading && !isValidArray(paymentMethod) && <NotFound />}
        {+totalPage > +page && (
          <u
            className="d-flex justify-content-center"
            onClick={() => getPaymentHistory(page + 1)}
          >
            View More
          </u>
        )}
      </div>
    </>
  );
};

export default page;
