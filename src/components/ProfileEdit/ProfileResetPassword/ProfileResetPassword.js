import PropTypes from 'prop-types'
import { useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { setProdileEditInit, handleUpdatePassword } from 'actions/profile'
import ProfileButton from 'components/Button/ProfileButton/ProfileButton'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import Input from 'components/Input/Input'
import SuccessBadge from 'components/SuccessBadge/SuccessBadge'
import { DARKEN, CANCEL, ICON_EDIT, ICON_CANCEL } from 'constants/buttonType'
import { NEW_PASSWORD, CONFIRM_NEW_PASSWORD } from 'constants/inputType'

const ProfileResetPassword = ({ isEditLoading }) => {
  const firstInputRef = useRef()
  const dispatch = useDispatch()
  const handleCancleEditClick = useCallback(() => {
    dispatch(setProdileEditInit())
  }, [dispatch])
  const [firstTimeClick, setFirstTimeClick] = useState(true)
  const [errorContent, setErrorContent] = useState('')
  const [successContent, setSuccessContent] = useState('')
  const [resetPasswordContent, setResetPasswordContent] = useState('')
  const [resetPasswordErrorMessage, setResetPasswordErrorMessage] = useState('')
  const [confirmPasswordContent, setConfirmPasswordContent] = useState('')
  const [
    confirmPasswordErrorMessage,
    setConfirmPasswordErrorMessage,
  ] = useState('')
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
  const handleResetPassworChange = useCallback(
    e => {
      const { value } = e.target

      setResetPasswordContent(value)
      setErrorContent('')
      if (!firstTimeClick) {
        validatePassword(value)
      }
    },
    [validatePassword, setErrorContent, firstTimeClick],
  )
  const handleConfirmPassworChange = useCallback(
    e => {
      const { value } = e.target

      setConfirmPasswordContent(value)
      setErrorContent('')
      if (!firstTimeClick) {
        validateConfirmPassword(value)
      }
    },
    [validateConfirmPassword, setErrorContent, firstTimeClick],
  )
  const handleResetPasswordClick = useCallback(async () => {
    setFirstTimeClick(false)

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
        handleUpdatePassword({
          password: resetPasswordContent,
          confirmPassword: confirmPasswordContent,
        }),
      )
      setResetPasswordContent('')
      setConfirmPasswordContent('')
      setErrorContent('')
      setSuccessContent('密碼更新成功，請於下次登入時使用新密碼')
      setTimeout(() => {
        setSuccessContent('')
      }, 3000)
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
    setErrorContent,
    setSuccessContent,
  ])
  return (
    <>
      {errorContent && (
        <div className="mb-6">
          <ErrorBadge content={errorContent} />
        </div>
      )}
      {successContent && (
        <div className="mb-6">
          <SuccessBadge content={successContent} />
        </div>
      )}
      <div className="border-b mb-6 border-gray-600/50">
        <div className="flex mb-8 items-center">
          <p className="text-lg mr-6 shrink-0">輸入新密碼</p>
          <div className="w-full max-w-[420px]">
            <Input
              type={NEW_PASSWORD}
              setRef={firstInputRef}
              handleChange={handleResetPassworChange}
              value={resetPasswordContent}
              errorContent={resetPasswordErrorMessage}
            />
          </div>
        </div>
        <div className="flex mb-8 items-center">
          <p className="text-lg mr-6 shrink-0">確認新密碼</p>
          <div className="w-full max-w-[420px]">
            <Input
              type={CONFIRM_NEW_PASSWORD}
              handleChange={handleConfirmPassworChange}
              value={confirmPasswordContent}
              errorContent={confirmPasswordErrorMessage}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="mr-3">
          <ProfileButton
            type={CANCEL}
            iconType={ICON_CANCEL}
            content="取消變更"
            onClick={handleCancleEditClick}
            isDisabled={isEditLoading}
          />
        </div>
        <ProfileButton
          type={DARKEN}
          iconType={ICON_EDIT}
          content="儲存變更"
          isDisabled={Boolean(
            resetPasswordErrorMessage ||
              confirmPasswordErrorMessage ||
              errorContent ||
              isEditLoading,
          )}
          onClick={handleResetPasswordClick}
        />
      </div>
    </>
  )
}
ProfileResetPassword.propTypes = {
  isEditLoading: PropTypes.bool,
}

ProfileResetPassword.defaultProps = {
  isEditLoading: false,
}
export default ProfileResetPassword
