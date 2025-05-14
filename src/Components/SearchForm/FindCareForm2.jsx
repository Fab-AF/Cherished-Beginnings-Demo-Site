import React from "react";
import "./FindCareForm2.css";
import Image from "next/image";

import form2logo from "../../Assets/logo-powerful-logo-for-newborn/logo-powerful-logo-for-newborn/Cherished Beginnings - final 1.png";
import arrow from "../../Assets/arrow/Outlined/32/ArrowRight.svg";
import Link from "next/link";
import { useForm } from "react-hook-form";

const FindCareForm2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <>
      <div className="findcaremodal2">
        <Link href="/">
          <div className="form2header">
            <Image className="h-auto " src={form2logo} alt="Cherished beginnings" />
          </div>
        </Link>
        <div className="form2main">
          <form onSubmit={handleSubmit(onSubmit)} className="form2class">
            <div className="form1title">Personal information</div>
            <div className="formcontainer1">
              <div className="d-flex gap-3">
                <div className="inputwidthset">
                  <input
                    className="f2zip"
                    type="text"
                    placeholder="Enter first name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <span className="error">{errors.firstName.message}</span>
                  )}
                </div>
                <div className="inputwidthset">
                  <input
                    className="f2zip"
                    type="text"
                    placeholder="Enter last name"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <span className="error">{errors.lastName.message}</span>
                  )}
                </div>
              </div>
              <div className="d-flex gap-3">
                <div className="inputwidthset">
                  {" "}
                  <input
                    className="f2zip"
                    type="text"
                    placeholder="Partner/Spouse first name"
                    {...register("partnerFirstName", {
                      required: "partner firstname required",
                    })}
                  />{" "}
                  {errors.partnerFirstName && (
                    <span className="error">
                      {errors.partnerFirstName.message}
                    </span>
                  )}
                </div>
                <div className="inputwidthset">
                  <input
                    className="f2zip"
                    type="text"
                    placeholder="Partner/Spouse last name"
                    {...register("partnerLastName", {
                      required: "partner last name required",
                    })}
                  />
                  {errors.partnerLastName && (
                    <span className="error">
                      {errors.partnerLastName.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <input
                  className="f1zip"
                  type="text"
                  placeholder="Enter e-mail"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>
              <div>
                <input
                  className="f1zip"
                  type="text"
                  placeholder="Enter phone no"
                  {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && (
                  <span className="error">{errors.phone.message}</span>
                )}
              </div>
              <div>
                <input
                  className="f1zip"
                  type="text"
                  placeholder="Address"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <span className="error">{errors.address.message}</span>
                )}
              </div>

              <div className="vacation">What vacations are required?</div>
              <div>
                <div className="radioset pl">
                  <label htmlFor="vacationYes" className="yesnowidth">
                    <div className="form-check px-5 py-3 rounded1 w-100">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="vacationRequired"
                        id="vacationYes"
                        value="Yes"
                        {...register("vacationRequired", {
                          required: "Please select an option",
                        })}
                      />
                      <div>Yes</div>
                    </div>
                  </label>
                  <label htmlFor="vacationNo" className="yesnowidth">
                    <div className="form-check px-5 py-3 rounded1  w-100">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="vacationRequired"
                        id="vacationNo"
                        value="No"
                        {...register("vacationRequired", {
                          required: "Please select an option",
                        })}
                      />
                      <div>No</div>
                    </div>
                  </label>
                </div>
                {errors.vacationRequired && (
                  <span className="error">{errors.vacationRequired.message}</span>
                )}
              </div>

              <div className="vacation">Do you have parking?</div>
              <div>
                <div className="radioset pl">
                  <label htmlFor="parkingYes" className="yesnowidth">
                    <div className="form-check px-5 py-3 rounded1 w-100">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="parking"
                        id="parkingYes"
                        value="Yes"
                        {...register("parking", {
                          required: "Please select an option",
                        })}
                      />
                      <div> Yes</div>
                    </div>
                  </label>
                  <label htmlFor="parkingNo" className="yesnowidth">
                    <div className="form-check px-5 py-3 rounded1 w-100">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="parking"
                        id="parkingNo"
                        value="No"
                        {...register("parking", {
                          required: "Please select an option",
                        })}
                      />
                      <div>No</div>
                    </div>
                  </label>
                </div>
                {errors.parking && (
                  <span className="error">{errors.parking.message}</span>
                )}
              </div>
            </div>

            <button
              className="nextbutton d-flex justify-content-center align-items-center gap-2 w-100 p-0"
              type="submit"
            >
              <div>Finish</div>
              <Image src={arrow} alt="Cherished beginnings" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FindCareForm2;
