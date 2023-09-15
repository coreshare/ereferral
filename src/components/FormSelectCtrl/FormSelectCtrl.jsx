import React, {useState} from "react"
import "./FormSelectCtrl.css"

const FormSelectCtrl = ({label, onChangeValue, title, value, options}) => {
  const [selectValue, setSelectValue] = useState(value)

  const onChangeHandle = (e) => {
    setSelectValue(e.target.value)
    onChangeValue(title, e.target.value)
  }
  return (
    <div className="formselectctrl">
      <label style={{minWidth:'480px'}}>{label}</label>
      <select onChange={onChangeHandle} value={selectValue}>
          <option></option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  )
}

export default FormSelectCtrl