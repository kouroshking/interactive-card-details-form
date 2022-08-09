import React, { useState } from "react";

// components
import Form from "./components/Form/Form";
import CardFront from "./components/CardFront/CardFront";
import CardBack from "./components/CardBack/CardBack";
// images
import bgMainDesktop from "./images/bg-main-desktop.png";
import bgMainMobile from "./images/bg-main-mobile.png";
import completedIcon from "./images/icon-complete.svg";
// styles
import "./styles.css";

const App = () => {
  const [cardAdded, setCardAdded] = useState(false);

  const [cardData, setCardData] = useState({
    cvc: "",
    cardNumber: "",
    cardHolderName: "",
    cardExpYear: "",
    cardExpMonth: "",
  });

  const [error, setError] = useState({
    cardNumber: [false, ""],
    cardHolderName: [false, ""],
    cardExpYear: [false, ""],
    cardExpMonth: [false, ""],
    cvc: [false, ""],
  });

  const validateCardNumber = (cardNumber) => {
    if (!cardNumber) {
      setError((prev) => ({
        ...prev,
        cardNumber: [true, "Card Number is required"],
      }));
      return false;
    }

    cardNumber = cardNumber.replace(/\s/g, "");

    if (cardNumber.length !== 16) {
      setError((prev) => ({
        ...prev,
        cardNumber: [true, "Card Number must be 16 digits"],
      }));
      return false;
    }

    if (cardNumber === "0000000000000000") {
      setError((prev) => ({
        ...prev,
        cardNumber: [
          true,
          "Card Number cannot be 000000000000000 or 0000 0000 0000 0000",
        ],
      }));
      return false;
    }

    if (!cardNumber.match(/[0-9]/g)) {
      setError((prev) => ({
        ...prev,
        cardNumber: [true, "Card Number must be digits only"],
      }));
      return false;
    }

    if (cardNumber.match(/[a-z]/g) || cardNumber.match(/[A-Z]/g)) {
      setError((prev) => ({
        ...prev,
        cardNumber: [true, "Card Number must be digits only"],
      }));
      return false;
    }
    setError((prev) => ({
      ...prev,
      cardNumber: [false, ""],
    }));

    return true;
  };

  const validateCardHolderName = (cardHolderName) => {
    if (!cardHolderName) {
      setError((prev) => ({
        ...prev,
        cardHolderName: [true, "Card Holder Name is required"],
      }));
      return false;
    }

    cardHolderName = cardHolderName.split(" ");

    if (cardHolderName.length < 2) {
      setError((prev) => ({
        ...prev,
        cardHolderName: [
          true,
          "Card Holder Name must be at least 2 words long",
        ],
      }));
      return false;
    }

    if (!cardHolderName[0].match(/[A-Z]/g)) {
      setError((prev) => ({
        ...prev,
        cardHolderName: [
          true,
          "the first name card Holder letter must be uppercase",
        ],
      }));
      return false;
    }

    if (!cardHolderName[1].match(/[A-Z]/g)) {
      setError((prev) => ({
        ...prev,
        cardHolderName: [
          true,
          "the last name card Holder letter must be uppercase",
        ],
      }));
      return false;
    }
    setError((prev) => ({
      ...prev,
      cardHolderName: [false, ""],
    }));

    return true;
  };

  const validateCardExpYear = (cardExpYear) => {
    if (!cardExpYear) {
      setError((prev) => ({
        ...prev,
        cardExpYear: [true, "Card Expiration Year is required"],
      }));
      return false;
    }

    if (cardExpYear.length !== 2) {
      setError((prev) => ({
        ...prev,
        cardExpYear: [
          true,
          "Card Expiration Year must be 2 digits. e.g. 99 for 1999 or 19 for 2019 or 02 for 2002",
        ],
      }));
      return false;
    }

    if (cardExpYear.match(/[a-z]/g) || cardExpYear.match(/[A-Z]/g)) {
      setError((prev) => ({
        ...prev,
        cardExpYear: [true, "Card Expiration Year must be digits only"],
      }));
      return false;
    }
    setError((prev) => ({
      ...prev,
      cardExpYear: [false, ""],
    }));
    return true;
  };

  const validateCardExpMonth = (cardExpMonth) => {
    if (!cardExpMonth) {
      setError((prev) => ({
        ...prev,
        cardExpMonth: [true, "Card Expiration Month is required"],
      }));
      return false;
    }

    if (cardExpMonth.length !== 2) {
      setError((prev) => ({
        ...prev,
        cardExpMonth: [
          true,
          "Card Expiration Month must be 2 digits. e.g. 08 for August or 01 for January or 12 for December",
        ],
      }));
      return false;
    }

    if (cardExpMonth.match(/[a-z]/g) || cardExpMonth.match(/[A-Z]/g)) {
      setError((prev) => ({
        ...prev,
        cardExpMonth: [true, "Card Expiration Year must be digits only"],
      }));
      return false;
    }
    setError((prev) => ({
      ...prev,
      cardExpMonth: [false, ""],
    }));

    return true;
  };

  const validateCVC = (cvc) => {
    if (!cvc) {
      setError((prev) => ({
        ...prev,
        cvc: [true, "CVC is required"],
      }));
      return false;
    }

    if (cvc.length !== 3) {
      setError((prev) => ({
        ...prev,
        cvc: [true, "CVC must be 3 digits"],
      }));
      return false;
    }

    if (cvc === "000") {
      setError((prev) => ({
        ...prev,
        cvc: [true, "CVC cannot be 000"],
      }));
      return false;
    }

    setError((prev) => ({
      ...prev,
      cvc: [false, ""],
    }));
    return true;
  };

  const validateForm = () => {
    const { cvc, cardNumber, cardHolderName, cardExpYear, cardExpMonth } =
      cardData;
    if (!validateCardHolderName(cardHolderName)) return false;
    if (!validateCardNumber(cardNumber)) return false;
    if (!validateCardExpMonth(cardExpMonth)) return false;
    if (!validateCardExpYear(cardExpYear)) return false;
    if (!validateCVC(cvc)) return false;

    if (error.cardNumber[0]) return false;
    if (error.cardHolderName[0]) return false;
    if (error.cardExpYear[0]) return false;
    if (error.cardExpMonth[0]) return false;
    if (error.cvc[0]) return false;

    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // validating data
    const isValid = validateForm();
    // if all data is valid, set cardAdded to true
    if (isValid) {
      setCardAdded(true);
    }
  };

  return (
    <div className="App">
      <img
        className="App-bg-img hide-on-mobile"
        src={bgMainDesktop}
        alt="bg-main-desktop"
      />
      <img
        className="App-bg-img hide-on-desktop"
        src={bgMainMobile}
        alt="bg-main-mobile"
      />

      <CardFront
        cardNumber={cardData.cardNumber}
        cardHolderName={cardData.cardHolderName}
        cardExpYear={cardData.cardExpYear}
        cardExpMonth={cardData.cardExpMonth}
      />
      <CardBack cvc={cardData.cvc} />
      <div className="App-main">
        <div className="App-main-inner">
          {cardAdded ? (
            <div className="completed-box">
              <img src={completedIcon} alt="completed-icon" />
              <div className="box-content">
                <h1 className="box-title">thank you!</h1>
                <p className="box-text">We've Added your card details</p>
              </div>
              <button
                className="completed-box-btn"
                onClick={() => {
                  setCardAdded(false);
                  setCardData({
                    cardNumber: "",
                    cardHolderName: "",
                    cardExpYear: "",
                    cardExpMonth: "",
                    cvc: "",
                  });
                }}
              >
                Continue
              </button>
            </div>
          ) : (
            <Form
              setCardData={setCardData}
              handleFormSubmit={handleFormSubmit}
              error={error}
              setError={setError}
              validateCardNumber={validateCardNumber}
              validateCardHolderName={validateCardHolderName}
              validateCardExpYear={validateCardExpYear}
              validateCardExpMonth={validateCardExpMonth}
              validateCVC={validateCVC}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
