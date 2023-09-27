import React, {useState} from "react"
import "./FormSelectCtrl.css"

const FormSelectCtrl = ({label, onChangeText, title, value, options}) => {
  const [selectValue, setSelectValue] = useState(value)

  const onChangeHandle = (e) => {debugger
    setSelectValue(e.target.value)
    onChangeText(title, e.target.value)
  }
  return (
    <div className="formselectctrl">
      <label>{label}</label><br/>
      <select onChange={onChangeHandle} value={selectValue}>
          <option></option>
          {options && options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  )
}

export default FormSelectCtrl