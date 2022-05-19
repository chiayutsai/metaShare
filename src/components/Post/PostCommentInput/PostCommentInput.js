import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import Avator from 'components/Avator/Avator'
import Button3D from 'components/Button/Button3D/Button3D'
import { userAvatorSelector } from 'selectors/user'

const PostCommentInput = ({
  setRef,
  onClick,
  commentContent,
  setCommentContent,
}) => {
  const userAvator = useSelector(userAvatorSelector)

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
        <Button3D isRounded content="留言" onClick={onClick} />
      </div>
    </div>
  )
}

PostCommentInput.propTypes = {
  onClick: PropTypes.func,
  commentContent: PropTypes.string,
  setCommentContent: PropTypes.func,
  setRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

PostCommentInput.defaultProps = {
  commentContent: '',
  setRef: () => {},
  setCommentContent: () => {},
  onClick: () => {},
}
export default PostCommentInput
