// import classNames from 'classnames'
// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Button3D from 'components/Button/Button3D/Button3D'
import CommunityButton from 'components/Button/CommunityButton/CommunityButton'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import Input from 'components/Input/Input'
import Link from 'components/Link/Link'
import { GOOGLE, FACEBOOK } from 'constants/buttonType'
import { EMAIL, NAME, PASSWORD } from 'constants/inputType'

const Register = () => {
  const [errorContent] = useState('')
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
        <Input type={NAME} showLabel />
      </div>
      <div className=" mb-12">
        <Input type={EMAIL} showLabel />
      </div>
      <div className="mb-12">
        <Input type={PASSWORD} showLabel />
      </div>
      <div className="mb-6">
        <Button3D
          className="w-full min-h-[48px] text-xl font-bold"
          content="註冊"
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
