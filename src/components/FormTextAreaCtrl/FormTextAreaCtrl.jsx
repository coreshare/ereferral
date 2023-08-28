import React, {useState} from "react"
import "./FormTextAreaCtrl.css"

const FormTextAreaCtrl = ({label, onChangeText, title, value}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)

  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div className="detailsform">
      <label>{label}</label><br/>
      <textarea className="textbox" type="text" onChange={onChangeHandle} value={textboxvalue} rows={4} />
    </div>
  )
}

export default FormTextAreaCtrl