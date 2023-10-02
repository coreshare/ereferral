import React, {useEffect, useState} from "react"
import "./FormTextBoxCtrl.css"

const FormTextBoxCtrl = ({label, onChangeText, title, value, ctrlInSameRow, lblWidth, ctrlWidth, onBlurText, maxLengthValue, disallowSpaces}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)
  console.log(title + ": " + value)
  const onChangeHandle = (e) => {
    var newValue = e.target.value;
    if (disallowSpaces) {
      newValue = newValue.replace(/\D/g, "");
    }
    setTextBoxValue(newValue)
    onChangeText(title, newValue)
  }
  const handleOnBlur = (e) => {
    if(onBlurText){
      onBlurText(title, e.target.value)
    }
  }

  return (
    <div className="detailsform">
      <label style={lblWidth && { width: lblWidth }}>{label}</label>{ctrlInSameRow !== false && <br />}
      <input style={ctrlWidth && { width: ctrlWidth }} className="textbox" type="text" onChange={onChangeHandle} 
      onBlur={handleOnBlur} maxLength={maxLengthValue && maxLengthValue}
      value={textboxvalue} />
    </div>
  )
}

export default FormTextBoxCtrl