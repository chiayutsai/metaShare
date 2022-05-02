import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import {
  NORMAL,
  ALERT,
  ICON_EYE,
  ICON_PHOTO,
  ICON_UNLIKE,
} from 'constants/buttonType'
import { ReactComponent as IconEyeSvg } from './assets/eye.svg'
import { ReactComponent as IconPhotoSvg } from './assets/photo.svg'
import { ReactComponent as IconUnLikeSvg } from './assets/unLike.svg'
import styles from './Button.scss'

const Button3D = ({ type, onClick, iconType, isDisabled, content }) => {
  useStyles(styles)
  return (
    <button
      type="button"
      className={classNames(
        `${styles.button} flex rounded items-center py-1.5 px-4 group`,
        {
          'bg-primary-50  hover:bg-primary-200': type === NORMAL,
          'bg-[#FAE9F6]': type === ALERT,
          'bg-gray-400 pointer-events-none': isDisabled,
          [styles.disable]: isDisabled,
        },
      )}
      onClick={onClick}>
      {iconType === ICON_EYE && <IconEyeSvg className={styles.eye} />}
      {iconType === ICON_PHOTO && <IconPhotoSvg className={styles.photo} />}
      {iconType === ICON_UNLIKE && <IconUnLikeSvg className={styles.unlike} />}
      <p
        className={classNames({
          'text-primary-700 group-hover:text-primary-800': type === NORMAL,
          'text-alert/80 group-hover:text-alert': type === ALERT,
          'text-gray-700': isDisabled,
        })}>
        {content}
      </p>
    </button>
  )
}

Button3D.propTypes = {
  onClick: PropTypes.func,
  iconType: PropTypes.string,
  isDisabled: PropTypes.bool,
  content: PropTypes.string,
  type: PropTypes.string,
}

Button3D.defaultProps = {
  type: '',
  onClick: () => {},
  iconType: '',
  isDisabled: false,
  content: '',
}
export default Button3D
