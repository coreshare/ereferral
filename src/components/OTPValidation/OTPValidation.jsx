import React,{useState} from "react";
import "./OTPValidation.css";
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import { validateOTP } from "../../Services/api";
import ModalDialog from "../ModalDialog/ModalDialog";

const OTPValidation = ({ onNext, otp }) => {
  const [enteredOTP, setEnteredOTP] = useState(Array(6).fill(""));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCloseButton,setShowCloseButton] = useState(true);
  const [modalText, setModalText] = useState("");
  //const [otpValues, setOtpValues] = useState(Array(6).fill(""));

  const handleKeyDown = (event, index) => {
    if (/^[0-9]$/.test(event.key) && index < 5) {
      const nextInput = event.target.parentElement.querySelector(
        `input:nth-child(${index + 2})`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  const handleTextboxChange = (event, index) => {
    var newValue = event.target.value;
    //const newValue = parseInt(event.target.value, 10);
    //if (!isNaN(newValue)) {
    setEnteredOTP((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
    //}
    //else{
    //  setEnteredOTP([]);
    //}
  };
  
  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  const handleOTPValidation = async () => {
    debugger;
    const concatenatedNumberString = enteredOTP.map(String).join("");
    //const concatenatedNumber = parseInt(concatenatedNumberString, 10);
    //if(concatenatedNumber != "NaN" && concatenatedNumber.toString().length == 6){
    if(concatenatedNumberString.length == 6){
      openModal();
      setShowCloseButton(false);
      setModalText("Validating OTP... Please wait.");
      var response = "Success";//await validateOTP(concatenatedNumberString);//"Success";//checkonce
      if(response == "Success"){
          closeModal();
          onNext();
      }
      else{
          closeModal();
          alert(response)
      }
    }
    else{
      openModal();
      setShowCloseButton(true);
      setModalText("Enter valid OTP");
    }
  };

  return (
    <div className="OTPValidation">
      <center>
        <p>Please enter the six digit code sent to your email address</p>
        <p>
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              onKeyUp={(event) => handleKeyDown(event, index)}
              onChange={(event) => handleTextboxChange(event, index)}
            />
          ))}
        </p>
        <p><ButtonCtrl btnText="Send" btnClickHandler={handleOTPValidation} /></p>
        <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
          <p>{modalText}</p>
        </ModalDialog>
      </center>
    </div>
  );
};

export default OTPValidation;
