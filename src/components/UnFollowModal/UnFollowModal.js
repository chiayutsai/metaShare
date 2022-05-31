/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { handleUpdateUserFollow } from 'actions/follow'
import { handleProfileFollowModal, handleProfileFollow } from 'actions/profile'
import Avator from 'components/Avator/Avator'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'

const UnFollowModal = ({ type, user, onClose }) => {
  const dispatch = useDispatch()
  const handleUpdateUserFollowClick = userId => async () => {
    if (type === 'profile') {
      try {
        await dispatch(handleProfileFollowModal({ userId }))
        onClose()
      } catch (error) {
        console.log(error)
      }
    } else if (type === 'otherProfile') {
      try {
        await dispatch(handleProfileFollow({ userId }))
        onClose()
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await dispatch(handleUpdateUserFollow({ userId }))
        onClose()
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <ModalWrapper disableBodyScroll onClose={onClose}>
      <div className="relative w-[300px] xs:w-[360px] bg-white  dark:bg-dark-bg rounded-lg shadow-card dark:shadow-dark-card px-4 py-3">
        <button
          type="button"
          className="absolute top-[18px] right-4 flex items-center justify-center w-4 h-4"
          onClick={onClose}>
          <span className="absolute w-4 h-0.5 bg-alert block rotate-45" />
          <span className="absolute w-4 h-0.5 bg-alert block rotate-[-45deg]" />
        </button>
        <p className=" text-center font-bold text-alert text-lg mb-4">
          取消追蹤
        </p>
        <div className="mb-4">
          <div className=" relative w-full h-[1px] bg-alert/50 opacity-50 before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-alert/50 before:-top-[2.5px] after:absolute after:w-1.5 after:h-1.5 after:rounded-full after:bg-alert/50 after:-top-[2.5px] after:right-0" />
        </div>

        <div className="flex items-center pb-4 border-b border-gray-500/50 mb-4">
          <div className="w-16 h-16 mr-4">
            <Avator isRounded avatorUrl={user.avator} />
          </div>
          <p>確定要取消追蹤{user.name}嗎?</p>
        </div>
        <div className="w-full flex justify-end">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-800 py-1.5 px-3 rounded border border-gray-800 mr-2 hover:bg-gray-500 hover:border-gray-500 dark:hover:text-gray-1200">
              取消
            </button>
            <button
              type="button"
              onClick={handleUpdateUserFollowClick(user._id)}
              className="text-white bg-alert/80 py-1.5 px-3 border border-alert/80 rounded hover:bg-alert">
              確定取消
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

UnFollowModal.propTypes = {
  type: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onClose: PropTypes.func.isRequired,
}
UnFollowModal.defaultProps = {
  type: '',
}
export default UnFollowModal
