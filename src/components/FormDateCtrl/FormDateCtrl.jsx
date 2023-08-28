import React, {useState} from "react"
import "./FormDateCtrl.css"

const FormDateCtrl = ({label, onChangeText, title, value}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)

  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div className="detailsform">
      <label>{label}</label><br/>
      <input className="textbox" dateFormat="dd-MM-yyyy" type="date" onChange={onChangeHandle} value={textboxvalue} />
    </div>
  )
}

export default FormDateCtrl