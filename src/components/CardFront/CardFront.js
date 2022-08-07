import React from "react";

// images
import FrontCardImage from "../../images/bg-card-front.png";
// style
import "./style.css";

const CardFront = ({
  cardNumber,
  cardHolderName,
  cardExpYear,
  cardExpMonth,
}) => {
  if (!cardNumber) {
    cardNumber = "0000 0000 0000 0000";
  }

  if (!cardHolderName) {
    cardHolderName = "JANE APPLESEED";
  }

  if (!cardExpYear) {
    cardExpYear = "00";
  }

  if (!cardExpMonth) {
    cardExpMonth = "00";
  }

  cardNumber = (() => {
    let separatedDigits = "";
    const number = cardNumber.replace(/\s/g, "").split("");
    for (let i = 0; i < number.length; i++) {
      if (i % 4 === 0) {
        separatedDigits += " ";
      }

      separatedDigits += number[i];
    }

    return separatedDigits;
  })();

  return (
    <div className="card-front">
      <img className="card-front-bg" src={FrontCardImage} alt="bg-card-front" />

      <div className="card-header">
        <div className="circle-fill"></div>
        <div className="circle"></div>
      </div>

      <div className="card-number">{cardNumber}</div>

      <div className="card-footer">
        <div className="card-name">
          <p>{cardHolderName}</p>
        </div>
        <div className="card-exp-date">
          <p>
            {cardExpMonth}/{cardExpYear}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFront;
