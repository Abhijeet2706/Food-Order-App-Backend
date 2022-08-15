import React, { useRef, useState } from "react";
import "./Checkout.css";

//helper function to validate

const isEmpty = (value) => value.trim().length === 0;
const isSixChar = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enterdName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const enterdNameIsValid = !isEmpty(enterdName);
    const enterdStreetIsValid = !isEmpty(enteredStreet);
    const enterdCityIsValid = !isEmpty(enteredCity);
    const enterdPostalIsValid = isSixChar(enteredPostal);

    setFormInputValidity({
      name: enterdNameIsValid,
      street: enterdStreetIsValid,
      city: enterdCityIsValid,
      postal: enterdPostalIsValid,
    });

    const formIsValid =
      enterdNameIsValid &&
      enterdStreetIsValid &&
      enterdCityIsValid &&
      enterdPostalIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enterdName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
    // props.onClose();
  };
  console.log("formInputsValidity", formInputsValidity);
  return (
    <form onSubmit={confirmHandler} className="form">
      <div className={`control ${formInputsValidity.name ? "" : "invalid"}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`control ${formInputsValidity.street ? "" : "invalid"}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street !</p>}
      </div>
      <div className={`control ${formInputsValidity.postal ? "" : "invalid"}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please enter a valid Postal code(it should be 6 char) !</p>
        )}
      </div>
      <div className={`control ${formInputsValidity.city ? "" : "invalid"}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city name!</p>}
      </div>
      <div className="actions">
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
