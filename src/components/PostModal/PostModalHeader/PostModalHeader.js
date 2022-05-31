import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from 'actions/modal'
import Avator from 'components/Avator/Avator'
import { CANCEL_POST_MODAL } from 'constants/modal'

const PostModalHeader = ({ avatorUrl, onClose }) => {
  const dispatch = useDispatch()
  const openCancelPostModal = useCallback(() => {
    dispatch(
      setModal({
        name: CANCEL_POST_MODAL,
        closeModal: onClose,
      }),
    )
  }, [dispatch, onClose])
  return (
    <div className="relative flex  items-center justify-between p-3 rounded-t-lg bg-white dark:bg-dark-bg">
      <div className="absolute w-20 h-20 sm:w-[106px] sm:h-[106px] bottom-3 sm:bottom-0 left-0 p-2 sm:p-4 bg-white dark:bg-dark-bg rounded-full">
        <div className="w-full h-full p-2 bg-gradient-to-br from-[#b9d7ff83] to-primary-700/50 rounded-full">
          <Avator avatorUrl={avatorUrl} isRounded />
        </div>
      </div>
      <p className=" ml-20 sm:ml-24  sm:text-lg text-gray-1100">說點什麼呢?</p>
      <button
        type="button"
        onClick={openCancelPostModal}
        className="relative flex items-center justify-center w-8 h-8  rounded-full hover:bg-primary-100 dark:hover:bg-dark-primary-500/20">
        <span className="absolute block w-6 h-1 bg-primary-900 dark:bg-primary-400 rounded-full rotate-45" />
        <span className="absolute block w-6 h-1 bg-primary-900 dark:bg-primary-400 rounded-full rotate-[-45deg]" />
      </button>
    </div>
  )
}

PostModalHeader.propTypes = {
  avatorUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
PostModalHeader.defaultProps = {
  avatorUrl: '',
}
export default PostModalHeader
