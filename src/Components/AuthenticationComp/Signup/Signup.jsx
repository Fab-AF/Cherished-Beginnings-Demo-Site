"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import applelogin from "../../../Assets/Authentication/applelogin.svg";
import googlelogin from "../../../Assets/Authentication/googlelogin.svg";
import "./Signup.css";
import {
  loadingStatus,
  singUp,
  successStatus,
} from "../../../Redux/auth/signUpSlice";
import {
  closeSignupModal,
  openEmailVerificationModal,
  openLoginModal,
} from "../../../Redux/modalSlice";
import { postApi } from "@/Redux/api";
import orimage from "../../../Assets/Authentication/orimage.svg";
import { singIn } from "@/Redux/auth/signInSlice";
import { setAuthToken, setLocalStore } from "@/modules/authentication";
import {
  getUserProfile,
  successStatus as profileSuccessStatus,
} from "@/Redux/customer/getProfileSlice";
import { bcryptRoles } from "@/modules/staticData";
import { useRouter } from "next/navigation";
// Import mock data
import * as mockData from "@/mockData";

const SignUpPage = () => {
  const [signupOption, setSignupOption] = useState("customer");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal());
    dispatch(closeSignupModal());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const route = useRouter();

  // Mock Google signup function
  const handleGoogleSignup = () => {
    // In a real app, this would trigger Google OAuth
    // For demo purposes, we'll just simulate a successful signup
    setLoading(true);

    setTimeout(() => {
      dispatch(closeSignupModal());
      dispatch(openEmailVerificationModal());
      setLoading(false);
    }, 1000);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      dispatch(
        singUp({ ...data, type: signupOption === "customer" ? 1 : 2 })
      ).then((res) => {
        if (res?.payload?.success) {
          dispatch(successStatus(res?.payload));
          dispatch(closeSignupModal());
          dispatch(openEmailVerificationModal());
        }
        setLoading(false);
      });
    } catch (error) {
      dispatch(errorStatus(error));
      setLoading(false);
    }
  };

  const handleOptionChange = (option) => {
    setSignupOption(option);
  };

  const getTitleText = () => {
    return signupOption === "customer"
      ? "Sign up as customer"
      : "Sign up as doula";
  };

  return (
    <>
      <div className="signupcontainer">
        <div className="signupbox">
          <div className="signuptitle">{getTitleText()}</div>
          <div>
            <strong> Already have an account? </strong>
            <Link href="/" onClick={handleOpenLoginModal}>
              Log in
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3 signupformlabel">
            <label
              htmlFor="signupcustomer"
              className={signupOption === "customer" ? "signupactive" : ""}
            >
              <input
                type="radio"
                name="signup"
                value="customer"
                id="signupcustomer"
                checked={signupOption === "customer"}
                onChange={() => handleOptionChange("customer")}
              />{" "}
              Customer
            </label>
            <label
              htmlFor="signupdoula"
              className={signupOption === "doula" ? "signupactive" : ""}
            >
              <input
                type="radio"
                name="signup"
                value="doula"
                id="signupdoula"
                checked={signupOption === "doula"}
                onChange={() => handleOptionChange("doula")}
              />{" "}
              Doula
            </label>
          </div>
          <div className="w-fit googlesignup">
            <Image
              src={googlelogin}
              onClick={handleGoogleSignup}
              alt="Cherished beginnings"
            />
            <Image src={applelogin} alt="Cherished beginnings" />
          </div>
          <Image src={orimage} alt="orimage" />

          {signupOption === "customer" ? (
            <form
              className="d-flex flex-column w-100 gap-3"
              onSubmit={handleSubmit(onSubmit)}
              id="signupformforcustomer"
            >
              <div>
                <input
                  type="text"
                  {...register("first_name", {
                    required: "First Name is required",
                  })}
                  placeholder="First Name"
                />
                {errors.first_name && (
                  <span className="error">{errors.first_name.message}</span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("last_name", {
                    required: "Last Name is required",
                  })}
                  placeholder="Last Name"
                />
                {errors.last_name && (
                  <span className="error">{errors.last_name.message}</span>
                )}
              </div>
              <div>
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
              <button type="submit">Sign up</button>
            </form>
          ) : (
            <form
              className="d-flex flex-column w-100 gap-3"
              onSubmit={handleSubmit(onSubmit)}
              id="signupformfordoula"
            >
              <div>
                <input
                  type="text"
                  {...register("first_name", {
                    required: "First Name is required",
                  })}
                  placeholder="First Name"
                />
                {errors.first_name && (
                  <span className="error">{errors.first_name.message}</span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("last_name", {
                    required: "Last Name is required",
                  })}
                  placeholder="Last Name"
                />
                {errors.last_name && (
                  <span className="error">{errors.last_name.message}</span>
                )}
              </div>
              <div>
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
              <button disabled={loading} type="submit">
                {loading ? (
                  <div
                    className="spinner-border"
                    color="#9e4b34"
                    role="status"
                  ></div>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
          )}
          <p className="mb-0">
            By clicking Signup, you agree href <a href="/"> Terms of use</a> and
            <a href="/"> Privacy Policy</a>
          </p>
        </div>
      </div>
    </>
  );
};

const SignUp = () => {
  return <SignUpPage />;
};

export default SignUp;
