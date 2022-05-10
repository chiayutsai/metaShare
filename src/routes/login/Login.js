// import classNames from 'classnames'
// import { useEffect } from 'react'
import { useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { handleLogin } from 'actions/admin'
import Button3D from 'components/Button/Button3D/Button3D'
import CommunityButton from 'components/Button/CommunityButton/CommunityButton'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import Input from 'components/Input/Input'
import Link from 'components/Link/Link'
import { GOOGLE, FACEBOOK } from 'constants/buttonType'
import { EMAIL, PASSWORD } from 'constants/inputType'

const Login = () => {
  const firstInputRef = useRef()

  const dispatch = useDispatch()
  const [errorContent, setErrorContent] = useState('')
  const [firstTimeLogin, setFirstTimeLogin] = useState(true)
  const [emailContent, setEmailContent] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [passwordContent, setPasswordContent] = useState('')

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
    }

    setPasswordErrorMessage(message)

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

  const handlePasswordChange = useCallback(
    e => {
      const { value } = e.target

      setPasswordContent(value)

      if (!firstTimeLogin) {
        validatePassword(value)
      }
    },
    [validatePassword, firstTimeLogin],
  )

  const handleLoginClick = useCallback(async () => {
    setFirstTimeLogin(false)

    const isEmailFailed = validateEmail(emailContent)
    const isPasswordFailed = validatePassword(passwordContent)
    if (isEmailFailed || isPasswordFailed) {
      return
    }
    try {
      await dispatch(
        handleLogin({ email: emailContent, password: passwordContent }),
      )
    } catch (error) {
      firstInputRef.current.focus()
      firstInputRef.current.select(0, -1)
      console.log(error)
      setErrorContent(error.message)
    }
  }, [dispatch, validateEmail, validatePassword, emailContent, passwordContent])

  return (
    <>
      <div className="flex items-center  mb-9 ">
        <div className="login-line" />
        <h3 className="flex items-center font-bold text-primary-700 text-3xl">
          登入
          <span className="text-primary-600/60 text-2xl ml-1.5">LOG IN</span>
        </h3>
      </div>
      <div className="flex mb-9">
        <div className="w-full mr-3">
          <CommunityButton type={GOOGLE} login />
        </div>
        <div className="w-full">
          <CommunityButton type={FACEBOOK} login />
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
          type={EMAIL}
          setRef={firstInputRef}
          showLabel
          handleChange={handleEmailChange}
          value={emailContent}
          errorContent={emailErrorMessage}
        />
      </div>
      <div className="flex flex-col items-end mb-12">
        <Input
          type={PASSWORD}
          showLabel
          value={passwordContent}
          handleChange={handlePasswordChange}
          errorContent={passwordErrorMessage}
        />
        <Link
          to="/metaShare/forgetPassword"
          className="mt-1 text-sm text-gray-700 hover:text-primary-700">
          忘記密碼?
        </Link>
      </div>
      <div className="mb-6">
        <Button3D
          className="w-full min-h-[48px] text-xl font-bold"
          content="登入"
          onClick={handleLoginClick}
          isDisabled={Boolean(emailErrorMessage || passwordErrorMessage)}
        />
      </div>
      <div className="flex items-center justify-center">
        <p className="text-gray-900 text-sm">還沒有帳號嗎?</p>
        <Link
          to="/metaShare/register"
          className="ml-0.5 text-primary-800 text-sm font-bold hover:text-primary-600">
          前往註冊
        </Link>
      </div>
    </>
  )
}
Login.propTypes = {}

export default Login
