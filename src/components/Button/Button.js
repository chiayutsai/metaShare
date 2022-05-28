import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'

import {
  NORMAL,
  DARKEN,
  ALERT,
  ICON_EYE,
  ICON_PHOTO,
  ICON_UNLIKE,
} from 'constants/buttonType'
import { ReactComponent as IconEyeSvg } from './assets/eye.svg'
import { ReactComponent as IconLoadingSvg } from './assets/loading.svg'
import { ReactComponent as IconPhotoSvg } from './assets/photo.svg'
import { ReactComponent as IconUnLikeSvg } from './assets/unLike.svg'
import { ReactComponent as IconUploadSvg } from './assets/upload.svg'

import styles from './Button.scss'

const UpLoadButton = ({ isDisabled, onChange }) => {
  useStyles(styles)

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor="uploadBtn"
      className={classNames(
        `${styles.button} flex rounded items-center py-1.5 px-4 group bg-primary-50  hover:bg-primary-200 cursor-pointer`,
        {
          'bg-gray-400 pointer-events-none': isDisabled,
          [styles.disable]: isDisabled,
        },
      )}>
      <input
        id="uploadBtn"
        type="file"
        className="hidden"
        onChange={onChange}
      />
      <IconPhotoSvg className={styles.photo} />
      <p
        className={classNames('text-primary-700 group-hover:text-primary-800', {
          'text-gray-700': isDisabled,
        })}>
        上傳圖片
      </p>
    </label>
  )
}

UpLoadButton.propTypes = {
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
}

UpLoadButton.defaultProps = {
  isDisabled: false,
  onChange: () => {},
}

export const UpLoadLoadingButton = ({ isLoading, onChange, content }) => {
  useStyles(styles)
  const labelText = isLoading ? '上傳中' : content
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor="uploadLoadingBtn"
      className={classNames(
        `${styles['upload-button']} inline-flex justify-center rounded items-center py-2 px-4 group bg-primary-100  hover:bg-primary-200 cursor-pointer`,
        {
          '!bg-gray-400 pointer-events-none': isLoading,
        },
      )}>
      <input
        id="uploadLoadingBtn"
        type="file"
        className="hidden"
        onChange={onChange}
      />
      {isLoading && <IconLoadingSvg className={styles.loadingIcon} />}
      {!isLoading && <IconUploadSvg className={styles.upload} />}
      <p
        className={classNames('text-primary-700 group-hover:text-primary-800', {
          'text-gray-800': isLoading,
        })}>
        {labelText}
      </p>
    </label>
  )
}

UpLoadLoadingButton.propTypes = {
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  content: PropTypes.string,
}

UpLoadLoadingButton.defaultProps = {
  isLoading: false,
  onChange: () => {},
  content: '',
}

const Button = ({ type, onClick, iconType, isDisabled, content }) => {
  useStyles(styles)
  return (
    <button
      type="button"
      className={classNames(
        `${styles.button} flex rounded items-center py-1.5 px-2  mini:px-4 group`,
        {
          'bg-primary-100  hover:bg-primary-200': type === NORMAL,
          'bg-primary-700 bg-gradient-to-center from-transparent to-button3dGradient hover:bg-primary-600 hover:bg-gradient-to-center-hover hover:to-button3dGradientHover':
            type === DARKEN,
          'bg-[#f9d8e4]': type === ALERT,
          'bg-gray-400 pointer-events-none': isDisabled,
          [styles.disable]: isDisabled,
        },
      )}
      onClick={onClick}>
      {iconType === ICON_EYE && <IconEyeSvg className={styles.eye} />}
      {iconType === ICON_PHOTO && <IconPhotoSvg className={styles.photo} />}
      {iconType === ICON_UNLIKE && <IconUnLikeSvg className={styles.unlike} />}
      <p
        className={classNames('text-sm mini:text-base', {
          'text-primary-700 group-hover:text-primary-800': type === NORMAL,
          'text-white': type === DARKEN,
          'text-alert/80 group-hover:text-alert': type === ALERT,
          'text-gray-700': isDisabled,
        })}>
        {content}
      </p>
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  iconType: PropTypes.string,
  isDisabled: PropTypes.bool,
  content: PropTypes.string,
  type: PropTypes.string,
}

Button.defaultProps = {
  type: '',
  onClick: () => {},
  iconType: '',
  isDisabled: false,
  content: '',
}

export { UpLoadButton }

export default Button
