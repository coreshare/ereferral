import React, { useState, useEffect, useRef } from "react"
import "./FormDateCtrl.css"
import { useSelector } from "react-redux"

const FormDateCtrl = ({
  label,
  onChangeText,
  title,
  value,
  isSameRow,
  lblMinWidth,
  dtWidth,
  isFutureDate,
  isMandatory,
  enableRedBorder,
  disableCtrl
}) => {

  const details = useSelector(state => state.details)
  const inputRef = useRef(null)

  const MIN_ALLOWED_DATE = "1900-01-01"

  const [textboxvalue, setTextBoxValue] = useState(value || "")
  const [hasError, setHasError] = useState(false)

  // yyyy-mm-dd (local today)
  const today = new Date()
  const currentDate = today.toISOString().split("T")[0]

  useEffect(() => {
    setTextBoxValue((details && details[title]) || "")
  }, [details, title])

  const setValidity = (raw) => {
    if (!inputRef.current || !raw) return

    if (raw < MIN_ALLOWED_DATE) {
      inputRef.current.setCustomValidity("Date cannot be before 01-01-1900")
      setHasError(true)
    }
    else if (isFutureDate === false && raw > currentDate) {
      inputRef.current.setCustomValidity("Future dates are not allowed")
      setHasError(true)
    }
    else if (isFutureDate === true && raw < currentDate) {
      inputRef.current.setCustomValidity("Only today or future dates are allowed")
      setHasError(true)
    }
    else {
      inputRef.current.setCustomValidity("")
      setHasError(false)
    }
  }

  const onChangeHandle = (e) => {
    const raw = e.target.value
    setTextBoxValue(raw)
    setValidity(raw)
    onChangeText(title, raw)
  }

  const onBlurHandle = () => {
    if (inputRef.current) {
      inputRef.current.reportValidity()
    }
  }

  return (
    <div className="detailsform">
      <label style={{ minWidth: lblMinWidth }}>
        {label}{isMandatory && <span className="asterik">*</span>}
      </label>

      {!isSameRow && <br />}

      <input
        ref={inputRef}
        className={`dtCtrl ${(enableRedBorder || hasError) ? "redBorder" : ""}`}
        type="date"
        value={textboxvalue}
        onChange={onChangeHandle}
        onBlur={onBlurHandle}
        style={{ width: dtWidth }}
        min={isFutureDate === true ? currentDate : MIN_ALLOWED_DATE}
        max={isFutureDate === false ? currentDate : undefined}
        disabled={disableCtrl}
      />
    </div>
  )
}

export default FormDateCtrl
