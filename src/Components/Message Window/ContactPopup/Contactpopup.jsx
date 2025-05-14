import React, { useState } from "react";
import "./Contactpopup.css";
import stargroup from "../../../Assets/messagewindow/startgrp.svg";
import profile from "../../../Assets/messagewindow/Mask group.svg";
import Image from "next/image";
import { addContactApi } from "@/Redux/contact/addContectPostSlice";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import CommonRating from "@/Components/common/CommonRating";
import CommonImage from "@/Components/common/Image/CommonImage";

const ContactPopup = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const route = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      dispatch(addContactApi({ doula_id: +props?.data?.id, ...data })).then(
        (res) => {
          if (res?.payload?.success) {
            route.push("/my-requests");
            props?.onClose();
          }
          setLoading(false);
        }
      );
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="contactpopup d-flex justify-content-center align-items-center flex-column gap-4">
        <div>Contact to doula</div>
        <div>
          {props?.data?.profile_image ? (
            <CommonImage
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${props?.data?.profile_image}`}
              alt="Cherished beginnings"
              width={100}
              height={100}
              style={{ borderRadius: 10 }}
            />
          ) : (
            <Image src={profile} alt="Cherished beginnings" />
          )}
        </div>
        <div className="popupusername">{props?.data?.first_name || ""}</div>
        <div className="popupexp">
          {props?.data?.userDetail?.experience} yrs Experience
        </div>
        <div className="d-flex justify-content-center align-items-center gap-2 popupreviewsection">
          <div>4.0</div>
          {/* <Image src={stargroup} alt="Cherished beginnings" /> */}
          <CommonRating
            // onChange={(value) => setRating(value)}
            value={4}
            disabled={true}
          />
          <div>7reviews</div>
        </div>
        <input
          type="text"
          {...register("message", {
            required: "Message is required",
          })}
          placeholder="Enter Your Text Here"
        />
        {errors.message && (
          <span className="error">{errors.message.message}</span>
        )}
        <button onClick={handleSubmit(onSubmit)} disabled={loading}>
          {loading ? (
            <div className="spinner-border" color="#9e4b34" role="status"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </>
  );
};

export default ContactPopup;
