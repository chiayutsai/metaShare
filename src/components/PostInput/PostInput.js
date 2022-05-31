import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setPostModal } from 'actions/postModal'
import Avator from 'components/Avator/Avator'

const PostInput = ({ avatorUrl }) => {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(setPostModal({}))
  }, [dispatch])
  return (
    <div className="flex items-center px-3 xs:px-6 py-3 rounded shadow-card dark:shadow-dark-card bg-white dark:bg-dark-bg">
      <div className="w-12 h-12 mr-3 shrink-0">
        <Avator isRounded avatorUrl={avatorUrl} />
      </div>
      <button
        type="button"
        className="w-full rounded-full p-3 bg-gray-100 dark:bg-dark-primary-500/20  text-gray-900 text-left hover:bg-primary-50 dark:hover:bg-dark-primary-500/30 hover:text-primary-800 dark:hover:text-primary-400"
        onClick={handleClick}>
        今天在想什麼呢?
      </button>
    </div>
  )
}
PostInput.propTypes = {
  avatorUrl: PropTypes.string,
}

PostInput.defaultProps = {
  avatorUrl: '',
}
export default PostInput
