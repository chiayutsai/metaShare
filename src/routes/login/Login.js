// import classNames from 'classnames'
// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import Button3D from 'components/Button/Button3D/Button3D'
import CommunityButton from 'components/Button/CommunityButton/CommunityButton'
import Input from 'components/Input/Input'
import Link from 'components/Link/Link'
import { GOOGLE, FACEBOOK } from 'constants/buttonType'
import { EMAIL, PASSWORD } from 'constants/inputType'

const Login = () => (
  <>
    <div className="flex items-center  mb-9 ">
      <div className="login-line" />
      <h3 className="flex items-center font-bold text-primary-700 text-3xl">
        登入<span className="text-primary-600/60 text-2xl ml-1.5">LOG IN</span>
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
    <div className="flex items-center mb-9">
      <span className="w-full h-[1px] bg-gray-600" />
      <p className="mx-2 text-sm font-bold text-gray-600">Or</p>
      <span className="w-full h-[1px] bg-gray-600" />
    </div>
    <div className=" mb-12">
      <Input type={EMAIL} showLabel />
    </div>
    <div className="flex flex-col items-end mb-12">
      <Input type={PASSWORD} showLabel />
      <Link
        to="/metaShare/login/checkEmail"
        className="mt-1 text-sm text-gray-700 hover:text-primary-700">
        忘記密碼?
      </Link>
    </div>
    <div className="mb-6">
      <Button3D
        className="w-full min-h-[48px] text-xl font-bold"
        content="登入"
      />
    </div>
    <div className="flex items-center justify-center">
      <p className="text-gray-900 text-sm">還沒有帳號嗎?</p>
      <Link
        to="/metaShare/login/register"
        className="ml-0.5 text-primary-800 text-sm font-bold hover:text-primary-600">
        前往註冊
      </Link>
    </div>
  </>
)
Login.propTypes = {}

export default Login
