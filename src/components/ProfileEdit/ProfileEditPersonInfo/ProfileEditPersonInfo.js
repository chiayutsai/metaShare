import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TagsInput } from 'react-tag-input-component'
import validator from 'validator'
import {
  setProfileEditInit,
  handleUploadProfileImage,
  handleSavePersonInfo,
} from 'actions/profile'
import Avator from 'components/Avator/Avator'
import { UpLoadLoadingButton } from 'components/Button/Button'
import ProfileButton from 'components/Button/ProfileButton/ProfileButton'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import Input from 'components/Input/Input'
import SuccessBadge from 'components/SuccessBadge/SuccessBadge'
import { DARKEN, CANCEL, ICON_EDIT, ICON_CANCEL } from 'constants/buttonType'
import { NAME } from 'constants/inputType'
import { profileUploadLoadingSelector } from 'selectors/profile'
import { ReactComponent as IconLoadingSvg } from '../ProfileEditContent/assets/loading.svg'
import styles from './ProfileEditPersonInfo.scss'

const ProfileEditPersonInfo = ({ isEditLoading, profileInfo }) => {
  useStyles(styles)
  const dispatch = useDispatch()
  const [errorContent, setErrorContent] = useState('')
  const [successContent, setSuccessContent] = useState('')
  const [firstTimeClick, setFirstTimeClick] = useState(true)
  const [avatorUrl, setAvatorUrl] = useState(profileInfo.avator)
  const [textAreaContent, setTextAreaContent] = useState(
    profileInfo.description,
  )
  const [nameContent, setNameContent] = useState(profileInfo.name)
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [tags, setTags] = useState(profileInfo.tags)
  const isUploadLoading = useSelector(profileUploadLoadingSelector)

  useEffect(() => {
    setAvatorUrl(profileInfo.avator)
    setTextAreaContent(profileInfo.description)
    setNameContent(profileInfo.name)
    setTags(profileInfo.tags)
  }, [profileInfo])

  const validateName = useCallback(value => {
    let message = ''
    if (validator.isEmpty(value)) {
      message = '暱稱為必填欄位'
    }
    setNameErrorMessage(message)

    return message
  }, [])
  const handleNameChange = useCallback(
    e => {
      const { value } = e.target

      setNameContent(value)

      if (!firstTimeClick) {
        validateName(value)
      }
    },
    [validateName, firstTimeClick],
  )

  const handleCancleEditClick = useCallback(() => {
    dispatch(setProfileEditInit())
  }, [dispatch])

  const handleUploadAvatorChange = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', 'file')

    try {
      const { imageUrl } = await dispatch(handleUploadProfileImage(formData))
      setAvatorUrl(imageUrl)
      setErrorContent('')
    } catch (error) {
      setErrorContent(error.message)
    }
  }

  const handleSavePersonInfoClick = useCallback(async () => {
    setFirstTimeClick(false)
    const isNameFailed = validateName(nameContent)
    if (isNameFailed) {
      return
    }
    try {
      await dispatch(
        handleSavePersonInfo({
          avator: avatorUrl,
          name: nameContent,
          description: textAreaContent,
          tags,
        }),
      )
      setErrorContent('')
      setSuccessContent('更新成功')
      setTimeout(() => {
        setSuccessContent('')
      }, 3000)
    } catch (error) {
      console.log(error)
      setErrorContent(error.message)
    }
  }, [
    dispatch,
    setErrorContent,
    setSuccessContent,
    validateName,
    nameContent,
    avatorUrl,
    textAreaContent,
    tags,
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
      <div className="border-b mb-6 border-gray-600/50 pb-6">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-6 rounded-full  shadow-card">
            {isUploadLoading && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-full">
                <div className="scale-75">
                  <IconLoadingSvg className="animate-spin" />
                </div>
              </div>
            )}
            <Avator avatorUrl={avatorUrl} isRounded />
          </div>
          <UpLoadLoadingButton
            content="上傳大頭貼"
            isLoading={isUploadLoading}
            onChange={handleUploadAvatorChange}
          />
        </div>
      </div>
      <div className="border-b mb-6 border-gray-600/50 pb-8">
        <div className="flex items-center">
          <p className="text-lg w-28 shrink-0">暱稱</p>
          <div className="w-full max-w-[420px]">
            <Input
              type={NAME}
              showIcon={false}
              value={nameContent}
              handleChange={handleNameChange}
              errorContent={nameErrorMessage}
            />
          </div>
        </div>
      </div>
      <div className="border-b mb-6 border-gray-600/50  pb-6">
        <div className="flex">
          <p className="text-lg w-28 shrink-0">個人簡介</p>
          <div className="w-full max-w-[420px]">
            <textarea
              rows="5"
              className="w-full border-[1.5px] border-gray-600 rounded px-5 py-3 outline-none focus:border-primary-600 placeholder:text-gray-700"
              placeholder="請輸入個人簡介"
              value={textAreaContent}
              onChange={e => {
                const { value } = e.target
                setTextAreaContent(value)
              }}
            />
          </div>
        </div>
      </div>
      <div className="border-b mb-6 border-gray-600/50  pb-6">
        <div className="flex ">
          <p className="text-lg w-28 shrink-0">個人標籤</p>
          <div className="w-full max-w-[420px] mb-4">
            <TagsInput
              value={tags}
              onChange={setTags}
              onExisting={() => {
                console.log('test')
              }}
              placeHolder="新增個人標籤"
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
            isDisabled={Boolean(isEditLoading || isUploadLoading)}
          />
        </div>
        <ProfileButton
          type={DARKEN}
          iconType={ICON_EDIT}
          content="儲存變更"
          onClick={handleSavePersonInfoClick}
          isDisabled={Boolean(isEditLoading || isUploadLoading || errorContent)}
        />
      </div>
    </>
  )
}
ProfileEditPersonInfo.propTypes = {
  profileInfo: PropTypes.oneOfType([PropTypes.object]),
  isEditLoading: PropTypes.bool,
}

ProfileEditPersonInfo.defaultProps = {
  profileInfo: {},
  isEditLoading: false,
}
export default ProfileEditPersonInfo
