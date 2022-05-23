/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from 'actions/modal'
import { handleProfileFollowModal } from 'actions/profile'
import Avator from 'components/Avator/Avator'
import Button from 'components/Button/Button'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import Link from 'components/Link/Link'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'
import ScrollView from 'components/ScrollView'
import { NORMAL, DARKEN } from 'constants/buttonType'
import { UNFOLLOW_MODAL } from 'constants/modal'
import { followingSelector } from 'selectors/follow'
import { profileFollowSelector } from 'selectors/profile'
import { userIdSelector } from 'selectors/user'

const ProfileFollowListModal = ({ type, userName, onClose }) => {
  const scrollViewRef = useRef()
  const setScrollViewRef = useCallback(rootRef => {
    scrollViewRef.current = rootRef.current
  }, [])
  const dispatch = useDispatch()
  const admin = useSelector(userIdSelector)
  const adminollowing = useSelector(followingSelector)
  const { following, follower } = useSelector(profileFollowSelector)
  const isFollowing = type === 'following'
  const followArray = isFollowing ? following : follower
  const hasFollow = isFollowing ? following.length >= 1 : follower.length >= 1
  const openUnFollowModal = user => () => {
    dispatch(
      setModal({
        name: UNFOLLOW_MODAL,
        user,
        type: 'profile',
      }),
    )
  }
  const handleProfileFollowClick = userId => async () => {
    try {
      await dispatch(handleProfileFollowModal({ userId }))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ModalWrapper shouldCloseOnOverlayClick disableBodyScroll onClose={onClose}>
      <div className="relative w-[360px]  bg-white rounded-lg shadow-card px-4 py-3">
        <button
          type="button"
          className="absolute top-[18px] right-4 flex items-center justify-center w-4 h-4"
          onClick={onClose}>
          <span className="absolute w-4 h-0.5 bg-primary-900 block rotate-45" />
          <span className="absolute w-4 h-0.5 bg-primary-900 block rotate-[-45deg]" />
        </button>
        <p className=" text-center font-bold text-primary-900 text-lg mb-2.5">
          {isFollowing ? '追蹤名單' : `誰追蹤${userName}`}
        </p>
        <div className="mb-3">
          <DecorationLine />
        </div>
        {!hasFollow && (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-gray-800">
              {isFollowing ? '此用戶尚未追蹤任何人喔' : '此用戶還沒有人追蹤喔'}
            </p>
          </div>
        )}
        {hasFollow && (
          <div className="h-[240px]">
            <ScrollView
              setRef={setScrollViewRef}
              vertical
              verticalWidth={4}
              verticalHoverWidth={10}
              thumbSizeChangeOnHover>
              {followArray.map(item => {
                const isFollow = Boolean(
                  adminollowing.filter(
                    follow => follow.user._id === item.user._id,
                  ).length,
                )
                const isMine = item.user._id === admin
                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between mb-3 last:mb-0">
                    <div className="flex items-center">
                      <div className=" w-10 h-10 mr-2">
                        <Avator isRounded avatorUrl={item.user.avator} />
                      </div>
                      <Link
                        to={`/metaShare/profile/${item.user._id}`}
                        className="hover:text-primary-800"
                        onClick={onClose}>
                        {item.user.name}
                      </Link>
                    </div>
                    {!isMine && (
                      <>
                        {isFollow && (
                          <Button
                            type={NORMAL}
                            content="取消追蹤"
                            onClick={openUnFollowModal(item.user)}
                          />
                        )}
                        {!isFollow && (
                          <Button
                            type={DARKEN}
                            content="追蹤"
                            onClick={handleProfileFollowClick(item.user._id)}
                          />
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </ScrollView>
          </div>
        )}
      </div>
    </ModalWrapper>
  )
}

ProfileFollowListModal.propTypes = {
  userName: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
ProfileFollowListModal.defaultProps = {
  type: '',
  userName: '',
}
export default ProfileFollowListModal
