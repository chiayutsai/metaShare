import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setPostModal } from 'actions/postModal'
import Button3D from 'components/Button/Button3D/Button3D'

const NoPost = ({ isAdmin }) => {
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(setPostModal({}))
  }, [dispatch])
  return (
    <div className="flex items-center justify-center w-full py-6 bg-white shadow-card rounded">
      <p className="text-xs text-gray-700 mr-3">
        {isAdmin ? '沒有相關貼文，快去新增一則貼文吧！' : '沒有相關貼文喔'}
      </p>
      {isAdmin && <Button3D content="新增貼文" onClick={handleClick} />}
    </div>
  )
}

NoPost.propTypes = {
  isAdmin: PropTypes.bool,
}

NoPost.defaultProps = {
  isAdmin: false,
}
export default NoPost
