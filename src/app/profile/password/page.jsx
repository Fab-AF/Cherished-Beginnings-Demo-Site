"use client";
import React, { useState } from "react";
import "./password.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  changePassword,
  errorStatus,
  loadingStatus,
  successStatus,
} from "../../../Redux/customer/changePasswordSlice";

const page = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      dispatch(loadingStatus());
      dispatch(changePassword(data)).then((res) => {
        if (res?.payload?.success) {
          dispatch(successStatus(res?.payload));
          reset();
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      dispatch(errorStatus(error));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="accountcontainer">
          <div>Change Password</div>
          <div>
            <hr />
          </div>
          <div className="accformcontainer">
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Current Password :
              </label>
              <div className="d-flex flex-column inputerrorparent">
                <input
                  className="accinputbox"
                  {...register("oldPassword", {
                    required: "Current Password is required",
                  })}
                  type="text"
                />
                {errors.oldPassword && (
                  <span className="error">{errors.oldPassword.message}</span>
                )}
              </div>
            </div>
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                New Password :
              </label>
              <div>
                {" "}
                <input
                  {...register("newPassword", {
                    required: "New Password is required",
                    validate: {
                      strongPassword: (value) =>
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                          value
                        ) ||
                        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                  className="accinputbox"
                  type="text"
                />
                {errors.newPassword && (
                  <span className="error">{errors.newPassword.message}</span>
                )}
              </div>
            </div>

            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor="">
                Verify Password :
              </label>
              <div className="inputerrorparent">
                <input
                  {...register("confirmNewPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("newPassword") ||
                      "Passwords do not match",
                  })}
                  className="accinputbox"
                  type="text"
                />
                {errors.confirmNewPassword && (
                  <span className="error">
                    {errors.confirmNewPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="acccinputboxcont">
              <label className="acclabel" htmlFor=""></label>
              <div className="buttonparentsaveanddelete">
                <button disabled={loading} type="submit" className="">
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
          </div>
        </div>
      </form>
    </>
  );
};

export default page;
