import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setProfileEdit, setProdileEditInit } from 'actions/profile'
import Avator from 'components/Avator/Avator'
import ProfileButton from 'components/Button/ProfileButton/ProfileButton'
import { NORMAL, DARKEN, ICON_EDIT, ICON_FOLLOW } from 'constants/buttonType'
import styles from './ProfileHeader.scss'

const ProfileHeader = ({
  isAdmin,
  isEdit,
  avatorUrl,
  name,
  profileCoverImage,
  following,
  follower,
}) => {
  useStyles(styles)
  const dispatch = useDispatch()
  const { coverImage, isOpen } = profileCoverImage
  const handleEditClick = useCallback(() => {
    dispatch(setProfileEdit())
  }, [dispatch])
  const handleCancleEditClick = useCallback(() => {
    dispatch(setProdileEditInit())
  }, [dispatch])
  return (
    <>
      <div className="relative w-full h-[420px] px-20 bg-white">
        {coverImage && (
          <>
            {isOpen && (
              <div className={styles.cover}>
                <img className="w-full  h-full" src={coverImage} alt="cover" />
              </div>
            )}

            <img
              className="relative w-full h-full"
              src={coverImage}
              alt="cover"
            />
          </>
        )}
        {!coverImage && (
          <div className={classNames(styles.cover, styles['default-cover'])} />
        )}
      </div>
      <div className="relative  bg-white   shadow-profile">
        <div className="container pt-3 pb-10 px-9 flex justify-between items-center">
          <div className="  flex items-center">
            <div className="w-40" />
            <div className="absolute -top-16 w-40 h-40 p-1 rounded-full bg-gradient-to-br from-[#B9D7FF] to-primary-700">
              <Avator avatorUrl={avatorUrl} isRounded />
            </div>
            <div className=" flex-col ml-9">
              <p className="font-bold text-3xl mb-1">{name}</p>
              <div className="flex items-center">
                <p className="text-gray-1000">
                  正在追蹤
                  <span className="text-lg font-bold mx-0.5">{following}</span>
                  人
                </p>
                <div className="w-[1px] h-6 bg-gray-600 mx-3" />
                <p className="text-gray-1000">
                  <span className="text-lg font-bold mr-0.5">{follower}</span>
                  位追蹤者
                </p>
              </div>
            </div>
          </div>

          <div className="flex">
            {isAdmin && !isEdit && (
              <ProfileButton
                type={NORMAL}
                iconType={ICON_EDIT}
                content="編輯個人資料"
                onClick={handleEditClick}
              />
            )}
            {isAdmin && isEdit && (
              <ProfileButton
                type={NORMAL}
                content="結束編輯"
                onClick={handleCancleEditClick}
              />
            )}
            {!isAdmin && (
              <ProfileButton
                type={DARKEN}
                iconType={ICON_FOLLOW}
                content="追蹤"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
ProfileHeader.propTypes = {
  isAdmin: PropTypes.bool,
  isEdit: PropTypes.bool,
  avatorUrl: PropTypes.string,
  name: PropTypes.string,
  profileCoverImage: PropTypes.oneOfType([PropTypes.object]),
  following: PropTypes.number,
  follower: PropTypes.number,
}

ProfileHeader.defaultProps = {
  isAdmin: true,
  isEdit: false,
  avatorUrl: '',
  name: '',
  profileCoverImage: {},
  following: 0,
  follower: 0,
}
export default ProfileHeader
