import React from "react";

import Input from "./Input/Input";

// styles
import "./style.css";

const Form = ({
  setCardData,
  handleFormSubmit,
  error,
  setError,
  validateCardNumber,
  validateCardHolderName,
  validateCardExpYear,
  validateCardExpMonth,
  validateCVC,
}) => {
  const handleInputChange = (
    e,
    propName,
    validationMethod = function () {
      return true;
    }
  ) => {
    setCardData((prev) => ({
      ...prev,
      [propName]: e.target.value,
    }));

    if (validationMethod(e.target.value)) {
      setError((prev) => ({
        ...prev,
        [propName]: [false, ""],
      }));
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-wrapper-inner">
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <div className="form-section">
              <label htmlFor="fullName">Cardholder Name</label>
              <Input
                error={error.cardHolderName}
                name="cardHolderName"
                type="text"
                placeholder="e.g. Jane Applessed"
                onChange={(e) =>
                  handleInputChange(e, "cardHolderName", validateCardHolderName)
                }
              />
              {error.cardHolderName[0] && (
                <span className="error-message">{error.cardHolderName[1]}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-section">
              <label htmlFor="cardNumber">Card Number</label>

              <Input
                error={error.cardNumber}
                name="cardNumber"
                type="text"
                placeholder="e.g. 1234 5678 9123 0000"
                onChange={(e) =>
                  handleInputChange(e, "cardNumber", validateCardNumber)
                }
              />
              {error.cardNumber[0] && (
                <span className="error-message">{error.cardNumber[1]}</span>
              )}
            </div>
          </div>
          <div className="form-row col-2">
            <div className="form-section">
              <label htmlFor="expDate">EXP. Date(MM,YY)</label>
              <div className="form-row col-2">
                <Input
                  error={error.cardExpMonth}
                  type="number"
                  name="cardExpMonth"
                  min="1"
                  max="12"
                  step="1"
                  placeholder="MM"
                  onChange={(e) =>
                    handleInputChange(e, "cardExpMonth", validateCardExpMonth)
                  }
                />
                <Input
                  error={error.cardExpYear}
                  name="cardExpYear"
                  type="number"
                  min="00"
                  max="99"
                  step="1"
                  placeholder="YY"
                  onChange={(e) =>
                    handleInputChange(e, "cardExpYear", validateCardExpYear)
                  }
                />
              </div>
              {error.cardExpMonth[0] && (
                <>
                  <span className="error-message">{error.cardExpMonth[1]}</span>
                  <br />
                </>
              )}

              {error.cardExpYear[0] && (
                <span className="error-message">{error.cardExpYear[1]}</span>
              )}
            </div>
            <div className="form-section">
              <label htmlFor="cvc">CVC</label>

              <Input
                error={error.cvc}
                name="cvc"
                type="number"
                min="100"
                max="999"
                placeholder="e.g. 123"
                onChange={(e) => handleInputChange(e, "cvc", validateCVC)}
              />
              {error.cvc[0] && (
                <span className="error-message">{error.cvc[1]}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-section">
              <button className="form-btn" type="submit">
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
