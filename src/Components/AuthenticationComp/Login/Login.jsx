"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useDispatch } from "react-redux";
import applelogin from "../../../Assets/Authentication/applelogin.svg";
import openeye from "../../../Assets/Authentication/eye-fill.svg";
import closeeye from "../../../Assets/Authentication/eye-slash-fill.svg";
import googlelogin from "../../../Assets/Authentication/googlelogin.svg";
import orimage from "../../../Assets/Authentication/orimage.svg";
import "./Login.css";

import {
  setAuthToken,
  setLocalStore,
  storageKey,
} from "@/modules/authentication";
import { useRouter } from "next/navigation";
import {
  errorStatus,
  loadingStatus,
  singIn,
  successStatus,
} from "../../../Redux/auth/signInSlice";
import {
  getUserProfile,
  successStatus as profileSuccessStatus,
} from "../../../Redux/customer/getProfileSlice";
import {
  closeLoginModal,
  openDoulaModal,
  openEmailVerificationFormModal,
  openSignupModal,
} from "../../../Redux/modalSlice";
import { bcryptRoles } from "@/modules/staticData";
// Import mock data instead of using real OAuth
import * as mockData from "@/mockData";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock Google login function
  const handleGoogleLogin = () => {
    // In a real app, this would trigger Google OAuth
    // For demo purposes, we'll just simulate a successful login with mock data
    const mockUser = mockData.userProfileMock;

    // Simulate login process
    setLoading(true);
    setTimeout(() => {
      setAuthToken("mock-auth-token");
      setLocalStore(
        "user",
        JSON.stringify({
          ...mockUser,
          password: "",
          type: bcryptRoles[mockUser.type],
        })
      );

      // Close modal and redirect
      dispatch(closeLoginModal());
      route.push("/profile");
      setLoading(false);
    }, 1000);
  };

  const dispatch = useDispatch();
  const route = useRouter();

  const handleOpenForgotPasswordModal = () => {
    dispatch(openEmailVerificationFormModal());
    dispatch(closeLoginModal());
  };

  const handleOpenSignupModal = () => {
    dispatch(openSignupModal());
    dispatch(closeLoginModal());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(loadingStatus());
      setLoading(true);
      dispatch(singIn({ email: data?.email, password: data?.password })).then(
        (res) => {
          if (res?.payload?.success) {
            dispatch(successStatus(res?.payload?.result));
            setAuthToken("mock-auth-token");
            setLocalStore(
              "user",
              JSON.stringify({
                ...mockData.userProfileMock,
                password: "",
                type: bcryptRoles[mockData.userProfileMock.type],
              })
            );
            dispatch(getUserProfile()).then((res) => {
              dispatch(
                profileSuccessStatus({
                  ...res?.payload?.profileDetails,
                  token: "mock-auth-token",
                })
              );

              if (
                res?.payload?.profileDetails?.type === 2 &&
                res?.payload?.profileDetails?.profile_complete === 0
              ) {
                dispatch(openDoulaModal());
              } else {
                route.push("/profile");
              }
            });
            if (res?.payload?.profileDetails?.type === 1) {
              route.push("/profile");
            }
            dispatch(closeLoginModal());
          }
          setLoading(false);
        }
      );
    } catch (error) {
      dispatch(errorStatus(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="logincontainer">
        <div className="loginbox">
          <div className="logintitle">Login</div>
          <div>
            <strong> Do not have an account? </strong>
            <Link href="/" onClick={handleOpenSignupModal}>
              Sign up
            </Link>
          </div>
          <div className="w-fit googlesignup">
            <Image src={googlelogin} onClick={handleGoogleLogin} alt="googleloginimage" />
            <Image src={applelogin} alt="appleloginimage" />
          </div>
          <Image src={orimage} alt="orimage" />
          <form
            className="d-flex flex-column w-100 gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
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

            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center justify-content-between gap-1">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  id="rememberMe"
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link href="/" onClick={handleOpenForgotPasswordModal}>
                Forgot your password
              </Link>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? (
                <div className="spinner-border" color="#9e4b34" role="status"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p>
            By clicking Login, you agree href <a href="/"> Terms of use</a> and
            <a href="/"> Privacy Policy</a>
          </p>
        </div>
      </div>
    </>
  );
};

const Login = () => {
  return <LoginPage />;
};

export default Login;
