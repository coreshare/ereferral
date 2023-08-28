import React, {useState} from "react"
import "./FormCheckBoxCtrl.css"

const FormCheckBoxCtrl = ({label, onChangeText, title, value}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)

  const onChangeHandle = (e) => {debugger;
    setTextBoxValue(e.target.checked)
    onChangeText(title, e.target.checked)
  }
  return (
    <div className="detailsform">
      <label style={{minWidth: '300px'}}>{label}</label>
      <input className="textbox" style={{height:'20px',width:'20px'}} type="checkbox" onClick={onChangeHandle} checked={textboxvalue} />
    </div>
  )
}
 
export default FormCheckBoxCtrl