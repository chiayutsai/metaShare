import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setPostModal } from 'actions/postModal'
import Avator from 'components/Avator/Avator'

const PostInput = () => {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(setPostModal({}))
  }, [dispatch])
  return (
    <div className="flex items-center px-6 py-3 rounded shadow-card bg-white">
      <div className="w-12 h-12 mr-3 shrink-0">
        <Avator isRounded />
      </div>
      <button
        type="button"
        className="w-full rounded-full p-3 bg-gray-100 text-gray-900 text-left hover:bg-primary-50 hover:text-primary-800"
        onClick={handleClick}>
        今天在想什麼呢?
      </button>
    </div>
  )
}
export default PostInput
