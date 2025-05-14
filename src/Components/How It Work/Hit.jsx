"use client";
import React from "react";
import "./Hit.css";
import hit from "../../Assets/howitwork.svg";
import hiticon1 from "../../Assets/hiticon1.svg";
import hiticon2 from "../../Assets/hiticon2.svg";
import hiticon3 from "../../Assets/hiticon3.svg";
import hiticon4 from "../../Assets/hiticon4.svg";
import hiticon5 from "../../Assets/hiticon5.svg";
import { motion } from "framer-motion";
import Image from "next/image";

const Hit = () => {
  return (
    <>
      <div className="hitcontainer overflow-hidden">
        <div className="hitbgcontainer d-flex justify-content-center align-items-center">
          {/* <Image
            className="hitbg position-absolute"
            src={hit}
          /> */}
          <div className="hitbg">
            <div className="position-relative z-2 hitcontent">
              <div className="hitleft d-flex flex-column align-items-start gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="hittitle"
                >
                  How it works
                </motion.div>

                <div className="hitstep d-flex flex-column gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0 }}
                    viewport={{ once: true }}
                    className="hitstep1 d-flex justify-content-center align-items-center gap-3"
                  >
                    <div className="hitstepleft">
                      <Image className="hitstepiconset" src={hiticon1} alt="Cherished beginnings" />
                    </div>
                    <div className="hitstepright d-flex flex-column gap-2">
                      <div className="hitsteptitle">Browse nearby caregivers</div>
                      <div className="hitstepdesc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="hitstep1 d-flex justify-content-center align-items-center gap-3"
                  >
                    <div className="hitstepleft">
                      <Image className="hitstepiconset" src={hiticon2} alt="Cherished beginnings" />
                    </div>
                    <div className="hitstepright d-flex flex-column gap-2">
                      <div className="hitsteptitle">
                        Helping you find the right fit
                      </div>
                      <div className="hitstepdesc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="hitstep1 d-flex justify-content-center align-items-center gap-3"
                  >
                    <div className="hitstepleft">
                      <Image className="hitstepiconset" src={hiticon3} alt="Cherished beginnings" />
                    </div>
                    <div className="hitstepright d-flex flex-column gap-2">
                      <div className="hitsteptitle">
                        Prepare you mentally and emotionally for childbirth
                      </div>
                      <div className="hitstepdesc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="hitstep1 d-flex justify-content-center align-items-center gap-3"
                  >
                    <div className="hitstepleft">
                      <Image className="hitstepiconset" src={hiticon4} alt="Cherished beginnings" />
                    </div>
                    <div className="hitstepright d-flex flex-column gap-2">
                      <div className="hitsteptitle">
                        Provide physical support during labor.
                      </div>
                      <div className="hitstepdesc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="hitstep1 d-flex justify-content-center align-items-center gap-3"
                  >
                    <div className="hitstepleft">
                      <Image className="hitstepiconset" src={hiticon5} alt="Cherished beginnings" />
                    </div>
                    <div className="hitstepright d-flex flex-column gap-2">
                      <div className="hitsteptitle">
                        Prepare you mentally and emotionally for childbirth
                      </div>
                      <div className="hitstepdesc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <Image
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="hitimgset"
                src={hit}
                alt="Cherished beginnings"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hit;