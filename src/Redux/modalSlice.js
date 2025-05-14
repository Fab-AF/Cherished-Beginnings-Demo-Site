import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    signupModalOpen: false,
    loginModalOpen: false,
    forgotPasswordModalOpen: false,
    findcareFormoneModalOpen: false,
    findcareFormtwoModalOpen: false,
    createPasswordFormModalOpen: false,
    emailVerificationModalOpen: false,
    emailVerificationFormModalOpen: false,
    doulaModalOpen: false,
  },
  reducers: {
    openSignupModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.signupModalOpen = false;
    },
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openForgotPasswordModal: (state) => {
      state.forgotPasswordModalOpen = true;
    },
    closeForgotPasswordModal: (state) => {
      state.forgotPasswordModalOpen = false;
    },
    openFindcareFormoneModal: (state) => {
      state.findcareFormoneModalOpen = true;
    },
    closeFindcareFormoneModal: (state) => {
      state.findcareFormoneModalOpen = false;
    },
    openFindcareFormtwoModal: (state) => {
      state.findcareFormtwoModalOpen = true;
    },
    closeFindcareFormtwoModal: (state) => {
      state.findcareFormtwoModalOpen = false;
    },
    openCreatePasswordFormModal: (state) => {
      state.createPasswordFormModalOpen = true;
    },
    closeCreatePasswordFormModal: (state) => {
      state.createPasswordFormModalOpen = false;
    },
    openEmailVerificationModal: (state) => {
      state.emailVerificationModalOpen = true;
    },
    closeEmailVerificationModal: (state) => {
      state.emailVerificationModalOpen = false;
    },
    openEmailVerificationFormModal: (state) => {
      state.emailVerificationFormModalOpen = true;
    },
    closeEmailVerificationFormModal: (state) => {
      state.emailVerificationFormModalOpen = false;
    },
    openDoulaModal: (state) => {
      state.doulaModalOpen = true;
    },
    closeDoulaModal: (state) => {
      state.doulaModalOpen = false;
    },
  },
});

export const {
  openSignupModal,
  closeSignupModal,
  openLoginModal,
  closeLoginModal,
  openForgotPasswordModal,
  closeForgotPasswordModal,
  openFindcareFormoneModal,
  closeFindcareFormoneModal,
  openFindcareFormtwoModal,
  closeFindcareFormtwoModal,
  openCreatePasswordFormModal,
  closeCreatePasswordFormModal,
  openEmailVerificationModal,
  closeEmailVerificationModal,
  openEmailVerificationFormModal,
  closeEmailVerificationFormModal,
  closeDoulaModal,
  openDoulaModal
} = modalSlice.actions;

export default modalSlice.reducer;
