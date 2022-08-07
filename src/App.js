import React, { useEffect, useState } from "react";

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
  const [isThereError, setIsThereError] = useState(false);

  const [cardData, setCardData] = useState({
    cvc: "",
    cardNumber: "",
    cardHolderName: "",
    cardExpYear: "",
    cardExpMonth: "",
  });

  const [isOneFieldEmpty, setIsOneFieldEmpty] = useState(true);

  const [error, setError] = useState({
    cardNumber: [false, ""],
    cardHolderName: [false, ""],
    cardExpYear: [false, ""],
    cardExpMonth: [false, ""],
    cvc: [false, ""],
  });

  const validateCVC = (cvc) => {
    if (!cvc) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cvc: [true, "CVC is required"],
      }));
    }

    if (cvc.length !== 3) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cvc: [true, "CVC must be 3 digits"],
      }));
    }

    if (cvc === "000") {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cvc: [true, "CVC cannot be 000"],
      }));
    }
  };

  const validateCardNumber = (cardNumber) => {
    if (!cardNumber) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardNumber: [true, "Card Number is required"],
      }));
    }

    cardNumber = cardNumber.replace(/\s/g, "");

    if (cardNumber.length !== 16) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardNumber: [true, "Card Number must be 16 digits"],
      }));
    }

    if (cardNumber === "0000000000000000") {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardNumber: [
          true,
          "Card Number cannot be 000000000000000 or 0000 0000 0000 0000",
        ],
      }));
    }

    if (!cardNumber.match(/[0-9]/g)) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardNumber: [true, "Card Number must be digits only"],
      }));
    }

    if (cardNumber.match(/[a-z]/g) || cardNumber.match(/[A-Z]/g)) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardNumber: [true, "Card Number must be digits only"],
      }));
    }
  };

  const validateCardHolderName = (cardHolderName) => {
    if (!cardHolderName) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardHolderName: [true, "Card Holder Name is required"],
      }));
    }

    cardHolderName = cardHolderName.split(" ");

    if (cardHolderName.length < 2) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardHolderName: [
          true,
          "Card Holder Name must be at least 2 words long",
        ],
      }));
    }

    if (!cardHolderName[0].match(/[A-Z]/g)) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardHolderName: [
          true,
          "the first name card Holder letter must be uppercase",
        ],
      }));
    }

    if (!cardHolderName[1].match(/[A-Z]/g)) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardHolderName: [
          true,
          "the last name card Holder letter must be uppercase",
        ],
      }));
    }
  };

  const validateCardExpYear = (cardExpYear) => {
    if (!cardExpYear) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardExpYear: [true, "Card Expiration Year is required"],
      }));
    }

    if (cardExpYear.length !== 2) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardExpYear: [
          true,
          "Card Expiration Year must be 2 digits. e.g. 99 for 1999 or 19 for 2019",
        ],
      }));
    }

    if (cardExpYear.match(/[a-z]/g) || cardExpYear.match(/[A-Z]/g)) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardExpYear: [true, "Card Expiration Year must be digits only"],
      }));
    }
  };

  const validateCardExpMonth = (cardExpMonth) => {
    if (!cardExpMonth) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardExpMonth: [true, "Card Expiration Month is required"],
      }));
    }

    if (cardExpMonth.length !== 2) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardExpMonth: [
          true,
          "Card Expiration Month must be 2 digits. e.g. 08 for August or 01 for January or 12 for December",
        ],
      }));
    }

    if (cardExpMonth.match(/[a-z]/g) || cardExpMonth.match(/[A-Z]/g)) {
      setIsThereError(true);
      return setError((prev) => ({
        ...prev,
        cardExpMonth: [true, "Card Expiration Year must be digits only"],
      }));
    }
  };

  const validateForm = () => {
    const { cvc, cardNumber, cardHolderName, cardExpYear, cardExpMonth } =
      cardData;
    validateCVC(cvc);
    validateCardNumber(cardNumber);
    validateCardHolderName(cardHolderName);
    validateCardExpYear(cardExpYear);
    validateCardExpMonth(cardExpMonth);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // validating data

    validateForm();
    // if all data is valid, set cardAdded to true
    if (
      !isOneFieldEmpty &&
      !isThereError &&
      !error.cardNumber[0] &&
      !error.cardHolderName[0] &&
      !error.cardExpYear[0] &&
      !error.cardExpMonth[0] &&
      !error.cvc[0]
    ) {
      setCardAdded(true);
    }
  };

  useEffect(() => {
    let anyError = false;
    for (let key in error) {
      if (error[key][0]) {
        anyError = true;
      }
    }
    if (anyError) {
      setIsThereError(true);
    } else {
      setIsThereError(false);
    }

    let isOneFieldEmpty = false;

    for (let key in cardData) {
      if (!cardData[key]) {
        isOneFieldEmpty = true;
      }
    }

    setIsOneFieldEmpty(isOneFieldEmpty);
  }, [error, cardData]);

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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
