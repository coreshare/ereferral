import React, {useState} from "react"
import "./FormTextBoxCtrl.css"

const FormTextBoxCtrl = ({label, onChangeText, title, value}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)

  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div>
      <label>{label}</label><br/>
      <input type="text" onChange={onChangeHandle} value={textboxvalue}/>
    </div>
  )
}

export default FormTextBoxCtrl