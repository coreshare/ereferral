import React, {useState} from "react"
import "./FormSelectCtrl.css"

const FormSelectCtrl = ({label, onChangeValue, title, value}) => {
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
          <option>Yes</option>
          <option>No</option>{/* If No, dont allow to go to Next */}
      </select>
    </div>
  )
}

export default FormSelectCtrl