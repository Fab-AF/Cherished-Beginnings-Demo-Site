/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";
import {
  clearLocalStore,
  getAuthToken,
  getLocalStore,
  getUserRole,
  removeCookie,
  storageKey,
} from "@/modules/authentication";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import chat from "../../Assets/New folder/chaticon.svg";
import avtar from "../../Assets/New folder/loginprofile.svg";
import notification from "../../Assets/New folder/notificationbell.svg";
import Logo from "../../Assets/logo-powerful-logo-for-newborn/logo-powerful-logo-for-newborn/Cherished Beginnings - final 1.png";
import {
  getUserProfile,
  successStatus,
} from "../../Redux/customer/getProfileSlice";
import {
  closeCreatePasswordFormModal,
  closeEmailVerificationFormModal,
  closeEmailVerificationModal,
  closeFindcareFormoneModal,
  closeFindcareFormtwoModal,
  closeForgotPasswordModal,
  closeLoginModal,
  closeSignupModal,
  openDoulaModal,
  openFindcareFormoneModal,
  openLoginModal,
  openSignupModal,
} from "../../Redux/modalSlice";
import CreatePassword from "../AuthenticationComp/Create/CreatePassword";
import EmailVerificationForm from "../AuthenticationComp/EmailVeryfication/EmailVerificationForm";
import Emailverification from "../AuthenticationComp/EmailVeryfication/Emailverification";
import Forgotpassword from "../AuthenticationComp/Forgotpassword/Forgotpassword";
import Login from "../AuthenticationComp/Login/Login";
import Signup from "../AuthenticationComp/Signup/Signup";
import ProfileModal from "../Doula/Profile/ProfileModal";
import FindCareForm from "../SearchForm/FindCareForm";
import FindCareForm2 from "../SearchForm/FindCareForm2";
import CommonModal from "../common/CommonModal";
import "./Header.css";
import CommonImage from "../common/Image/CommonImage";

