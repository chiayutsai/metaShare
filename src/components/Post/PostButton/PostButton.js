import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { LIKE, POST_BUTTON_TEXY_MAP, COMMENT } from 'constants/post'
import { ReactComponent as IconCommenthSvg } from './assets/comment.svg'
import { ReactComponent as IconisLikehSvg } from './assets/isLike.svg'
import { ReactComponent as IconlikehSvg } from './assets/like.svg'
import styles from './PostButton.scss'

const PostButton = ({ type, isLike, onClick }) => {
  useStyles(styles)
  return (
    <button
      type="button"
      className={`${styles.button} flex items-center justify-center group p-1 w-full rounded hover:bg-primary-50`}
      onClick={onClick}>
      <div className="mr-2">
        {type === LIKE && !isLike && <IconlikehSvg className={styles.icon} />}
        {type === LIKE && isLike && <IconisLikehSvg />}
        {type === COMMENT && <IconCommenthSvg className={styles.icon} />}
      </div>
      <p className="text-gray-1000 group-hover:text-primary-800">
        {POST_BUTTON_TEXY_MAP[type]}
      </p>
    </button>
  )
}

PostButton.propTypes = {
  type: PropTypes.string.isRequired,
  isLike: PropTypes.bool,
  onClick: PropTypes.func,
}

PostButton.defaultProps = {
  isLike: false,
  onClick: () => {},
}

export default PostButton
