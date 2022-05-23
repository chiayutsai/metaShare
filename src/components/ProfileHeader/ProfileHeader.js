/* eslint-disable no-underscore-dangle */
import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from 'actions/modal'
import {
  setProfileEdit,
  setProfileEditInit,
  handleProfileFollow,
} from 'actions/profile'
import Avator from 'components/Avator/Avator'
import ProfileButton from 'components/Button/ProfileButton/ProfileButton'
import {
  NORMAL,
  DARKEN,
  ICON_EDIT,
  ICON_FOLLOW,
  ICON_UNFOLLOW,
} from 'constants/buttonType'
import { UNFOLLOW_MODAL, PROFILE_FOLLOW_LIST_MODAL } from 'constants/modal'

import { userIdSelector } from 'selectors/user'
import styles from './ProfileHeader.scss'

const ProfileHeader = ({
  isAdmin,
  isEdit,
  profileUserId,
  avatorUrl,
  name,
  profileCoverImage,
  following,
  follower,
}) => {
  useStyles(styles)
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const { coverImage, isOpen } = profileCoverImage
  const handleEditClick = useCallback(() => {
    dispatch(setProfileEdit())
  }, [dispatch])
  const handleCancleEditClick = useCallback(() => {
    dispatch(setProfileEditInit())
  }, [dispatch])
  const isFollow = useMemo(
    () => Boolean(follower.filter(item => item.user._id === userId).length),
    [follower, userId],
  )
  const handleProfileFollowClick = useCallback(async () => {
    try {
      await dispatch(handleProfileFollow({ userId: profileUserId }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, profileUserId])
  const openUnFollowModal = useCallback(() => {
    dispatch(
      setModal({
        name: UNFOLLOW_MODAL,
        user: { avator: avatorUrl, name, _id: profileUserId },
        type: 'otherProfile',
      }),
    )
  }, [dispatch, avatorUrl, name, profileUserId])
  const openFollowingModal = useCallback(() => {
    dispatch(
      setModal({
        name: PROFILE_FOLLOW_LIST_MODAL,
        type: 'following',
      }),
    )
  }, [dispatch])
  const openFollowerModal = useCallback(() => {
    dispatch(
      setModal({
        name: PROFILE_FOLLOW_LIST_MODAL,
        type: 'follower',
        userName: name,
      }),
    )
  }, [dispatch, name])
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
                <button
                  type="button"
                  className="text-gray-1000"
                  onClick={openFollowingModal}>
                  正在追蹤
                  <span className="text-lg font-bold mx-0.5 text-primary-900">
                    {following.length}
                  </span>
                  人
                </button>
                <div className="w-[1px] h-6 bg-gray-600 mx-3" />
                <button
                  type="button"
                  className="text-gray-1000"
                  onClick={openFollowerModal}>
                  <span className="text-lg font-bold mr-0.5 text-primary-900">
                    {follower.length}
                  </span>
                  位追蹤者
                </button>
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
            {!isAdmin && isFollow && (
              <ProfileButton
                type={NORMAL}
                iconType={ICON_UNFOLLOW}
                content="取消追蹤"
                onClick={openUnFollowModal}
              />
            )}
            {!isAdmin && !isFollow && (
              <ProfileButton
                type={DARKEN}
                iconType={ICON_FOLLOW}
                content="追蹤"
                onClick={handleProfileFollowClick}
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
  profileUserId: PropTypes.string,
  avatorUrl: PropTypes.string,
  name: PropTypes.string,
  profileCoverImage: PropTypes.oneOfType([PropTypes.object]),
  following: PropTypes.oneOfType([PropTypes.array]),
  follower: PropTypes.oneOfType([PropTypes.array]),
}

ProfileHeader.defaultProps = {
  isAdmin: true,
  isEdit: false,
  profileUserId: '',
  avatorUrl: '',
  name: '',
  profileCoverImage: {},
  following: [],
  follower: [],
}
export default ProfileHeader
