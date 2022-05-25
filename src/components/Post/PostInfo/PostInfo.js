import PropTypes from 'prop-types'
import { LIKE, POST_BUTTON_TEXY_MAP, COMMENT } from 'constants/post'
import { ReactComponent as IconCommenthSvg } from './assets/comment.svg'
import { ReactComponent as IconlikehSvg } from './assets/like.svg'
import { ReactComponent as IconNoCommenthSvg } from './assets/noComment.svg'
import { ReactComponent as IconNoLikehSvg } from './assets/noLike.svg'

const PostInfo = ({ type, likeAmount, commentAmount, onClick }) => (
  <div className="flex items-center">
    {type === LIKE && (
      <>
        {!likeAmount && (
          <>
            <IconNoLikehSvg className="mr-2" />
            <p className="text-xs xs:text-base text-gray-800">
              成為第一個喜歡的朋友
            </p>
          </>
        )}
        {!!likeAmount && (
          <button
            type="button"
            className="flex items-center group"
            onClick={onClick}>
            <IconlikehSvg className="mr-2" />
            <p className="text-xs xs:text-base text-gray-1000 group-hover:text-primary-800">
              {likeAmount}個人
              {POST_BUTTON_TEXY_MAP[type]}
            </p>
          </button>
        )}
      </>
    )}
    {type === COMMENT && (
      <>
        {!commentAmount && (
          <>
            <IconNoCommenthSvg className="mr-2" />
            <p className="text-xs xs:text-base text-gray-800">尚無留言</p>
          </>
        )}
        {!!commentAmount && (
          <button
            type="button"
            className="flex items-center group"
            onClick={onClick}>
            <IconCommenthSvg className="mr-2" />
            <p className="text-xs xs:text-base text-gray-1000 group-hover:text-primary-800">
              {commentAmount}則{POST_BUTTON_TEXY_MAP[type]}
            </p>
          </button>
        )}
      </>
    )}
  </div>
)

PostInfo.propTypes = {
  type: PropTypes.string.isRequired,
  likeAmount: PropTypes.number,
  commentAmount: PropTypes.number,
  onClick: PropTypes.func,
}

PostInfo.defaultProps = {
  likeAmount: 0,
  commentAmount: 0,
  onClick: () => {},
}

export default PostInfo
