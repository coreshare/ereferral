import React, { useEffect, useRef, useState } from "react"
import ModalDialog from "../ModalDialog/ModalDialog"
import "./SessionTimer.css"
import { resetSession } from "../../Services/api"
import { setAppStep } from "../AppSlice"
import { setUserValidationStep } from "../UserValidation/UserValidationSlice"
import { setReferralTypeStageStep } from "../ReferralTypeSlice"
import { resetDetails } from "../DetailsSlice"
import { setStage } from "../ChooseStages/StagesSlice"
import { resetMandatory } from "../SharedStringsSlice"
import { useDispatch } from "react-redux"
import { useIdleTimer } from "react-idle-timer"

const SessionTimer = () => {
  const dispatch = useDispatch()

  const sessionTimeout = 3 * 60 * 1000   // 2 hours
  const warningTimeout = 2 * 60 * 1000        // 2 minutes

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [countdown, setCountdown] = useState(120)
  const [startCountdown, setStartCountdown] = useState(false)
  const [countdownOver, setCountdownOver] = useState(false)

  const warningTimerRef = useRef(null)
  const countdownTimerRef = useRef(null)

  /* ---------------- Idle Timer ---------------- */

  const { reset } = useIdleTimer({
    timeout: sessionTimeout,
    onIdle: () => {
      setCountdownOver(true)
      setIsModalOpen(true)
    },
    onActive: () => {
      clearTimeout(warningTimerRef.current)
      clearTimeout(countdownTimerRef.current)
      setStartCountdown(false)
      setCountdown(120)
    },
  })

  /* ---------------- Warning Timer ---------------- */

  const startWarningTimer = () => {
    clearTimeout(warningTimerRef.current)

    warningTimerRef.current = setTimeout(() => {
      setCountdown(120)
      setStartCountdown(true)
      setIsModalOpen(true)
    }, sessionTimeout - warningTimeout)
  }

  /* ---------------- Initial Setup ---------------- */

  useEffect(() => {
    startWarningTimer()

    return () => {
      clearTimeout(warningTimerRef.current)
      clearTimeout(countdownTimerRef.current)
    }
  }, [])

  /* ---------------- Countdown Logic ---------------- */

  useEffect(() => {
    if (!startCountdown) return

    countdownTimerRef.current = setTimeout(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCountdownOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearTimeout(countdownTimerRef.current)
  }, [startCountdown, countdown])

  /* ---------------- Actions ---------------- */

  const handleExtendSession = async () => {
    await resetSession()
    reset() // reset idle timer
    setStartCountdown(false)
    setCountdown(120)
    startWarningTimer()
    setIsModalOpen(false)
  }

  const handleCloseSession = () => {
    dispatch(setAppStep(0))
    dispatch(setUserValidationStep(0))
    dispatch(setReferralTypeStageStep(0))
    dispatch(resetDetails())
    dispatch(setStage(null))
    dispatch(resetMandatory())
    setIsModalOpen(false)
  }

  /* ---------------- UI ---------------- */

  return (
    <>
      {!countdownOver && (
        <ModalDialog isOpen={isModalOpen} showCloseButton={false}>
          Your session will end in{" "}
          {Math.floor(countdown / 60)}:
          {(countdown % 60).toString().padStart(2, "0")} minutes.
          <br /><br />
          <button className="timer-button" onClick={handleExtendSession}>
            Extend session
          </button>
        </ModalDialog>
      )}

      {countdownOver && (
        <ModalDialog isOpen={isModalOpen} showCloseButton={false}>
          Your session has expired. Please login again.
          <br /><br />
          <button className="timer-button" onClick={handleCloseSession}>
            Close session
          </button>
        </ModalDialog>
      )}
    </>
  )
}

export default SessionTimer


/*import React, { useEffect, useState } from "react"
import ModalDialog from "../ModalDialog/ModalDialog"
import "./SessionTimer.css"
import { resetSession } from "../../Services/api"
import { setAppStep } from "../AppSlice"
import { setUserValidationStep } from "../UserValidation/UserValidationSlice"
import { setReferralTypeStageStep } from "../ReferralTypeSlice"
import { resetDetails } from "../DetailsSlice"
import { setStage } from "../ChooseStages/StagesSlice"
import { resetMandatory } from "../SharedStringsSlice"
import { useDispatch } from "react-redux"
import { useIdleTimer } from 'react-idle-timer'

const SessionTimer = () => {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [countdown, setCountdown] = useState(120)
    const [startCountdown, setStartCountdown] = useState(false)
    const [countdownover, setCountdownover] = useState(false)
    const [systemState, setSystemState] = useState("active")

    let sessionInterval
    let countDownTimer
    let idleTimer
    const sessionTimeout = 5 * 60 * 1000
    const warningTimeout = 2 * 60 * 1000
 
    const { start, pause, reset } = useIdleTimer({
        timeout: 300000,//5mins
        onIdle: () => {
          setSystemState('idle')
          startIdleTimer()
        },
        onActive: () => {
            setSystemState('active')
        },
    })

    const resetSessionTimeout = async () => {
        await resetSession()
    }

    //In Idle state, track the time to popup user about session expire.
    const startIdleTimer = () => {
        idleTimer = setTimeout(() => {
            setCountdown(120)
            setStartCountdown(true)
            openModal()
        },sessionTimeout - warningTimeout)
    }

    useEffect(() => {
        start()
        return () => {
          pause()
          reset()
        };
    }, [start, pause, reset])

    useEffect(() => {
        if(startCountdown)
        {
            countDownTimer = setTimeout(() => {
                if (countdown > 0) {
                    setCountdown(countdown - 1)
                }
                else{
                    openModal()
                    setStartCountdown(false)
                    setCountdownover(true)
                }
            }, 1000)
        }
        return () => {
            clearTimeout(countDownTimer)
        }
        
    },[countdown, startCountdown])

    //session will reset before expire to let user continue.
    useEffect(() => {
        //startTimer()
        sessionInterval = setInterval(() => {
            if(systemState == "active")
            {
                resetSessionTimeout()
            }
        }, sessionTimeout - warningTimeout)

        return () => {
            clearInterval(sessionInterval)
        }
    },[])

    const openModal = () => {
        setIsModalOpen(true)
    }
  
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleExtendSession = async () => {
        resetSessionTimeout()
        setStartCountdown(false)
        closeModal()
    }

    const handleCloseSession = () => {
        setStartCountdown(false)
        dispatch(setAppStep(0))
        dispatch(setUserValidationStep(0))
        dispatch(setReferralTypeStageStep(0))
        dispatch(resetDetails())
        dispatch(setStage(null))
        dispatch(resetMandatory())
        closeModal()
    }

    const handleClosePopup = () => {
        closeModal()
    }
    
    return (<div>
        {!countdownover && 
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
                Your session will end in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} minutes. To ensure you do not loose any data you have entered and to be able to still submit a referral, please click on the 'extend' option.
            <br/><br/>
            <button className="timer-button" onClick={handleExtendSession} style={{marginRight: "5px"}}>Extend session</button>
            <button className="timer-button" onClick={handleClosePopup} style={{marginLeft: "5px"}}>Close</button>
            </ModalDialog>
        }
        {countdownover && 
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
                Your session has expired. Please login again.<br/><br/>
                <button className="timer-button" onClick={handleCloseSession}>Close session</button>
            </ModalDialog>
        }
    </div>)
}
export default SessionTimer*/