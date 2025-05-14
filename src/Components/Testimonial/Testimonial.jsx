"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "./Testimonial.css"; // Assuming you have your CSS file
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import user1 from "../../Assets/test1.svg";
import user2 from "../../Assets/test2.svg";
import previous from "../../../src/Assets/arrow/Outlined/32/previcon.png";
import next from "../../../src/Assets/arrow/Outlined/32/nexticon.png";
import coma from "../../../src/Assets/arrow/coma.png";
import Image from "next/image";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      avtar: user1,
      name: "Belli Smith",
      text: "Centuries but also the leap into electronic typesetting, established fact that a reader will be distracted by the readable content.",
      comma:coma
    },
    {
      id: 2,
      avtar: user2,
      name: "Sara Taylor",
      text: "Centuries but also the leap into electronic typesetting, established fact that a reader will be distracted by the readable content.",
      comma:coma

    },
    {
      id: 3,
      avtar: user1,
      name: "Belli ",
      text: "Centuries but also the leap into electronic typesetting, established fact that a reader will be distracted by the readable content.",
      comma:coma

    },
    {
      id: 4,
      avtar: user2,
      name: "asd ",
      text: "Centuries but also the leap into electronic typesetting, established fact that a reader will be distracted by the readable content.",
      comma:coma

    },
    // Add more testimonials as needed
  ]);
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image src={next} alt="Next" />
      </div>
    );
  };
  
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image src={previous} alt="Previous" />
      </div>
    );
  };
  const settings = {
    
    // centerMode: true,
    // infinite: true,
    // speed: 500,
    // dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 1500,
    autoplaySpeed: 0,
    cssEase: "linear",
    swipeToSlide: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="testimonial-container">
      <h2>What people say about us</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <Image src={testimonial.comma} alt={testimonial.comma} className="comma" />
            <Image src={testimonial.avtar} alt={testimonial.name} className="testimonial-avatar" />
            <div className="testimonial-content">
              <h3>{testimonial.name}</h3>
              <p>{testimonial.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;

