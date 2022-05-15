import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import {
  NORMAL,
  DARKEN,
  CANCEL,
  ICON_EDIT,
  ICON_CANCEL,
  ICON_FOLLOW,
  ICON_UNFOLLOW,
} from 'constants/buttonType'
import { ReactComponent as IconCancelSvg } from './assets/cancel.svg'
import { ReactComponent as IconEditSvg } from './assets/edit.svg'
import { ReactComponent as IconFollowSvg } from './assets/follow.svg'
import { ReactComponent as IconUnFollowSvg } from './assets/unFollow.svg'

import styles from './ProfileButton.scss'

const ProfileButton = ({ type, onClick, iconType, isDisabled, content }) => {
  useStyles(styles)
  return (
    <button
      type="button"
      className={classNames(
        `${styles.button} flex rounded items-center py-2 px-4 group`,
        {
          [styles.normal]: type === NORMAL,
          [styles.darken]: type === DARKEN,
          [styles.cancel]: type === CANCEL,
          [styles.disable]: isDisabled,
        },
      )}
      onClick={onClick}>
      {iconType === ICON_EDIT && <IconEditSvg className={styles.edit} />}
      {iconType === ICON_CANCEL && <IconCancelSvg className={styles.trash} />}
      {iconType === ICON_FOLLOW && <IconFollowSvg className={styles.follow} />}
      {iconType === ICON_UNFOLLOW && (
        <IconUnFollowSvg className={styles.unfollow} />
      )}
      <p
        className={classNames('font-bold text-sm', {
          'text-primary-900 ': type === NORMAL,
          'text-primary-50': type === DARKEN,
          'text-gray-1100': type === CANCEL,
          '!text-gray-700': isDisabled,
        })}>
        {content}
      </p>
    </button>
  )
}

ProfileButton.propTypes = {
  onClick: PropTypes.func,
  iconType: PropTypes.string,
  isDisabled: PropTypes.bool,
  content: PropTypes.string,
  type: PropTypes.string,
}

ProfileButton.defaultProps = {
  type: '',
  onClick: () => {},
  iconType: '',
  isDisabled: false,
  content: '',
}

export default ProfileButton
