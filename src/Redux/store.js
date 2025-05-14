"use client";
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import signUpReducer from "./auth/signUpSlice";
import signInReducer from "./auth/signInSlice";
import forgotPasswordReducer from "./auth/forgotPasswordSlice";
import emailVerificationReducer from "./auth/emailVerificationSlice";
import restPasswordReducer from "./auth/restPasswordSlice";
import countryReducer from "./country/countrysSlice";
import userProfileReducer from "./customer/userProfileSlice";
import doulaProfileReducer from "./customer/doulaProfileSlice";
import changePasswordReducer from "./customer/changePasswordSlice";
import languageReducer from "./languages/languagesSlice";
import getUserProfileReducer from "./customer/getProfileSlice";
import specialityListReducer from "./speciality/specialitySlice";
import servicesListReducer from "./services/servicesSlice";
import searchFilterReducer from "./searchFilter/searchFilterSlice";
import availabilityListReducer from "./availability/availabilitySlice";
import searchDoulaReducer from "./customer/searchDoulaSlice";
import getAgeGroupsReducer from "./getAgeGroups/getAgeGroupsSlice";
import updateAvailabilityReducer from "./availability/updateAvailabilitySlice";
import getDoulaDetailsReducer from "./customer/getDoulsDetailSlice";
import getDoulaContactReducer from "./contact/getContactSlice";
import getDoulaDetailsContactReducer from "./contact/getContactDetailsSlice";
import getFavoriteDetailsReducer from './favorite/getListSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    //auth
    singUp: signUpReducer,
    singIn: signInReducer,
    forgotPassword: forgotPasswordReducer,
    emailVerification: emailVerificationReducer,
    restPassword: restPasswordReducer,

    country: countryReducer,
    languages: languageReducer,
    userProfile: userProfileReducer,
    doulaProfile: doulaProfileReducer,
    changePassword: changePasswordReducer,
    getUserProfile: getUserProfileReducer,
    speciality: specialityListReducer,
    services: servicesListReducer,
    searchFilter: searchFilterReducer,
    availability: availabilityListReducer,
    searchDoula: searchDoulaReducer,
    getAgeGroups: getAgeGroupsReducer,
    updateAvailability: updateAvailabilityReducer,
    getDoulaDetails: getDoulaDetailsReducer,
    getDoulaContact: getDoulaContactReducer,
    getDoulaDetailsContact: getDoulaDetailsContactReducer,
    getFavoriteDetails:getFavoriteDetailsReducer
  },
});
