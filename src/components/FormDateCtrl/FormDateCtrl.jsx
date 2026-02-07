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

  // ✅ SharePoint supported range
  const SP_MIN_DATE = "1900-01-01"
  const SP_MAX_DATE = "9999-12-31"

  const [textboxvalue, setTextBoxValue] = useState(value || "")
  const [hasError, setHasError] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    setTextBoxValue((details && details[title]) || "")
  }, [details, title])

  const setValidity = (raw) => {
    if (!inputRef.current || !raw) return

    if (raw < SP_MIN_DATE || raw > SP_MAX_DATE) {
      inputRef.current.setCustomValidity(
        "Invalid date. Use a date after 01/01/1900"
      )
      setHasError(true)
    }
    else if (isFutureDate === false && raw > today) {
      inputRef.current.setCustomValidity("Future dates are not allowed")
      setHasError(true)
    }
    else if (isFutureDate === true && raw < today) {
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
    inputRef.current?.reportValidity()
  }

  return (
    <div className="detailsform">
      <label style={{ minWidth: lblMinWidth }}>
        {label}{isMandatory && <span className="asterik">*</span>}
      </label>

      {!isSameRow && <br />}

      <input
        ref={inputRef}
        type="date"
        value={textboxvalue}
        onChange={onChangeHandle}
        onBlur={onBlurHandle}
        className={`dtCtrl ${(enableRedBorder || hasError) ? "redBorder" : ""}`}
        style={{ width: dtWidth }}
        min={SP_MIN_DATE}
        max={isFutureDate === false ? today : SP_MAX_DATE}
        disabled={disableCtrl}
      />
    </div>
  )
}

export default FormDateCtrl
