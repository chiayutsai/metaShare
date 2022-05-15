import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setProdileEditInit,
  handleUploadProfileImage,
  handleSaveCoverImage,
} from 'actions/profile'
import { UpLoadLoadingButton } from 'components/Button/Button'
import ProfileButton from 'components/Button/ProfileButton/ProfileButton'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import SuccessBadge from 'components/SuccessBadge/SuccessBadge'
import { DARKEN, CANCEL, ICON_EDIT, ICON_CANCEL } from 'constants/buttonType'
import { profileUploadLoadingSelector } from 'selectors/profile'
import { ReactComponent as IconLoadingSvg } from '../ProfileEditContent/assets/loading.svg'

const DEFAULT_COVER_IMG_URL = 'https://imgur.com/5QFOjoN.png'

const ProfileEditCoverImage = ({ isEditLoading, profileCoverImage }) => {
  const dispatch = useDispatch()
  const [errorContent, setErrorContent] = useState('')
  const [successContent, setSuccessContent] = useState('')
  const { coverImage, isOpen } = profileCoverImage
  const [coverImgUrl, setCoverImgUrl] = useState(coverImage)
  const [isOpenCoverImgBlur, setOpenCoverImgBlur] = useState(isOpen)

  const isUploadLoading = useSelector(profileUploadLoadingSelector)
  const showDefaultImg = useCallback(() => {
    setCoverImgUrl(DEFAULT_COVER_IMG_URL)
  }, [])
  useEffect(() => {
    setCoverImgUrl(coverImage)
    setOpenCoverImgBlur(isOpen)
  }, [coverImage, isOpen])

  const handleCancleEditClick = useCallback(() => {
    dispatch(setProdileEditInit())
  }, [dispatch])

  const handleCoverImageBlur = useCallback(() => {
    setOpenCoverImgBlur(!isOpenCoverImgBlur)
  }, [isOpenCoverImgBlur])

  const handleRemoveCoverImageClick = useCallback(() => {
    setCoverImgUrl('')
  }, [setCoverImgUrl])
  const handleUploadCoverImageChange = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', 'file')

    try {
      const { imageUrl } = await dispatch(handleUploadProfileImage(formData))
      setCoverImgUrl(imageUrl)
      setErrorContent('')
    } catch (error) {
      setErrorContent(error.message)
    }
  }
  const handleSaveCoverImageClick = useCallback(async () => {
    let newCoverImage = coverImgUrl
    if (newCoverImage === DEFAULT_COVER_IMG_URL) {
      newCoverImage = ''
    }

    try {
      await dispatch(
        handleSaveCoverImage({
          coverImage: newCoverImage,
          coverImageBlur: isOpenCoverImgBlur,
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
    coverImgUrl,
    isOpenCoverImgBlur,
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
      <div className="border-b  border-gray-600/50 pb-6 mb-6">
        <div className="relative">
          {isUploadLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/40 rounded backdrop-blur-sm">
              <IconLoadingSvg className=" animate-spin" />
            </div>
          )}
          <img
            src={coverImgUrl}
            alt="cover"
            className="w-full mb-6 rounded"
            onError={showDefaultImg}
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="rounded bg-gray-400 py-2 px-4 text-gray-900 hover:bg-gray-500"
            onClick={handleRemoveCoverImageClick}>
            移除封面圖片
          </button>
          <UpLoadLoadingButton
            content="上傳封面圖片"
            isLoading={isUploadLoading}
            onChange={handleUploadCoverImageChange}
          />
        </div>
      </div>
      <div className="border-b  border-gray-600/50 mb-6">
        <div className="flex mb-6 items-center">
          <p className="text-lg mr-16 shrink-0">開啟模糊效果</p>
          <div className="flex items-center">
            <button
              type="button"
              className={classNames('rounded-full flex w-9 h-5 p-[2px] mr-1', {
                'justify-end bg-primary-600': isOpenCoverImgBlur,
                'justify-start bg-gray-600': !isOpenCoverImgBlur,
              })}
              onClick={handleCoverImageBlur}>
              <div className="rounded-full bg-white w-4 h-4" />
            </button>
            <p onClick={handleCoverImageBlur} role="presentation">
              {isOpenCoverImgBlur ? '啟用' : '未啟用'}
            </p>
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
          onClick={handleSaveCoverImageClick}
          isDisabled={Boolean(isEditLoading || isUploadLoading || errorContent)}
        />
      </div>
    </>
  )
}
ProfileEditCoverImage.propTypes = {
  profileCoverImage: PropTypes.oneOfType([PropTypes.object]),
  isEditLoading: PropTypes.bool,
}

ProfileEditCoverImage.defaultProps = {
  profileCoverImage: {},
  isEditLoading: false,
}
export default ProfileEditCoverImage
