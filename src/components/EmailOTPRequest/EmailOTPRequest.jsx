import React,{useState} from "react"
import TextBoxCtrl from "../TextBoxCtrl/TextBoxCtrl";
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import ModalDialog from "../ModalDialog/ModalDialog";
import { validateDomain, generateOTP } from "../../Services/api";

const EmailOTPRequest = ({onNext}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [modalText, setModalText] = useState("");
    const [showCloseButton,setShowCloseButton] = useState(true)

    const handleEmailOTPRequest = async () =>{
        if(email == ""){
            setShowCloseButton(true)
            setModalText("Enter email address")
            openModal();
            return;
        }
        else{
            var isValid = true;//await validateDomain(email);
            if(!isValid){
                setShowCloseButton(true)
                setModalText("Enter valid domain")
                openModal();
                return;
            }
            else{
                setShowCloseButton(false)
                setModalText("Sending OTP... Please wait.")
                openModal();
                await generateOTP(email);
                closeModal();
                onNext();
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