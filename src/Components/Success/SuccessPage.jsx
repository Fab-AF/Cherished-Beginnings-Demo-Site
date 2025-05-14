import React from "react";
import "./success.css";
import successIcon from "../../Assets/settings/success-icon.svg";
import downloadIcon from "../../Assets/settings/download-icon.svg";
import Image from "next/image";
import moment from "moment";

const SuccessPage = ({ data }) => {
  return (
    <div className="payment-success-card">
      <div className="success-icon">
        <Image src={successIcon} alt="Success Icon" />
      </div>
      <h2>Payment Success!</h2>
      <p>Your service with Aakash has been successfully done.</p>
      <div className="total-payment">
        <h3>Total Payment</h3>
        <h1>{data?.amount || 0}</h1>
      </div>
      <div className="payment-details">
        <div className="detail">
          <p>Ref Number</p>
          <span>{data?.ref_id || "-"}</span>
        </div>
        <div className="detail">
          <p>Payment Time</p>
          <span>
            {data?.time ? moment(data?.time).format("DD MMM YYYY, HH:mm") : "-"}
          </span>
        </div>
        <div className="detail">
          <p>Payment Method</p>
          <span>{data?.paymentMethod || "-"}</span>
        </div>
        <div className="detail">
          <p>Sender Name</p>
          <span>{data?.senderName || "-"}</span>
        </div>
      </div>
      <a
        href={data?.receipt_url}
        target="_blank"
        download
        className="download-icon"
      >
        <Image src={downloadIcon} alt="Download Icon" />
        Get PDF Receipt
      </a>
    </div>
  );
};

export default SuccessPage;
