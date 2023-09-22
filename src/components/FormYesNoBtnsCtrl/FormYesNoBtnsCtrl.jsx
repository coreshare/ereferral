import React, {useState} from "react"
import "./FormYesNoBtnsCtrl.css"

const FormYesNoBtnsCtrl = ({label, onChangeValue, title, value, IsNewLine}) => {
  
  let isNewLine = false;
  if(IsNewLine){
    isNewLine = true;
  }
  const [selectValue, setSelectValue] = useState(value)

  const onChangeHandle = (e) => {
    setSelectValue(e.target.title)
    onChangeValue(title, e.target.title)
  }

  return (
    <div className="formyesnobtnsctrl">
      <label style={{minWidth:'480px'}}>{label}</label>{isNewLine && <br/>}
      <div>
        <button className={selectValue == 'Yes' && 'selected'} onClick={onChangeHandle} title="Yes">Yes</button>
        <button className={selectValue == 'No' && 'selected'} onClick={onChangeHandle} title="No">No</button>
      </div>
    </div>
  )
}

export default FormYesNoBtnsCtrl