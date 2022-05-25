import { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import validator from 'validator'
import { setForgetPasswordStep } from 'actions/forgetPassword'
import {
  handleCheckEmail,
  handleCheckVerification,
  handleResetPassword,
} from 'actions/user'
import Button3D from 'components/Button/Button3D/Button3D'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import Input from 'components/Input/Input'
import Link from 'components/Link/Link'
import {
  CHECK_EMAIL,
  CHECK_VERIFICATION,
  RESET_PASSWORD,
  RESET_SUCCESS,
  STEP_BUTTON_CONTENT,
} from 'constants/forgetPassword'
import {
  EMAIL,
  VERIFICATION,
  NEW_PASSWORD,
  CONFIRM_NEW_PASSWORD,
} from 'constants/inputType'

import { forgetPasswordStepSelector } from 'selectors'
import { loginLoadingSelector } from 'selectors/user'
import { ReactComponent as IconLoadingSvg } from './assets/loading.svg'
import { ReactComponent as SuccessSvg } from './assets/success.svg'

const ForgetPassword = () => {
  const firstInputRef = useRef()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setForgetPasswordStep(CHECK_EMAIL))
  }, [dispatch])
  const [errorContent, setErrorContent] = useState('')
  const [firstTimeLogin, setFirstTimeLogin] = useState(true)
  const [emailContent, setEmailContent] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [verificationContent, setVerificationContent] = useState('')
  const [verificationErrorMessage, setVerificationErrorMessage] = useState('')
  const [resetPasswordContent, setResetPasswordContent] = useState('')
  const [resetPasswordErrorMessage, setResetPasswordErrorMessage] = useState('')
  const [confirmPasswordContent, setConfirmPasswordContent] = useState('')
  const [
    confirmPasswordErrorMessage,
    setConfirmPasswordErrorMessage,
  ] = useState('')
  const forgetPasswordStep = useSelector(forgetPasswordStepSelector)
  const isCheckEmail = forgetPasswordStep === CHECK_EMAIL
  const isVerification = forgetPasswordStep === CHECK_VERIFICATION
  const isResetPassword = forgetPasswordStep === RESET_PASSWORD
  const isResetSuccess = forgetPasswordStep === RESET_SUCCESS
  const isLoginLoading = useSelector(loginLoadingSelector)

  const validateEmail = useCallback(value => {
    let message = ''
    if (validator.isEmpty(value)) {
      message = 'Email為必填欄位'
    } else if (!validator.isEmail(value)) {
      message = '請輸入正確的 Email 格式'
    }

    setEmailErrorMessage(message)

    return message
  }, [])
  const validateVerification = useCallback(value => {
    let message = ''
    if (validator.isEmpty(value)) {
      message = '請輸入收到的驗證碼'
    }

    setVerificationErrorMessage(message)

    return message
  }, [])
  const validatePassword = useCallback(value => {
    let message = ''
    if (validator.isEmpty(value)) {
      message = '密碼為必填欄位'
    } else if (!validator.isLength(value, { min: 8 })) {
      message = '密碼字數低於 8 碼'
    } else if (validator.isNumeric(value) || validator.isAlpha(value)) {
      message = '密碼需英數混合'
    }
    setResetPasswordErrorMessage(message)
    return message
  }, [])
  const validateConfirmPassword = useCallback(value => {
    let message = ''
    if (validator.isEmpty(value)) {
      message = '密碼為必填欄位'
    } else if (!validator.isLength(value, { min: 8 })) {
      message = '密碼字數低於 8 碼'
    } else if (validator.isNumeric(value) || validator.isAlpha(value)) {
      message = '密碼需英數混合'
    }
    setConfirmPasswordErrorMessage(message)
    return message
  }, [])
  const handleEmailChange = useCallback(
    e => {
      const { value } = e.target

      setEmailContent(value)

      if (!firstTimeLogin) {
        validateEmail(value)
      }
    },
    [validateEmail, firstTimeLogin],
  )
  const handleVerificationChange = useCallback(
    e => {
      const { value } = e.target

      setVerificationContent(value)

      if (!firstTimeLogin) {
        validateVerification(value)
      }
    },
    [validateVerification, firstTimeLogin],
  )
  const handleResetPassworChange = useCallback(
    e => {
      const { value } = e.target

      setResetPasswordContent(value)

      if (!firstTimeLogin) {
        validatePassword(value)
      }
    },
    [validatePassword, firstTimeLogin],
  )
  const handleConfirmPassworChange = useCallback(
    e => {
      const { value } = e.target

      setConfirmPasswordContent(value)

      if (!firstTimeLogin) {
        validateConfirmPassword(value)
      }
    },
    [validateConfirmPassword, firstTimeLogin],
  )
  const handleCheckEmailClick = useCallback(async () => {
    setFirstTimeLogin(false)

    const isEmailFailed = validateEmail(emailContent)
    if (isEmailFailed) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      return
    }
    try {
      await dispatch(handleCheckEmail({ email: emailContent }))
      setErrorContent('')
      setFirstTimeLogin(true)
    } catch (error) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      console.log(error)
      setErrorContent(error.message)
    }
  }, [dispatch, validateEmail, emailContent])

  const handleCheckVerificationClick = useCallback(async () => {
    setFirstTimeLogin(false)

    const isVerificationFailed = validateVerification(verificationContent)
    if (isVerificationFailed) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      return
    }
    try {
      await dispatch(
        handleCheckVerification({ verification: verificationContent }),
      )
      setErrorContent('')
      setFirstTimeLogin(true)
    } catch (error) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      console.log(error)
      setErrorContent(error.message)
    }
  }, [dispatch, validateVerification, verificationContent])

  const handleResetPasswordClick = useCallback(async () => {
    setFirstTimeLogin(false)

    const isResetPasswordFailed = validatePassword(resetPasswordContent)
    const isConfirmPasswordFailed = validateConfirmPassword(
      confirmPasswordContent,
    )
    if (isResetPasswordFailed || isConfirmPasswordFailed) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      return
    }
    if (resetPasswordContent !== confirmPasswordContent) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      setErrorContent('密碼輸入不一致，請重新輸入')
      return
    }
    try {
      await dispatch(
        handleResetPassword({
          password: resetPasswordContent,
          confirmPassword: confirmPasswordContent,
        }),
      )
      setErrorContent('')
    } catch (error) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      console.log(error)
      setErrorContent(error.message)
    }
  }, [
    dispatch,
    validatePassword,
    resetPasswordContent,
    validateConfirmPassword,
    confirmPasswordContent,
  ])
  const handleClick = useMemo(() => {
    let handler = () => {}
    if (isCheckEmail) {
      handler = handleCheckEmailClick
    } else if (isVerification) {
      handler = handleCheckVerificationClick
    } else if (isResetPassword) {
      handler = handleResetPasswordClick
    }
    return handler
  }, [
    isCheckEmail,
    handleCheckEmailClick,
    isVerification,
    handleCheckVerificationClick,
    isResetPassword,
    handleResetPasswordClick,
  ])
  return (
    <>
      {isLoginLoading && (
        <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/70">
          <div className=" animate-spin">
            <div className="scale-[2]">
              <IconLoadingSvg />
            </div>
          </div>
        </div>
      )}
      {!isResetSuccess && (
        <>
          <div className="flex items-center  mb-6 xl:mb-9 ">
            <div className="login-line" />
            <h3 className="flex-col sm:flex-row flex items-start sm:items-center font-bold text-primary-700 text-2xl sm:text-3xl">
              重設密碼
              <span className="text-primary-600/60 text-xl sm:text-2xl sm:ml-1.5">
                FORGET PASSWORD
              </span>
            </h3>
          </div>

          {isCheckEmail && (
            <p className="mb-6 xl:mb-9 sm:text-lg text-gray-1200">
              請輸入您加入時使用的電子郵件，我們將會向您發送重置密碼的驗證碼。
            </p>
          )}
          {isVerification && (
            <p className="mb-6 xl:mb-9 sm:text-lg text-gray-1200">
              請輸入您收到的驗證碼。
            </p>
          )}
          {isResetPassword && (
            <p className="mb-6 xl:mb-9 sm:text-lg text-gray-1200">
              驗證成功，請輸入你想更改的新密碼
            </p>
          )}
          {errorContent && (
            <div className="mb-8">
              <ErrorBadge content={errorContent} />
            </div>
          )}
          {isCheckEmail && (
            <div className=" mb-10">
              <Input
                type={EMAIL}
                showLabel
                setRef={firstInputRef}
                handleChange={handleEmailChange}
                value={emailContent}
                errorContent={emailErrorMessage}
              />
            </div>
          )}
          {isVerification && (
            <div className=" mb-10">
              <Input
                type={VERIFICATION}
                showLabel
                setRef={firstInputRef}
                handleChange={handleVerificationChange}
                value={verificationContent}
                errorContent={verificationErrorMessage}
              />
            </div>
          )}
          {isResetPassword && (
            <>
              <div className=" mb-10">
                <Input
                  type={NEW_PASSWORD}
                  showLabel
                  setRef={firstInputRef}
                  handleChange={handleResetPassworChange}
                  value={resetPasswordContent}
                  errorContent={resetPasswordErrorMessage}
                />
              </div>
              <div className=" mb-10">
                <Input
                  type={CONFIRM_NEW_PASSWORD}
                  showLabel
                  handleChange={handleConfirmPassworChange}
                  value={confirmPasswordContent}
                  errorContent={confirmPasswordErrorMessage}
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <Button3D
              className="w-full min-h-[48px] text-xl font-bold"
              content={STEP_BUTTON_CONTENT[forgetPasswordStep]}
              onClick={handleClick}
              isDisabled={Boolean(
                emailErrorMessage ||
                  verificationErrorMessage ||
                  resetPasswordErrorMessage ||
                  confirmPasswordErrorMessage ||
                  isLoginLoading,
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/metaShare/login"
              className="ml-0.5 text-primary-800 text-sm font-bold hover:text-primary-600">
              返回登入
            </Link>
            {isCheckEmail && (
              <div className="flex items-center justify-center">
                <p className="text-gray-900 text-sm">還沒有帳號嗎?</p>
                <Link
                  to="/metaShare/register"
                  className="ml-0.5 text-primary-800 text-sm font-bold hover:text-primary-600">
                  前往註冊
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      {isResetSuccess && (
        <>
          <div className="flex justify-center mb-9 ">
            <SuccessSvg />
          </div>
          <Link to="/metaShare/login">
            <Button3D
              className="w-full min-h-[48px] text-xl font-bold"
              content={STEP_BUTTON_CONTENT[forgetPasswordStep]}
            />
          </Link>
        </>
      )}
    </>
  )
}
ForgetPassword.propTypes = {}

export default ForgetPassword
