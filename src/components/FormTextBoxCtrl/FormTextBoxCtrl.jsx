import React, {useEffect, useState} from "react"
import "./FormTextBoxCtrl.css"

const FormTextBoxCtrl = ({label, onChangeText, title, value, ctrlInSameRow, lblWidth, ctrlWidth, onBlurText}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)
  
  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  const handleOnBlur = (e) => {
    if(onBlurText){
      onBlurText(title, e.target.value)
    }
  }

  return (
    <div className="detailsform">
      <label style={lblWidth && { width: lblWidth }}>{label}</label>{ctrlInSameRow !== false && <br />}
      <input style={ctrlWidth && { width: ctrlWidth }} className="textbox" type="text" onChange={onChangeHandle} onBlur={handleOnBlur} 
      value={textboxvalue} />
    </div>
  )
}

export default FormTextBoxCtrl