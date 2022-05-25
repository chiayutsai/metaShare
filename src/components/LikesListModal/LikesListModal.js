/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleUpdateUserFollow } from 'actions/follow'
import { setModal } from 'actions/modal'
import Avator from 'components/Avator/Avator'
import Button from 'components/Button/Button'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import Link from 'components/Link/Link'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'
import ScrollView from 'components/ScrollView'
import { NORMAL, DARKEN } from 'constants/buttonType'
import { UNFOLLOW_MODAL } from 'constants/modal'
import { followingSelector } from 'selectors/follow'
import { userIdSelector } from 'selectors/user'

const LikesListModal = ({ likes, onClose }) => {
  const scrollViewRef = useRef()
  const setScrollViewRef = useCallback(rootRef => {
    scrollViewRef.current = rootRef.current
  }, [])
  const dispatch = useDispatch()
  const following = useSelector(followingSelector)
  const admin = useSelector(userIdSelector)
  const openUnFollowModal = user => () => {
    dispatch(
      setModal({
        name: UNFOLLOW_MODAL,
        user,
      }),
    )
  }
  const handleUpdateUserFollowClick = userId => async () => {
    try {
      await dispatch(handleUpdateUserFollow({ userId }))
    } catch (error) {
      console.log(error)
    }
  }
  console.log(likes)
  return (
    <ModalWrapper shouldCloseOnOverlayClick disableBodyScroll onClose={onClose}>
      <div className="relative w-[300px] xs:w-[360px]  bg-white rounded-lg shadow-card px-4 py-3">
        <button
          type="button"
          className="absolute top-[18px] right-4 flex items-center justify-center w-4 h-4"
          onClick={onClose}>
          <span className="absolute w-4 h-0.5 bg-primary-900 block rotate-45" />
          <span className="absolute w-4 h-0.5 bg-primary-900 block rotate-[-45deg]" />
        </button>
        <p className=" text-center font-bold text-primary-900 text-lg mb-2.5">
          喜歡的用戶
        </p>
        <div className="mb-3">
          <DecorationLine />
        </div>

        <div className="h-[240px]">
          <ScrollView
            setRef={setScrollViewRef}
            vertical
            verticalWidth={4}
            verticalHoverWidth={10}
            thumbSizeChangeOnHover>
            {likes.map(item => {
              const isFollow = Boolean(
                following.filter(follow => follow.user._id === item._id).length,
              )
              const isMine = item._id === admin
              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between mb-3 last:mb-0">
                  <div className="flex items-center">
                    <div className=" w-10 h-10 mr-2">
                      <Avator isRounded avatorUrl={item.avator} />
                    </div>
                    <Link
                      to={`/metaShare/profile/${item._id}`}
                      className="hover:text-primary-800"
                      onClick={onClose}>
                      {item.name}
                    </Link>
                  </div>
                  {!isMine && (
                    <>
                      {isFollow && (
                        <Button
                          type={NORMAL}
                          content="取消追蹤"
                          onClick={openUnFollowModal(item)}
                        />
                      )}
                      {!isFollow && (
                        <Button
                          type={DARKEN}
                          content="追蹤"
                          onClick={handleUpdateUserFollowClick(item._id)}
                        />
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </ScrollView>
        </div>
      </div>
    </ModalWrapper>
  )
}

LikesListModal.propTypes = {
  likes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default LikesListModal