const Header = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const {
    showSignupModal,
    showLoginModal,
    userData,
    user,
    showForgotModal,
    showFindCareForm1Modal,
    showFindCareForm2Modal,
    showEmailVerificationModal,
    showEmailVerificationFormModal,
    showCreatePasswordModal,
    showDoulaModalOpen,
  } = useSelector((state) => ({
    showSignupModal: state?.modal?.signupModalOpen,
    showLoginModal: state?.modal?.loginModalOpen,
    user: state?.getUserProfile?.data,
    userData: state?.singIn?.data,
    showForgotModal: state?.modal?.forgotPasswordModalOpen,
    showFindCareForm1Modal: state?.modal?.findcareFormoneModalOpen,
    showFindCareForm2Modal: state?.modal?.findcareFormtwoModalOpen,
    showEmailVerificationModal: state?.modal?.emailVerificationModalOpen,
    showEmailVerificationFormModal:
      state?.modal?.emailVerificationFormModalOpen,
    showCreatePasswordModal: state?.modal?.createPasswordFormModalOpen,
    showDoulaModalOpen: state?.modal?.doulaModalOpen,
  }));

  const getToken = getAuthToken();

  const handleOpenSignupModal = () => dispatch(openSignupModal());

  const handleCloseSignupModal = () => dispatch(closeSignupModal());

  const handleOpenLoginModal = () => dispatch(openLoginModal());

  const handleCloseLoginModal = () => dispatch(closeLoginModal());

  const handleCloseEmailVerificationModal = () =>
    dispatch(closeEmailVerificationModal());

  const handleCloseEmailVerificationFormModal = () =>
    dispatch(closeEmailVerificationFormModal());

  const handleCloseForgotPasswordModal = () =>
    dispatch(closeForgotPasswordModal());

  const handleCloseCreatePasswordModal = () =>
    dispatch(closeCreatePasswordFormModal());

  const handleOpenFindCareFormOneModal = () => {
    dispatch(openFindcareFormoneModal());
  };

  const handleCloseFindCareFormOneModal = () =>
    dispatch(closeFindcareFormoneModal());

  const handleCloseFindCareForm2Modal = () =>
    dispatch(closeFindcareFormtwoModal());

  const getUserName = () => {
    const user = JSON.parse(getLocalStore("user"));
    return user?.first_name;
  };

  const getCurrentUserProfile = () => {
    const user = JSON.parse(getLocalStore("user"));
    return user?.profile_image;
  };

  useEffect(() => {
    if (getToken) {
      dispatch(getUserProfile()).then((res) => {
        if (
          res?.payload?.profileDetails?.type === 2 &&
          res?.payload?.profileDetails?.profile_complete === 0
        ) {
          dispatch(openDoulaModal());
        }
        dispatch(successStatus(res?.payload?.profileDetails));
      });
    }
  }, [getToken]);

  return (
    <>
      {/* Signup Modal */}
      {showSignupModal && (
        <CommonModal open={showSignupModal} onClose={handleCloseSignupModal}>
          <Signup />
        </CommonModal>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <CommonModal open={showLoginModal} onClose={handleCloseLoginModal}>
          <Login />
        </CommonModal>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <CommonModal
          open={showForgotModal}
          onClose={handleCloseForgotPasswordModal}
        >
          <Forgotpassword />
        </CommonModal>
      )}

      {/* Create Password Modal */}
      {showCreatePasswordModal && (
        <CommonModal
          open={showCreatePasswordModal}
          onClose={handleCloseCreatePasswordModal}
        >
          <CreatePassword />
        </CommonModal>
      )}

      {/* Email Verification Modal */}
      {showEmailVerificationModal && (
        <CommonModal
          open={showEmailVerificationModal}
          onClose={handleCloseEmailVerificationModal}
        >
          <Emailverification />
        </CommonModal>
      )}

      {/* Email Verification form Modal */}
      {showEmailVerificationFormModal && (
        <CommonModal
          open={showEmailVerificationFormModal}
          onClose={handleCloseEmailVerificationFormModal}
        >
          <EmailVerificationForm />
        </CommonModal>
      )}

      {/* Find Care Form 1 Modal */}
      {showFindCareForm1Modal && (
        <CommonModal
          open={showFindCareForm1Modal}
          onClose={handleCloseFindCareFormOneModal}
        >
          <FindCareForm />
        </CommonModal>
      )}

      {/* Doula Profile Modal */}
      {showDoulaModalOpen && (
        <CommonModal
          open={showDoulaModalOpen}
          onClose={handleCloseFindCareFormOneModal}
        >
          <ProfileModal />
        </CommonModal>
      )}

      {/* Find Care Form 2 Modal */}

      {showFindCareForm2Modal && (
        <CommonModal
          open={showFindCareForm2Modal}
          onClose={handleCloseFindCareForm2Modal}
        >
          <FindCareForm2 />
        </CommonModal>
      )}

      <div className="headercontainer" id="home">
        <nav className="navtwo">
          <nav className="navbar navbar-expand-lg navpad">
            <div className="container-fluid px-0">
              <Link className="navbar-brand" href="/">
                <Image
                  className="logo h-auto "
                  src={Logo}
                  alt="Cherished beginnings"
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="">
                      Set Location
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/#service">
                      Services
                    </Link>
                  </li>
                  {getUserRole() !== 2 && (
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        href="/"
                        onClick={() => {
                          handleOpenFindCareFormOneModal();
                        }}
                      >
                        Find Care
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link" href="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
                {Object.keys(user || {})?.length > 0 || getToken ? (
                  <div className="logincontainerparent">
                    <div className="notificationchatparent">
                      <div className="notification">
                        <Image alt="Cherished beginnings" src={notification} />
                        <span className="headerbadge">2</span>
                      </div>
                      <div className="notification">
                        <Image alt="Cherished beginnings" src={chat} />
                        <span className="headerbadge">2</span>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button
                        className="btn dpmenuprofile dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="cursor-pointer">
                          {user?.profile_image ? (
                            <CommonImage
                              alt="Cherished beginnings"
                              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${user?.profile_image}`}
                              width={50}
                              height={50}
                              className="rounded-5"
                            />
                          ) : (
                            <Image alt="Cherished beginnings" src={avtar} />
                          )}
                          <span>
                            Hi,{" "}
                            {user?.first_name ||
                              userData?.first_name ||
                              getUserName()}
                          </span>
                        </div>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => route.push("/profile")}
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item "
                            onClick={() => {
                              clearLocalStore();
                              dispatch(successStatus({}));
                              removeCookie(storageKey);
                              route.push("/");
                            }}
                          >
                            Logout
                          </a>
                        </li>
                        {/* <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex gap-2 buttoncentermobile">
                    <button
                      className="btn  loginbutton text-uppercase px-4 py-2 rounded-5 text-black fw-bold"
                      onClick={handleOpenLoginModal}
                    >
                      Sign in
                    </button>
                    <button
                      className="btn signupbutton text-uppercase px-4 py-2 rounded-5 text-black fw-bold"
                      onClick={handleOpenSignupModal}
                    >
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </nav>
        {/* <!-- nav 2 end -->
        <!-- Hero Page --> */}
      </div>
    </>
  );
};

export default Header;
