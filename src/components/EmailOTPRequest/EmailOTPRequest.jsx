import React,{useState} from "react"
import TextBoxCtrl from "../TextBoxCtrl/TextBoxCtrl";
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import ModalDialog from "../ModalDialog/ModalDialog";
import { validateDomain, generateOTP } from "../../Services/api";
import { useDispatch } from "react-redux";
import { setUserValidationStep } from "../UserValidation/UserValidationSlice";

const EmailOTPRequest = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [modalText, setModalText] = useState("");
    const [showCloseButton,setShowCloseButton] = useState(true)
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const dispatch = useDispatch()

    const handleEmailOTPRequest = async () =>{
        if(email == "" || !(emailPattern.test(email))){
            setShowCloseButton(true)
            setModalText("Enter valid email address")
            openModal();
            return;
        }
        else{
            const atIndex = email.indexOf("@");
            var domain = "";
            if (atIndex !== -1) {
                domain = email.slice(atIndex + 1);
            }
            setShowCloseButton(false)
            setModalText("Validating email... Please wait.")
            openModal();
            var isValid = await validateDomain(domain);
            if(isValid==undefined || isValid == "Not valid"){
                setShowCloseButton(true)
                setModalText("Entered email is not valid.")
                //openModal();
                return;
            }
            else{
                setShowCloseButton(false)
                setModalText("Sending OTP... Please wait.")
                //openModal();
                await generateOTP(email);
                closeModal();
                dispatch(setUserValidationStep(1))
            }
        }
        //generate otp
        //onNext();
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onChangeText = (email) => {
        setEmail(email)
    }

    return(
        <div>
            <center>
                <p><TextBoxCtrl placeholdertext="Enter email address" onChangeText={onChangeText} /></p>
                <p><ButtonCtrl btnText="Send" btnClickHandler={handleEmailOTPRequest} /></p>
            </center>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
                <p>{modalText}</p>
            </ModalDialog>
        </div>
    )
}

export default EmailOTPRequest