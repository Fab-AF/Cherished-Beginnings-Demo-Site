import Find from "@/Components/Find/Find";
import Hero from "@/Components/Hero/Hero";
import Hit from "@/Components/How It Work/Hit";
import Near from "@/Components/Near center/Near";
import Service from "@/Components/Service Section/Service";
import Testimonial from "@/Components/Testimonial/Testimonial";
import Touch from "@/Components/Touch/Touch";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <Service />
      <Hit />
      <Testimonial />
      {/* <Find /> */}  
      <Find />
      <Near />
      <Touch />
    </>
  );
};

export default Home;
