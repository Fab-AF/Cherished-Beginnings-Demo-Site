"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { closeEmailVerificationFormModal } from "../../../Redux/modalSlice";
import "./EmailVerificationForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  errorStatus,
  loadingStatus,
  resetPassword,
  successStatus,
} from "../../../Redux/auth/restPasswordSlice";

const EmailVerificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { loading = false } = useSelector((state) => ({
    loading: state.restPassword.loading,
  }));

  const onSubmit = async (data) => {
    try {
      dispatch(loadingStatus());
      dispatch(
        resetPassword({
          email: data?.email,
        })
      ).then((res) => {
        if (res?.payload?.success) {
          dispatch(successStatus(res?.payload));
          dispatch(closeEmailVerificationFormModal());
        }
      });
    } catch (error) {
      dispatch(errorStatus(error));
    }
  };

  return (
    <>
      <div className="createpasscontainer">
        <div className="createpassbox">
          <div className="createpasstitle">Forgot Password</div>

          <form
            className="d-flex flex-column w-100 gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="position-relative">
              <input
                type="text"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <div className="spinner-border text-light" role="status"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationForm;
