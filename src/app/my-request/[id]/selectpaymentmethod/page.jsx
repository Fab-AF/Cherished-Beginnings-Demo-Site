"use client";
import Usernav from "@/Components/Usernav/Usernav";
import "./selectpayment.css";
import React, { useState } from "react";
import Image from "next/image";
import creditgrp from "../../../../Assets/settings/creditgrp.svg";
import stargrpimg from "../../../../Assets/settings/stargrp.svg";
import otherpaymentimg from "../../../../Assets/settings/otherpaymentimg.svg";
import userprofile from "../../../../Assets/settings/userprofile.svg";
import lock from "../../../../Assets/settings/locak.svg";
import calander from "../../../../Assets/settings/calander.svg";
import card from "../../../../Assets/settings/creditcard.svg";
import paymentsuccess from "../../../../Assets/settings/paymentsuccess.svg";
import downloapdfdbutton from "../../../../Assets/settings/Downloadpdf.svg";
import { Modal } from "react-bootstrap";

const page = () => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleShowPaymentPopup = () => setShowAddCardModal(true);
  const handleClosePaymentPopup = () => setShowAddCardModal(false);
  const handleOpenSuccessModal = () => {
    setShowAddCardModal(false);
    setShowSuccessModal(true);
  };
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  return (
    <>
      {/* payment success start */}
      <Modal centered show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-0">
          <div className="savecardmodalbody paymentsuceesmodalbody">
            <div className="d-flex flex-column align-items-center gap-1 justify-content-center">
              <Image src={paymentsuccess} alt="Cherished beginnings" />
              <div className="addcardtitle text-center">Payment Success</div>
            </div>
            <div className="text-center">
              Your service with Aakash has been successfully done.
            </div>
            <hr />
            <div className="text-center">Total Payment</div>
            <div className="text-center thanksamount">$20</div>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3 justify-content-center ">
                <div className="refparent w-100">
                  <div className="refno">RefNO</div>
                  <div>123456789</div>
                </div>
                <div className="refparent w-100">
                  <div className="refno">RefNO</div>
                  <div>123456789</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 justify-content-center ">
                <div className="refparent w-100">
                  <div className="refno">RefNO</div>
                  <div>123456789</div>
                </div>
                <div className="refparent w-100">
                  <div className="refno">RefNO</div>
                  <div>123456789</div>
                </div>
              </div>
            </div>
            <Image src={downloapdfdbutton} alt="Cherished beginnings" className=" downloadbutton" />
          </div>
        </Modal.Body>
      </Modal>

      {/* payment success end */}
      {/* add card modal start */}
      <Modal centered show={showAddCardModal} onHide={handleClosePaymentPopup}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-0">
          <div className="savecardmodalbody">
            <div className="addcardtitle">Complete payment to book doula</div>

            <div>
              <label className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex flex-column gap-1">
                    <div className="creditinputradotitle">
                      Pay with your Credit / Debit Card{" "}
                    </div>
                  </div>
                </div>
                <Image src={creditgrp} alt="creditgrp image" />
              </label>
            </div>
            <div className="creditinputbox d-flex flex-column gap-2">
              <div className="position-relative ">
                <input type="text" placeholder="Card number" />
                <Image src={card} alt="Cherished beginnings" />
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="position-relative">
                  <input type="text" placeholder="MM/YY" />
                  <Image src={calander} alt="Cherished beginnings" />
                </div>
                <div className="position-relative">
                  <input type="text" placeholder="CVV" />
                  <Image src={lock} alt="Cherished beginnings" />
                </div>
              </div>
            </div>
            <label
              htmlFor="savecard"
              className="d-flex align-items-center gap-1 "
            >
              <input type="checkbox" name="" id="savecard" />
              <div> Save this card for a faster checkout next time </div>
            </label>
            <div className="d-flex justify-content-center">
              <button
                className="addcardbutton w-100"
                onClick={() => {
                  handleClosePaymentPopup();
                  handleOpenSuccessModal();
                }}
              >
                Pay & book:20$
              </button>
            </div>
            <div className="paymentsecuredesc">
              By clicking “Pay& book doula”, you agree to cherished beginning
              Refund policies
            </div>
            <div className="paymentsecuredesc">
              <hr />
              Payments details are encrypted and securely processed by our
              provider-brain tree. a PayPal service. we do not store or collect
              personal data from payment transactions
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* add card modal end */}
      <Usernav currentPath="/my-requests" />
      <div className="d-flex justify-content-between gap-3 spmaincontainer">
        <div className="spaymentleftcard bookingsummury">
          <div className="d-flex gap-3 align-items-center">
            <Image src={userprofile} alt="Cherished beginnings" />
            <div>
              <div className="spprofilename">Aakash</div>
              <div className="spprofileexperience">3years of Experience</div>
              <div className="spprofileexperience d-flex mt-1">
                <div>4.0</div>
                <Image src={stargrpimg} alt="Cherished beginnings" />
                <div>(7 reviews)</div>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div className="spservicedetail">Date & Time</div>
            <div>Wednesday, January5,6 | 10:00pm</div>
          </div>
          <hr />
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="spservicedetail">Service detail</div>
              <div className="spservicedetail">Price per hour</div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="spnomalsd">1 hour</div>
              <div className="spnomalsd">$15</div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="spnomalsd">Transaction fee</div>
              <div className="spnomalsd">$5</div>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="sptotalamount">Total amount</div>
            <div className="sptotalamount">$20</div>
          </div>
        </div>

        <div className="spaymentrightcard">
          <div className="savecardmodalbody">
            <div className="addcardtitle">Select payment method</div>
            <div>
              <label
                htmlFor="creditdebitcard"
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" name="creditinput" id="creditdebitcard" />
                  <div className="d-flex flex-column gap-1">
                    <div className="creditinputradotitle">
                      Credit/Debit Cards{" "}
                    </div>
                    <div className="creditinputradodesc">
                      Pay with your Credit / Debit Card
                    </div>
                  </div>
                </div>
                <Image src={creditgrp} alt="creditgrp image" />
              </label>
            </div>

            <div>
              <label
                htmlFor="banktransfer"
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" name="creditinput" id="banktransfer" />
                  <div className="d-flex flex-column gap-1">
                    <div className="creditinputradotitle">
                      Direct Bank Transfer{" "}
                    </div>
                    <div className="creditinputradodesc">
                      Make payment directly through bank account.{" "}
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div>
              <label
                htmlFor="othermethod"
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-2">
                  <input type="radio" name="creditinput" id="othermethod" />
                  <div className="d-flex flex-column gap-1">
                    <div className="creditinputradotitle">
                      Other Payment Methods
                    </div>
                    <div className="creditinputradodesc">
                      Make payment through Gpay, Paypal, Paytm etc
                    </div>
                  </div>
                </div>
                <Image src={otherpaymentimg} alt="creditgrp image" />
              </label>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="addcardbutton w-100"
                onClick={handleShowPaymentPopup}
              >
                Continue
              </button>
            </div>
            <div className="paymentsecuredesc">
              All payment info is encrypted and stored securely by braintree, a
              paypal service. we do not store your payment info on our server
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
