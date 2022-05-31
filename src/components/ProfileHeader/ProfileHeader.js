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
      <div className="relative w-full h-[240px] xs:h-[300px] md:h-[320px] mid:h-[420px]  md:px-12 xl:px-20 bg-white dark:bg-dark-bg">
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
      <div className="relative -top-12 md:top-0 rounded-tl-[24px] rounded-tr-[24px] bg-white  dark:bg-dark-bg shadow-m-profile  md:shadow-profile md:rounded-none">
        <div className="container pt-16 sm:pt-[72px] pb-4 xs:pb-8 md:pt-3 md:pb-10 px-12 xl:px-16 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center mb-3 md:mb-0">
            <div className="hidden md:block w-40" />
            <div className="absolute -top-16 sm:-top-[84px] md:-top-12 xl:-top-16 w-[120px] h-[120px] sm:w-36 sm:h-36 xl:w-40 xl:h-40 p-1 rounded-full bg-gradient-to-br from-[#B9D7FF] to-primary-700">
              <Avator key={avatorUrl} avatorUrl={avatorUrl} isRounded />
            </div>
            <div className="md:ml-6 xl:ml-9">
              <p className="font-bold text-center md:text-left text-2xl sm:text-3xl mb-1">
                {name}
              </p>
              <div className="hidden md:flex items-center">
                <button
                  type="button"
                  className="text-gray-1000"
                  onClick={openFollowingModal}>
                  正在追蹤
                  <span className="text-lg font-bold mx-0.5 text-primary-900 dark:text-primary-400">
                    {following.length}
                  </span>
                  人
                </button>
                <div className="w-[1px] h-6 bg-gray-600 mx-3" />
                <button
                  type="button"
                  className="text-gray-1000"
                  onClick={openFollowerModal}>
                  <span className="text-lg font-bold mr-0.5 text-primary-900 dark:text-primary-400">
                    {follower.length}
                  </span>
                  位追蹤者
                </button>
              </div>
            </div>
          </div>
          <div className="flex md:hidden  mb-5">
            <div className="flex flex-col items-center border-r border-gray-600 pr-6">
              <button
                type="button"
                className="text-primary-900 text-xl font-bold hover:text-primary-700"
                onClick={openFollowingModal}>
                {following.length}
              </button>
              <p className="text-gray-1000 text-sm">追蹤中</p>
            </div>
            <div className="flex flex-col items-center pl-6">
              <button
                type="button"
                className="text-primary-900 text-xl font-bold hover:text-primary-700"
                onClick={openFollowerModal}>
                {follower.length}
              </button>
              <p className="text-gray-1000 text-sm">關注數</p>
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
