"use client";
import Doulanav from "@/Components/Doulanav/Doulanav";
import "./availibility.css";
import { getValue12HorseTo24Horse, timesFormate } from "@/modules/utils";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getApi } from "../../Redux/api";
import { updateAvailability } from "../../Redux/availability/updateAvailabilitySlice";
import { doulaFilterInitialValue } from "@/modules/staticData";
import { getAuthToken, getUserRole } from "@/modules/authentication";
import { redirect } from "next/navigation";
import Image from "next/image";
import closeicon from "../../Assets/arrow/close.png";
import { toast } from "react-toastify";

const AvailabilityList = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (getUserRole() === 1 || !getAuthToken()) {
    redirect("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: doulaFilterInitialValue,
  });

  const {
    fields: mondayFields,
    append: mondayAppend,
    remove: mondayRemove,
  } = useFieldArray({
    control,
    name: "monday",
  });

  const {
    fields: tuesdayFields,
    append: tuesdayAppend,
    remove: tuesdayRemove,
  } = useFieldArray({
    control,
    name: "tuesday",
  });

  const {
    fields: wednesdayFields,
    append: wednesdayAppend,
    remove: wednesdayRemove,
  } = useFieldArray({
    control,
    name: "wednesday",
  });

  const {
    fields: thursdayFields,
    append: thursdayAppend,
    remove: thursdayRemove,
  } = useFieldArray({
    control,
    name: "thursday",
  });

  const {
    fields: fridayFields,
    append: fridayAppend,
    remove: fridayRemove,
  } = useFieldArray({
    control,
    name: "friday",
  });

  const {
    fields: saturdayFields,
    append: saturdayAppend,
    remove: saturdayRemove,
  } = useFieldArray({
    control,
    name: "saturday",
  });

  const {
    fields: sundayFields,
    append: sundayAppend,
    remove: sundayRemove,
  } = useFieldArray({
    control,
    name: "sunday",
  });

  const mondayCheck = useWatch({ control, name: "mondayCheck" });
  const tuesdayCheck = useWatch({ control, name: "tuesdayCheck" });
  const wednesdayCheck = useWatch({ control, name: "wednesdayCheck" });
  const thursdayCheck = useWatch({ control, name: "thursdayCheck" });
  const fridayCheck = useWatch({ control, name: "fridayCheck" });
  const saturdayCheck = useWatch({ control, name: "saturdayCheck" });
  const sundayCheck = useWatch({ control, name: "sundayCheck" });

  const onSubmit = async (data) => {
    try {
      let obj = {};

      obj = {
        ...obj,
        monday: data?.mondayCheck ? getValue12HorseTo24Horse(data?.monday) : [],
        tuesday: data?.tuesdayCheck
          ? getValue12HorseTo24Horse(data?.tuesday)
          : [],
        wednesday: data?.wednesdayCheck
          ? getValue12HorseTo24Horse(data?.wednesday)
          : [],
        thursday: data?.thursdayCheck
          ? getValue12HorseTo24Horse(data?.thursday)
          : [],
        friday: data?.fridayCheck ? getValue12HorseTo24Horse(data?.friday) : [],
        saturday: data?.saturdayCheck
          ? getValue12HorseTo24Horse(data?.saturday)
          : [],
        sunday: data?.sundayCheck ? getValue12HorseTo24Horse(data?.sunday) : [],
      };

      if (!Object.values(obj)?.every((d) => d?.length === 0)) {
        setLoading(true);
        dispatch(updateAvailability(obj));
        setLoading(false);
      } else {
        toast.error("Please select any one day");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getAvailabilityData = async () => {
    await getApi("/doula/get-availability").then((res) => {
      setValue("sundayCheck", res?.data?.doulaAvailability?.sunday?.length > 0);
      setValue(
        "sunday",
        res?.data?.doulaAvailability?.sunday?.length > 0
          ? getValue12HorseTo24Horse(res?.data?.doulaAvailability?.sunday, 0)
          : [{ from: "", to: "" }]
      );
      setValue("mondayCheck", res?.data?.doulaAvailability?.monday?.length > 0);
      setValue(
        "monday",
        res?.data?.doulaAvailability?.monday?.length > 0
          ? getValue12HorseTo24Horse(res?.data?.doulaAvailability?.monday, 0)
          : [{ from: "", to: "" }]
      );
      setValue(
        "tuesdayCheck",
        res?.data?.doulaAvailability?.tuesday?.length > 0
      );
      setValue(
        "tuesday",
        res?.data?.doulaAvailability?.tuesday?.length > 0
          ? getValue12HorseTo24Horse(res?.data?.doulaAvailability?.tuesday, 0)
          : [{ from: "", to: "" }]
      );
      setValue(
        "wednesdayCheck",
        res?.data?.doulaAvailability?.wednesday?.length > 0
      );
      setValue(
        "wednesday",
        res?.data?.doulaAvailability?.wednesday?.length > 0
          ? getValue12HorseTo24Horse(res?.data?.doulaAvailability?.wednesday, 0)
          : [{ from: "", to: "" }]
      );
      setValue(
        "thursdayCheck",
        res?.data?.doulaAvailability?.thursday?.length > 0
      );
      setValue(
        "thursday",
        res?.data?.doulaAvailability?.thursday?.length > 0
          ? getValue12HorseTo24Horse(res?.data?.doulaAvailability?.thursday, 0)
          : [{ from: "", to: "" }]
      );
      setValue("fridayCheck", res?.data?.doulaAvailability?.friday?.length > 0);
      setValue(
        "friday",
        res?.data?.doulaAvailability?.friday?.length > 0
          ? getValue12HorseTo24Horse(res?.data?.doulaAvailability?.friday, 0)
          : [{ from: "", to: "" }]
      );
      setValue(
        "saturdayCheck",
        res?.data?.doulaAvailability?.saturday?.length > 0
      );
      setValue(
        "saturday",
        res?.data?.doulaAvailability?.saturday?.length > 0
          ? getValue12HorseTo24Horse(res?.data?.doulaAvailability?.saturday, 0)
          : [{ from: "", to: "" }]
      );
    });
  };

  const validateToDate = (to, from) => {
    if (!to || !from) return true;
    return (
      new Date(`1970/01/01 ${to}`) > new Date(`1970/01/01 ${from}`) ||
      "To time must be greater than From time"
    );
  };

  useEffect(() => {
    getAvailabilityData();
  }, []);

  return (
    <div>
      <Doulanav />
      <div className="reqlistingcontainer">
        <div>Availability</div>
        <hr />
        <div className="selecttime">
          Select time slots when you are available for booking{" "}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="rowcontainer">
              <div className="d-flex align-items-center gap-1">
                <input type="checkbox" {...register("mondayCheck")} />
                <div className="dayflex"> Monday </div>
              </div>
              <div className="addcalandercontainer">
                {mondayFields?.map((child, ind) => {
                  return (
                    <div className="d-flex">
                      <select
                        {...register(`monday.${ind}.from`, {
                          required: mondayCheck && "From time is required",
                        })}
                      >
                        <option></option>
                        {timesFormate?.map((d) => {
                          return (
                            <option
                              selected={child?.from === d}
                              value={d}
                              key={d}
                            >
                              {d}
                            </option>
                          );
                        })}
                      </select>
                      {errors.monday?.[ind]?.from && (
                        <span className="error">
                          {errors?.monday[ind]?.from?.message}
                        </span>
                      )}
                      -
                      <select
                        {...register(`monday.${ind}.to`, {
                          required: mondayCheck && "To Time is required",
                          validate: (toValue) =>
                            validateToDate(
                              toValue,
                              getValues("monday")[ind]?.from
                            ),
                        })}
                      >
                        <option></option>
                        {timesFormate?.map((d) => {
                          return (
                            <option
                              selected={child?.to === d}
                              value={d}
                              key={d}
                            >
                              {d}
                            </option>
                          );
                        })}
                      </select>
                      {errors.monday?.[ind]?.to && (
                        <span className="error">
                          {errors?.monday?.[ind]?.to?.message}
                        </span>
                      )}
                      {ind !== 0 && (
                        <div
                          className="closeiconspecial"
                          onClick={() => mondayRemove(ind)}
                        >
                          <Image src={closeicon} alt="closeicon" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div
                  className="addmorebutton"
                  onClick={() => mondayAppend({ to: "", from: "" })}
                >
                  + Add
                </div>
              </div>
            </div>
          </div>
          <div className="rowcontainer">
            <div className="d-flex align-items-center gap-1">
              <input type="checkbox" {...register("tuesdayCheck")} />
              <div className="dayflex"> Tuesday </div>
            </div>
            <div className="addcalandercontainer">
              {tuesdayFields?.map((child, ind) => {
                return (
                  <div className="d-flex">
                    <select
                      {...register(`tuesday.${ind}.from`, {
                        required: tuesdayCheck && "From time is required",
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option
                            selected={child?.from === d}
                            value={d}
                            key={d}
                          >
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.tuesday?.[ind]?.from && (
                      <span className="error">
                        {errors?.tuesday[ind]?.from?.message}
                      </span>
                    )}
                    -
                    <select
                      {...register(`tuesday.${ind}.to`, {
                        required: tuesdayCheck && "To Time is required",
                        validate: (toValue) =>
                          validateToDate(
                            toValue,
                            getValues("tuesday")[ind]?.from
                          ),
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option selected={child?.to === d} value={d} key={d}>
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.tuesday?.[ind]?.to && (
                      <span className="error">
                        {errors?.tuesday[ind]?.to?.message}
                      </span>
                    )}
                    {ind !== 0 && (
                      <div
                        onClick={() => tuesdayRemove(ind)}
                        className="closeiconspecial"
                      >
                        <Image src={closeicon} alt="closeicon" />
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="addmorebutton"
                onClick={() => tuesdayAppend({ to: "", from: "" })}
              >
                + Add
              </div>
            </div>
          </div>
          <div className="rowcontainer">
            <div className="d-flex align-items-center gap-1">
              <input type="checkbox" {...register("wednesdayCheck")} />
              <div className="dayflex"> Wednesday </div>
            </div>
            <div className="addcalandercontainer">
              {wednesdayFields?.map((child, ind) => {
                return (
                  <div className="d-flex">
                    <select
                      {...register(`wednesday.${ind}.from`, {
                        required: wednesdayCheck && "From time is required",
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option
                            selected={child?.from === d}
                            value={d}
                            key={d}
                          >
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.wednesday?.[ind]?.from && (
                      <span className="error">
                        {errors?.wednesday[ind]?.from?.message}
                      </span>
                    )}
                    -
                    <select
                      {...register(`wednesday.${ind}.to`, {
                        required: wednesdayCheck && "To Time is required",
                        validate: (toValue) =>
                          validateToDate(
                            toValue,
                            getValues("wednesday")[ind]?.from
                          ),
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option selected={child?.to === d} value={d} key={d}>
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.wednesday?.[ind]?.to && (
                      <span className="error">
                        {errors?.wednesday[ind]?.to?.message}
                      </span>
                    )}
                    {ind !== 0 && (
                      <div
                        onClick={() => wednesdayRemove(ind)}
                        className="closeiconspecial"
                      >
                        <Image src={closeicon} alt="closeicon" />
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="addmorebutton"
                onClick={() => wednesdayAppend({ to: "", from: "" })}
              >
                + Add
              </div>
            </div>
          </div>
          <div className="rowcontainer">
            <div className="d-flex align-items-center gap-1">
              <input type="checkbox" {...register("thursdayCheck")} />
              <div className="dayflex"> Thursday : </div>
            </div>
            <div className="addcalandercontainer">
              {thursdayFields?.map((child, ind) => {
                return (
                  <div className="d-flex">
                    <select
                      {...register(`thursday.${ind}.from`, {
                        required: thursdayCheck && "From time is required",
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option
                            selected={child?.from === d}
                            value={d}
                            key={d}
                          >
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.thursday?.[ind]?.from && (
                      <span className="error">
                        {errors.thursday[ind].from.message}
                      </span>
                    )}
                    -
                    <select
                      {...register(`thursday.${ind}.to`, {
                        required: thursdayCheck && "To Time is required",
                        validate: (toValue) =>
                          validateToDate(
                            toValue,
                            getValues("thursday")[ind]?.from
                          ),
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option selected={child?.to === d} value={d} key={d}>
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.thursday?.[ind]?.to && (
                      <span className="error">
                        {errors?.thursday[ind]?.to?.message}
                      </span>
                    )}
                    {ind !== 0 && (
                      <div
                        onClick={() => thursdayRemove(ind)}
                        className="closeiconspecial"
                      >
                        <Image src={closeicon} alt="closeicon" />
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="addmorebutton"
                onClick={() => thursdayAppend({ to: "", from: "" })}
              >
                + Add
              </div>
            </div>
          </div>
          <div className="rowcontainer">
            <div className="d-flex align-items-center gap-1">
              <input type="checkbox" {...register("fridayCheck")} />
              <div className="dayflex"> Friday </div>
            </div>
            <div className="addcalandercontainer">
              {fridayFields?.map((child, ind) => {
                return (
                  <div className="d-flex">
                    <select
                      {...register(`friday.${ind}.from`, {
                        required: fridayCheck && "From time is required",
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option
                            selected={child?.from === d}
                            value={d}
                            key={d}
                          >
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.friday?.[ind]?.from && (
                      <span className="error">
                        {errors?.friday[ind]?.from?.message}
                      </span>
                    )}
                    -
                    <select
                      {...register(`friday.${ind}.to`, {
                        required: fridayCheck && "To Time is required",
                        validate: (toValue) =>
                          validateToDate(
                            toValue,
                            getValues("friday")[ind]?.from
                          ),
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option selected={child?.to === d} value={d} key={d}>
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.friday?.[ind]?.to && (
                      <span className="error">
                        {errors?.friday[ind]?.to?.message}
                      </span>
                    )}
                    {ind !== 0 && (
                      <div
                        onClick={() => fridayRemove(ind)}
                        className="closeiconspecial"
                      >
                        <Image src={closeicon} alt="closeicon" />
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="addmorebutton"
                onClick={() => fridayAppend({ to: "", from: "" })}
              >
                + Add
              </div>
            </div>
          </div>
          <div className="rowcontainer">
            <div className="d-flex align-items-center gap-1">
              <input type="checkbox" {...register("saturdayCheck")} />
              <div className="dayflex"> Saturday</div>
            </div>
            <div className="addcalandercontainer">
              {saturdayFields?.map((child, ind) => {
                return (
                  <div className="d-flex">
                    <select
                      {...register(`saturday.${ind}.from`, {
                        required: saturdayCheck && "From time is required",
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option
                            selected={child?.from === d}
                            value={d}
                            key={d}
                          >
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.saturday?.[ind]?.from && (
                      <span className="error">
                        {errors?.saturday?.[ind]?.from?.message}
                      </span>
                    )}
                    -
                    <select
                      {...register(`saturday.${ind}.to`, {
                        required: saturdayCheck && "To Time is required",
                        validate: (toValue) =>
                          validateToDate(
                            toValue,
                            getValues("saturday")[ind]?.from
                          ),
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option selected={child?.to === d} value={d} key={d}>
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.saturday?.[ind]?.to && (
                      <span className="error">
                        {errors?.saturday?.[ind]?.to?.message}
                      </span>
                    )}
                    {ind !== 0 && (
                      <div
                        onClick={() => saturdayRemove(ind)}
                        className="closeiconspecial"
                      >
                        <Image src={closeicon} alt="closeicon" />
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="addmorebutton"
                onClick={() => saturdayAppend({ to: "", from: "" })}
              >
                + Add
              </div>
            </div>
          </div>
          <div className="rowcontainer">
            <div className="d-flex align-items-center gap-1">
              <input type="checkbox" {...register("sundayCheck")} />
              <div className="dayflex"> Sunday : </div>
            </div>
            <div className="addcalandercontainer">
              {sundayFields?.map((child, ind) => {
                return (
                  <div className="d-flex">
                    <select
                      {...register(`sunday.${ind}.from`, {
                        required: sundayCheck && "From time is required",
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option
                            selected={child?.from === d}
                            value={d}
                            key={d}
                          >
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.sunday?.[ind]?.from && (
                      <span className="error">
                        {errors?.sunday[ind]?.from?.message}
                      </span>
                    )}
                    -
                    <select
                      {...register(`sunday.${ind}.to`, {
                        required: sundayCheck && "To Time is required",
                        validate: (toValue) =>
                          validateToDate(
                            toValue,
                            getValues("sunday")[ind]?.from
                          ),
                      })}
                    >
                      <option></option>
                      {timesFormate?.map((d) => {
                        return (
                          <option selected={child?.to === d} value={d} key={d}>
                            {d}
                          </option>
                        );
                      })}
                    </select>
                    {errors.sunday?.[ind]?.to && (
                      <span className="error">
                        {errors?.sunday[ind]?.to?.message}
                      </span>
                    )}
                    {ind !== 0 && (
                      <div
                        onClick={() => sundayRemove(ind)}
                        className="closeiconspecial"
                      >
                        <Image src={closeicon} alt="closeicon" />
                      </div>
                    )}
                  </div>
                );
              })}
              <div
                className="addmorebutton"
                onClick={() => sundayAppend({ to: "", from: "" })}
              >
                + Add
              </div>
            </div>
          </div>
          <div className="position-relative saveavailibility">
            <div></div>
            <button disabled={loading}>Save availability</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityList;
