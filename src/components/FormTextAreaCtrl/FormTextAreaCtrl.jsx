import React, {useState} from "react"
import "./FormTextAreaCtrl.css"

const FormTextAreaCtrl = ({label, onChangeText, title, value, ctrlWidth}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)

  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div className="detailsform">
      <label>{label}</label><br/>
      <textarea className="textarea" type="text" onChange={onChangeHandle} value={textboxvalue} rows={4} 
        style={{width: ctrlWidth}} />
    </div>
  )
}

export default FormTextAreaCtrl