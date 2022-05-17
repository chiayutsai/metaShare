import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleComments } from 'actions/post'
import Avator from 'components/Avator/Avator'
import Button3D from 'components/Button/Button3D/Button3D'
import { userAvatorSelector } from 'selectors/user'

const PostCommentInput = ({ postId, setRef }) => {
  const dispatch = useDispatch()
  const [commentContent, setCommentContent] = useState('')
  const userAvator = useSelector(userAvatorSelector)
  const handleCommentClick = useCallback(async () => {
    if (!commentContent) {
      return
    }
    try {
      await dispatch(handleComments({ postId, content: commentContent }))
      setCommentContent('')
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, postId, commentContent])
  return (
    <div className="flex items-center w-full">
      <div className=" w-9 h-9 mr-2.5">
        <Avator avatorUrl={userAvator} isRounded />
      </div>
      <div
        className="flex w-full h-9 pl-3 py-1 pr-1 bg-gray-200 rounded-full"
        role="presentation"
        onClick={() => {}}>
        <input
          className="w-full bg-transparent text-gray-1200 outline-none placeholder:text-gray-700 focus:outline-none"
          placeholder="留言...."
          value={commentContent}
          ref={setRef}
          onChange={e => {
            const { value } = e.target
            setCommentContent(value)
          }}
        />
        <Button3D isRounded content="留言" onClick={handleCommentClick} />
      </div>
    </div>
  )
}

PostCommentInput.propTypes = {
  postId: PropTypes.string,
  setRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

PostCommentInput.defaultProps = {
  postId: '',
  setRef: () => {},
}
export default PostCommentInput
