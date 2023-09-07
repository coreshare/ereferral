import React, {useState} from "react"
import "./FormDateCtrl.css"

const FormDateCtrl = ({label, onChangeText, title, value, isSameRow, lblMinWidth, dtWidth}) => {
  const [textboxvalue, setTextBoxValue] = useState(value)

  const onChangeHandle = (e) => {
    setTextBoxValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div className="detailsform">
      <label style={{minWidth:lblMinWidth}}>{label}</label>{!isSameRow && <br/>}
      <input className="dtCtrl" dateFormat="dd-MM-yyyy" type="date" onChange={onChangeHandle} value={textboxvalue}
      style={{width:dtWidth}} />
    </div>
  )
}

export default FormDateCtrl