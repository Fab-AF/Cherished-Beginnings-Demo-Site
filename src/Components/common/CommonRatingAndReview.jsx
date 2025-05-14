import React, { useState } from "react";
import CommonRating from "@/Components/common/CommonRating";
import { postApi } from "@/Redux/api";

const CommonRatingAndReview = ({ onClose, id, getDoulaDetailsData }) => {
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await postApi(`/doula/add-ratings/${id}`, {
        ratings: rating,
        description: message,
      }).then((res) => {
        if (res?.data?.success) {
          onClose();
          getDoulaDetailsData()
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form>
      <div className="contactpopup d-flex justify-content-center align-items-center flex-column gap-4">
        <div>Ratting and Review</div>
        <div className="d-flex justify-content-center align-items-center gap-2 popupreviewsection">
          <CommonRating onChange={(value) => setRating(value)} value={rating} />
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e?.target?.value)}
          placeholder="Enter your  review"
        />
        <button onClick={onSubmit} disabled={loading}>
          {loading ? (
            <div className="spinner-border" color="#9e4b34" role="status"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default CommonRatingAndReview;
