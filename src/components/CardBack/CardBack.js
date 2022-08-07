import React from "react";

// images
import BackCardImage from "../../images/bg-card-back.png";
// style
import "./style.css";

const CardBack = ({ cvc }) => {
  if (!cvc) {
    cvc = "000";
  }

  return (
    <div className="card-back">
      <img className="card-back-bg" src={BackCardImage} alt="bg-card-back" />

      <div className="cvc-number">
        <p>{cvc}</p>
      </div>
    </div>
  );
};

export default CardBack;
