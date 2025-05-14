"use client";
import { getApi, postApi } from "@/Redux/api";
import { errorMeg, successMeg } from "@/modules/utils";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import card from "../../../Assets/settings/creditcard.svg";
import creditgrp from "../../../Assets/settings/creditgrp.svg";
import otherpaymentimg from "../../../Assets/settings/otherpaymentimg.svg";
import "./paymentmethod.css";
import CommonLoader from "@/Components/common/Loader";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY);

export const CustomCardElement = () => {
  return (
    <div
      style={{
        border: "1px solid #eaecef",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#db4437",
          fontWeight: "bold",
        }}
      >
        Credit / Debit Card
      </label>
      <div style={{ marginBottom: "16px" }}>
        <CardNumberElement
          onChange={handleCardNumberChange}
          options={CARD_ELEMENT_OPTIONS}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div style={{ flex: 1 }}>
          <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <div style={{ flex: 1 }}>
          <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
    </div>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export const StripePayment = () => {
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [cardBrand, setCardBrand] = useState();
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectCardMethod, setSelectCardMethod] = useState(1);
  const [show, setShow] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleShowAddCardModal = () => setShow(true);
  const handleCloseAddCardModal = () => setShow(false);

  const { user } = useSelector((state) => ({
    user: state?.getUserProfile?.data,
  }));

  const handleSubmit = async () => {
    try {
      setCardLoading(true);
      if (!stripe || !elements) {
        setCardLoading(false);
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: user?.first_name + " " + user?.last_name,
        },
      });

      if (error) {
        setCardLoading(false);
        errorMeg(error?.message);
      } else {
        const response = await postApi("/payment/addCard", {
          paymentMethodId: paymentMethod.id,
        });

        if (response.data?.success) {
          successMeg(response?.data?.messaeg);
          handleCloseAddCardModal();
          getPaymentMethod();
        } else {
          errorMeg("Failed to add card.");
        }
        setCardLoading(false);
      }
    } catch (error) {
      setCardLoading(false);
    }
  };

  const getPaymentMethod = async () => {
    await getApi("/payment/paymentMethods").then((res) => {
      setPaymentMethodList(res?.data?.paymentMethod);
      setLoading(false);
    });
  };

  const getDefaultPayment = async (id) => {
    await getApi("/payment/paymentMethod/default/" + id).then((res) => {
      if (res?.data?.success) {
        successMeg(res?.data?.message);
        getPaymentMethod();
      }
    });
  };

  const deletePaymentMethod = async (id) => {
    setDeleteLoading(true);
    await getApi(`/payment/paymentMethod/remove/${id}`).then((res) => {
      if (res?.data?.success) {
        successMeg(res?.data?.message);
        getPaymentMethod();
      }
      setDeleteLoading(false);
    });
  };

  useEffect(() => {
    getPaymentMethod();
  }, []);

  return (
    <>
      {/* add card modal start */}
      <Modal
        className="custommodalwidth"
        centered
        show={show}
        onHide={handleCloseAddCardModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-0">
          <div className="savecardmodalbody">
            <div className="addcardtitle">Save a card</div>
            <div>
              <label
                htmlFor="creditdebitcard"
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    checked={+selectCardMethod === 1}
                    onChange={(e) => setSelectCardMethod(e?.target?.value)}
                    value={1}
                    name="creditinput"
                    id="creditdebitcard"
                  />
                  <div className="d-flex flex-column gap-1">
                    <div className="creditinputradotitle">
                      Credit / Debit Card
                    </div>
                    <div className="creditinputradodesc">
                      Pay with your Credit / Debit Card
                    </div>
                  </div>
                </div>
                {/* <Image src={creditgrp} alt="creditgrp image" /> */}
              </label>
            </div>
            <div className="creditinputbox d-flex flex-column gap-2">
              <div className="position-relative ">
                <CardElement />
              </div>
            </div>
            <div>
              <label
                htmlFor="banktransfer"
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    value={2}
                    type="radio"
                    disabled={true}
                    checked={+selectCardMethod === 2}
                    onChange={(e) => setSelectCardMethod(e?.target?.value)}
                    name="creditinput"
                    id="banktransfer"
                  />
                  <div className="d-flex flex-column gap-1">
                    <div className="creditinputradotitle">
                      Direct Bank Transfer
                    </div>
                    <div className="creditinputradodesc">
                      Make payment directly through bank account.
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
                  <input
                    value={3}
                    type="radio"
                    disabled={true}
                    checked={+selectCardMethod === 3}
                    onChange={(e) => setSelectCardMethod(e?.target?.value)}
                    name="creditinput"
                    id="othermethod"
                  />
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
                disabled={
                  cardLoading || +selectCardMethod === 1 ? !stripe : false
                }
                onClick={handleSubmit}
              >
                {cardLoading ? (
                  <div
                    className="spinner-border"
                    color="#9e4b34"
                    role="status"
                  ></div>
                ) : (
                  "Add Card"
                )}
              </button>
            </div>
            <div className="paymentsecuredesc">
              All payment info is encrypted and stored securely by braintree, a
              paypal service. we do not store your payment info on our server
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* add card modal end */}

      {loading ? (
        <CommonLoader />
      ) : paymentMethodList?.length === 0 ? (
        <>
          <div className="paymentountcontainer">
            <div>Payment method</div>
            <div>
              <hr />
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="addcard">Add card</div>
              <div className="addcarddesc">
                Make fast & easy payments. Save a card to use refills and keep
                weekly lessons reserved automatically <br />
                Payment info is encrypted and stored securely by Braintree, a
                PayPal service
              </div>

              <div className="paymentbtngrp">
                <button
                  disabled={loading}
                  onClick={handleShowAddCardModal}
                  className="savesettingbtn"
                >
                  {loading ? (
                    <div
                      className="spinner-border"
                      color="#9e4b34"
                      role="status"
                    ></div>
                  ) : (
                    "Add card"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="paymentountcontainer">
            <div>Payment method</div>
            <div>
              <hr />
            </div>
            {paymentMethodList?.map((d) => {
              return (
                <div className="savecardparentdiv">
                  <div
                    onClick={() => !d?.isDefault && getDefaultPayment(d?.id)}
                    className={`d-flex align-items-center justify-content-between savecardcontainer ${
                      d?.isDefault ? "active-savecardcontainer" : ""
                    }`}
                  >
                    <div className="d-flex flex-column gap-1">
                      <div className="creditinputradodesc">Card number</div>
                      <div className="creditinputradotitle">
                        **** **** **** {d?.card?.last4}
                      </div>
                    </div>
                    <div>
                      <Image src={creditgrp} alt="Cherished beginnings" />
                    </div>
                  </div>
                  <div className="removecardtext">
                    <Link
                      href="#"
                      onClick={() => deletePaymentMethod(d?.id)}
                      disabled={deleteLoading}
                    >
                      Remove card
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="addmorecardtext" onClick={handleShowAddCardModal}>
            +Add more card
          </div>
        </>
      )}
    </>
  );
};

const StripeWrapper = () => (
  <Elements stripe={stripePromise}>
    <StripePayment />
  </Elements>
);

export default StripeWrapper;
