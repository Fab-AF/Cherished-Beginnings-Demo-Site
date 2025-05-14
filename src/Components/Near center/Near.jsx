"use client";
import React, { useEffect, useState } from "react";
import "./Near.css";
import ann1 from "../../Assets/ann1.svg";
import ann2 from "../../Assets/ann2.svg";
import ann3 from "../../Assets/ann3.svg";
import ann4 from "../../Assets/ann4.svg";
import ann5 from "../../Assets/ann5.svg";
import ann6 from "../../Assets/ann6.svg";
import ann7 from "../../Assets/ann7.svg";
import Image from "next/image";
import {
  initialFilterValue,
  successStatus,
} from "../../Redux/searchFilter/searchFilterSlice";
import { useForm } from "react-hook-form";
import { zipCodeValidation } from "@/modules/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  successStatus as doulaListingSuccessStatus,
  searchDoula,
} from "../../Redux/customer/searchDoulaSlice";
import { useRouter } from "next/navigation";
import { DOULA_FILTER, setLocalStore } from "@/modules/authentication";

const Near = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const filterData = useSelector((state) => state?.searchFilter?.data);
  const route = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      setLocalStore(DOULA_FILTER, JSON.stringify(data));

      // dispatch(successStatus({ ...filterData, ...data }));
      // dispatch(searchDoula({data})).then((res) => {
      //   dispatch(
      //     doulaListingSuccessStatus({ show: true, data: res?.payload?.doulas })
      //   );
      route.push("/listing");
      // });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(successStatus(initialFilterValue));
  }, []);
  return (
    <>
      <div className="nearcontainer" id="setlocation">
        <div className="nearcentercontainer">
          <div className="bgimagenear d-flex justify-content-center align-items-center flex-column gap-4">
            <div className="nearcentertitle">Find a doula near you</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="nearrow2 d-flex gap-3"
            >
              <input
                type="text "
                {...register("location", {
                  required: "Zip code is required",
                  ...zipCodeValidation,
                })}
                className="ziptext"
                placeholder="Enter Zip Code"
              />
              {errors.location && (
                <span className="error">{errors.location.message}</span>
              )}
              <button disabled={loading} className="findbutton3">
                Find your centre
              </button>
            </form>
            <div className="d-flex locationsparent justify-content-center align-items-center flex-wrap gap-3 w-75">
              <div className="locations gap-2">
                <Image
                  src={ann1}
                  className="announcement"
                  alt="Cherished beginnings"
                />
                <div className="locationtext">California</div>
              </div>
              <div className="locations gap-2">
                <Image
                  src={ann2}
                  className="announcement"
                  alt="Cherished beginnings"
                />
                <div className="locationtext">Texas</div>
              </div>
              <div className="locations gap-2">
                <Image
                  src={ann3}
                  className="announcement"
                  alt="Cherished beginnings"
                />
                <div className="locationtext">New York</div>
              </div>
              <div className="locations gap-2">
                <Image
                  src={ann4}
                  className="announcement"
                  alt="Cherished beginnings"
                />
                <div className="locationtext">Florida</div>
              </div>
              <div className="locations gap-2">
                <Image
                  src={ann5}
                  className="announcement"
                  alt="Cherished beginnings"
                />
                <div className="locationtext">Illinois </div>
              </div>
              <div className="locations gap-2">
                <Image
                  src={ann6}
                  className="announcement"
                  alt="Cherished beginnings"
                />
                <div className="locationtext">Pennsylvania</div>
              </div>
              <div className="locations gap-2">
                <Image
                  src={ann7}
                  className="announcement"
                  alt="Cherished beginnings"
                />
                <div className="locationtext">Georgia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Near;
