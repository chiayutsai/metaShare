/* eslint-disable css-modules/no-undef-class */
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { LIKE, POST_BUTTON_TEXY_MAP, COMMENT } from 'constants/post'
import { ReactComponent as IconCommenthSvg } from './assets/comment.svg'
import { ReactComponent as IconlikehSvg } from './assets/like.svg'
import { ReactComponent as IconNoCommenthSvg } from './assets/noComment.svg'
import { ReactComponent as IconNoLikehSvg } from './assets/noLike.svg'
import styles from './PostInfo.scss'

const PostInfo = ({ type, likeAmount, commentAmount, onClick }) => {
  useStyles(styles)
  return (
    <div className="flex items-center">
      {type === LIKE && (
        <>
          {!likeAmount && (
            <>
              <IconNoLikehSvg className="mr-2" />
              <p className="text-xs xs:text-base text-gray-800 dark:text-white/40">
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
              <p className="text-xs xs:text-base text-gray-1000 group-hover:text-primary-800 dark:group-hover:text-primary-400">
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
              <p className="text-xs xs:text-base text-gray-800 dark:text-white/40">
                尚無留言
              </p>
            </>
          )}
          {!!commentAmount && (
            <button
              type="button"
              className="flex items-center group"
              onClick={onClick}>
              <IconCommenthSvg className={`${styles.comment} mr-2`} />
              <p className="text-xs xs:text-base text-gray-1000 group-hover:text-primary-800 dark:group-hover:text-primary-400">
                {commentAmount}則{POST_BUTTON_TEXY_MAP[type]}
              </p>
            </button>
          )}
        </>
      )}
    </div>
  )
}

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
