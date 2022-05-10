// import classNames from 'classnames'
// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useSelector } from 'react-redux'
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
import { ReactComponent as SuccessSvg } from './assets/success.svg'

const ForgetPassword = () => {
  const [errorContent] = useState('')
  const forgetPasswordStep = useSelector(forgetPasswordStepSelector)
  const isCheckEmail = forgetPasswordStep === CHECK_EMAIL
  const isVerification = forgetPasswordStep === CHECK_VERIFICATION
  const isResetPassword = forgetPasswordStep === RESET_PASSWORD
  const isResetSuccess = forgetPasswordStep === RESET_SUCCESS
  return (
    <>
      {!isResetSuccess && (
        <>
          <div className="flex items-center  mb-9 ">
            <div className="login-line" />
            <h3 className="flex items-center font-bold text-primary-700 text-3xl">
              重設密碼
              <span className="text-primary-600/60 text-2xl ml-1.5">
                FORGET PASSWORD
              </span>
            </h3>
          </div>

          {isCheckEmail && (
            <p className="mb-9 text-lg text-gray-1200">
              請輸入您加入時使用的電子郵件，我們將會向您發送重置密碼的驗證碼。
            </p>
          )}
          {errorContent && (
            <div className="mb-8">
              <ErrorBadge content={errorContent} />
            </div>
          )}
          {isCheckEmail && (
            <div className=" mb-10">
              <Input type={EMAIL} showLabel />
            </div>
          )}
          {isVerification && (
            <div className=" mb-10">
              <Input type={VERIFICATION} showLabel />
            </div>
          )}
          {isResetPassword && (
            <>
              <div className=" mb-10">
                <Input type={NEW_PASSWORD} showLabel />
              </div>
              <div className=" mb-10">
                <Input type={CONFIRM_NEW_PASSWORD} showLabel />
              </div>
            </>
          )}
          <div className="mb-4">
            <Button3D
              className="w-full min-h-[48px] text-xl font-bold"
              content={STEP_BUTTON_CONTENT[forgetPasswordStep]}
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
