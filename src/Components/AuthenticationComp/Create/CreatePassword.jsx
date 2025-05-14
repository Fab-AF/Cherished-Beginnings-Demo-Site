import { React, useState } from "react";
import { useForm } from "react-hook-form";
import "./CreatePassword.css";
import Image from "next/image";

import Link from "next/link";
import openeye from "../../../Assets/Authentication/eye-fill.svg";
import closeeye from "../../../Assets/Authentication/eye-slash-fill.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  loadingStatus,
  successStatus,
} from "../../../Redux/auth/forgotPasswordSlice";
import {
  closeCreatePasswordFormModal,
  openLoginModal,
} from "../../../Redux/modalSlice";
import { useParams, useRouter } from "next/navigation";

const CreatePassword = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues, // Add this line for getValues function
  } = useForm();

  const { slug } = useParams();
  const dispatch = useDispatch();
  const route = useRouter();
  const { loading = false, emailData = {} } = useSelector((state) => ({
    loading: state?.forgotPassword?.loading,
    emailData: state?.emailVerification?.data,
  }));

  const onSubmit = async (data) => {
    try {
      dispatch(loadingStatus());
      const token = slug?.[0]?.split("-");
      dispatch(
        forgotPassword({
          password: data?.password,
          confirm_password: data?.confirmPassword,
          token: token?.slice(0, 5)?.join("-"),
        })
      ).then((res) => {
        if (res?.payload?.success) {
          route.push("/");
          dispatch(successStatus(res?.payload));
          dispatch(closeCreatePasswordFormModal());
          dispatch(openLoginModal());
        }
      });
    } catch (error) {
      dispatch(errorStatus(error));
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  return (
    <>
      <div className="createpasscontainer">
        <div className="createpassbox">
          <div className="createpasstitle">Create a password</div>

          <form
            className="d-flex flex-column w-100 gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    strongPassword: (value) =>
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                        value
                      ) ||
                      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
                placeholder="Enter password"
              />
              <Image
                className="passwordeyeimage"
                onClick={() => setShowPassword(!showPassword)}
                src={showPassword ? openeye : closeeye}
                alt={showPassword ? "Hide Password" : "Show Password"}
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>
            <div className="position-relative">
              <input
                type={confirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                placeholder="Confirm password"
              />
              <Image
                className="passwordeyeimage"
                onClick={() => setConfirmPassword(!confirmPassword)}
                src={confirmPassword ? openeye : closeeye}
                alt={confirmPassword ? "Hide Password" : "Show Password"}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword.message}</span>
              )}
            </div>
            {/* <div className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                {...register("rememberMe")}
                id="rememberMe"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div> */}

            <button type="submit" disabled={loading}>
              {loading ? (
                <div className="spinner-border" color="#9e4b34" role="status"></div>
              ) : (
                "Confirm"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePassword;
