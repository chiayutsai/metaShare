import { useState, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import validator from 'validator'
import { handleRegister } from 'actions/user'
import Button3D from 'components/Button/Button3D/Button3D'
import CommunityButton from 'components/Button/CommunityButton/CommunityButton'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import Input from 'components/Input/Input'
import Link from 'components/Link/Link'
import { GOOGLE, FACEBOOK } from 'constants/buttonType'
import { EMAIL, NAME, PASSWORD } from 'constants/inputType'
import { loginLoadingSelector } from 'selectors/user'

const Register = () => {
  const dispatch = useDispatch()
  const firstInputRef = useRef()
  const [errorContent, setErrorContent] = useState('')
  const [firstTimeRegister, setFirstTimeRegister] = useState(true)
  const [nameContent, setNameContent] = useState('')
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [passwordContent, setPasswordContent] = useState('')
  const isLoginLoading = useSelector(loginLoadingSelector)

  const validateName = useCallback(value => {
    let message = ''
    if (validator.isEmpty(value)) {
      message = '暱稱為必填欄位'
    }
    setNameErrorMessage(message)

    return message
  }, [])

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

  const validatePassword = useCallback(value => {
    let message = ''
    if (validator.isEmpty(value)) {
      message = '密碼為必填欄位'
    } else if (!validator.isLength(value, { min: 8 })) {
      message = '密碼字數低於 8 碼'
    } else if (validator.isNumeric(value) || validator.isAlpha(value)) {
      message = '密碼需英數混合'
    }
    setPasswordErrorMessage(message)

    return message
  }, [])
  const handleNameChange = useCallback(
    e => {
      const { value } = e.target

      setNameContent(value)

      if (!firstTimeRegister) {
        validateName(value)
      }
    },
    [validateName, firstTimeRegister],
  )
  const handleEmailChange = useCallback(
    e => {
      const { value } = e.target

      setEmailContent(value)

      if (!firstTimeRegister) {
        validateEmail(value)
      }
    },
    [validateEmail, firstTimeRegister],
  )

  const handlePasswordChange = useCallback(
    e => {
      const { value } = e.target

      setPasswordContent(value)

      if (!firstTimeRegister) {
        validatePassword(value)
      }
    },
    [validatePassword, firstTimeRegister],
  )

  const handleRegisterClick = useCallback(async () => {
    setFirstTimeRegister(false)

    const isNameFailed = validateName(nameContent)
    const isEmailFailed = validateEmail(emailContent)
    const isPasswordFailed = validatePassword(passwordContent)
    if (isNameFailed || isEmailFailed || isPasswordFailed) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      return
    }
    try {
      await dispatch(
        handleRegister({
          name: nameContent,
          email: emailContent,
          password: passwordContent,
        }),
      )
    } catch (error) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      console.log(error)
      setErrorContent(error.message)
    }
  }, [
    dispatch,
    validateName,
    validateEmail,
    validatePassword,
    nameContent,
    emailContent,
    passwordContent,
  ])
  return (
    <>
      <div className="flex items-center  mb-9 ">
        <div className="login-line" />
        <h3 className="flex items-center font-bold text-primary-700 text-3xl">
          註冊
          <span className="text-primary-600/60 text-2xl ml-1.5">SIGN UP</span>
        </h3>
      </div>
      <div className="flex mb-9">
        <div className="w-full mr-3">
          <CommunityButton type={GOOGLE} />
        </div>
        <div className="w-full">
          <CommunityButton type={FACEBOOK} />
        </div>
      </div>
      <div className="flex items-center mb-8">
        <span className="w-full h-[1px] bg-gray-600" />
        <p className="mx-2 text-sm font-bold text-gray-600">Or</p>
        <span className="w-full h-[1px] bg-gray-600" />
      </div>
      {errorContent && (
        <div className="mb-8">
          <ErrorBadge content={errorContent} />
        </div>
      )}
      <div className=" mb-12">
        <Input
          type={NAME}
          setRef={firstInputRef}
          showLabel
          handleChange={handleNameChange}
          value={nameContent}
          errorContent={nameErrorMessage}
        />
      </div>
      <div className=" mb-12">
        <Input
          type={EMAIL}
          showLabel
          handleChange={handleEmailChange}
          value={emailContent}
          errorContent={emailErrorMessage}
        />
      </div>
      <div className="mb-12">
        <Input
          type={PASSWORD}
          showLabel
          value={passwordContent}
          handleChange={handlePasswordChange}
          errorContent={passwordErrorMessage}
        />
      </div>
      <div className="mb-6">
        <Button3D
          className="w-full min-h-[48px] text-xl font-bold"
          content="註冊"
          onClick={handleRegisterClick}
          isDisabled={Boolean(
            nameErrorMessage ||
              emailErrorMessage ||
              passwordErrorMessage ||
              isLoginLoading,
          )}
        />
      </div>
      <div className="flex items-center justify-center">
        <p className="text-gray-900 text-sm">已經有帳號了嗎?</p>
        <Link
          to="/metaShare/login"
          className="ml-0.5 text-primary-800 text-sm font-bold hover:text-primary-600">
          前往登入
        </Link>
      </div>
    </>
  )
}
Register.propTypes = {}

export default Register
