"use client";
import React from "react";
import "./Touch.css";
import arrow from "../../Assets/arrow/Outlined/32/ArrowRight.svg";
import touch1 from "../../Assets/touch1.svg";
import touch2 from "../../Assets/touch2.svg";
import touch3 from "../../Assets/touch3.svg";
import touch4 from "../../Assets/touch4.svg";
import touch5 from "../../Assets/touch5.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Touch = () => {
  const route = useRouter();
  return (
    <>
      <div className="touchcontainer overflow-hidden " id="contact">
        <div className="touchcontainer">
          <div className="toptouch ">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="toplefttouch"
            >
              <div className="touchtitle">Get in touch with us</div>
              <div className="touchdesc">
                Lorem Ipsum is simply dummy text of the printin typesetting
                dummy text ever when an unknown printer took a galley of type
                and scrambled a type specimen book.
              </div>
              <div
                onClick={() => route.push("/listing")}
                className="touchbutton d-flex align-items-center"
              >
                <div className="touchbutontext">More cares</div>
                <Image src={arrow} alt="Cherished beginnings" />
              </div>
            </motion.div>
            <div className="torighttouch">
              <div className="d-flex overflow-hidden">
                <Image
                  className="w-50 h-auto  touch1"
                  src={touch1}
                  alt="Cherished beginnings"
                />
                <Image
                  className="w-50 h-auto  touch2"
                  src={touch2}
                  alt="Cherished beginnings"
                />
              </div>
            </div>
          </div>
          <div className="bottomtouch">
            <div className="d-flex w-50 h-auto  btimageset overflow-hidden">
              <Image
                className="w-50 h-auto  touch3"
                src={touch3}
                alt="Cherished beginnings"
              />
              <Image
                className="w-50 h-auto  touch4"
                src={touch4}
                alt="Cherished beginnings"
              />
            </div>
            {/* <!-- <Image className="w-25" src="Assets/touch2.svg" alt="Cherished beginnings" /> --> */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="d-flex w-50 h-auto  btimageset"
            >
              <div className="w-50 h-auto  p-4 ehseting">
                <div className="btop d-flex gap-2">
                  <span className="edu">Education</span>
                  <span className="health">Health</span>
                </div>
                <div className="bbottom">
                  More than one life <br />
                  changed
                </div>
              </div>
              <Image
                className="w-50 h-auto  touch5"
                src={touch5}
                alt="Cherished beginnings"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Touch;
