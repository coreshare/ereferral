import React from "react";
import "./ButtonCtrl.css"

const ButtonCtrl = ({btnText, btnClickHandler, btnDisabled = false}) => {
    return(
        <div>
            <button onClick={btnClickHandler} class="btnCtrl" disabled={btnDisabled}>{btnText}</button>
        </div>
    )
}

export default ButtonCtrl