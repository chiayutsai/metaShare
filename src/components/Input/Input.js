import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import {
  EMAIL,
  PASSWORD,
  NEW_PASSWORD,
  CONFIRM_NEW_PASSWORD,
  NAME,
  INPUT_TYPE_PLACEHOLDER_MAP,
  INPUT_TYPE_LABEL_MAP,
} from 'constants/inputType'
import { ReactComponent as IconCloseEyeSvg } from './assets/closeEye.svg'
import { ReactComponent as IconEmailSvg } from './assets/email.svg'
import { ReactComponent as IconErrorSvg } from './assets/error.svg'
import { ReactComponent as IconEyeSvg } from './assets/eye.svg'
import { ReactComponent as IconPasswordSvg } from './assets/password.svg'
import { ReactComponent as IconPersonSvg } from './assets/person.svg'
import styles from './Input.scss'

const Input = ({ type, isError, errorContent, showLabel }) => {
  useStyles(styles)
  const isPassword =
    type === PASSWORD || type === NEW_PASSWORD || type === CONFIRM_NEW_PASSWORD
  const [showPasseord, setShowPasswrod] = useState(false)
  const [isFocus, setFocus] = useState(false)

  const handleShowPasswordClick = useCallback(() => {
    setShowPasswrod(!showPasseord)
  }, [showPasseord])
  const inputTypePassword = isPassword && !showPasseord
  return (
    <div
      className={classNames(
        'relative flex items-center w-full max-h-12 rounded border-[1.5px] border-gray-600 px-5 py-3',
        {
          'border-primary-600': isFocus,
          '!border-alert': isError,
        },
      )}>
      {showLabel && (
        <label
          htmlFor="input"
          className={classNames(
            'absolute -top-3 left-3 bg-white px-2 font-bold text-gray-900 ',
            {
              '!text-primary-700': isFocus,
              '!text-alert': isError,
            },
          )}>
          {INPUT_TYPE_LABEL_MAP[type]}
        </label>
      )}
      {type === EMAIL && (
        <IconEmailSvg
          className={classNames(styles.icon, {
            [styles.focus]: isFocus,
            [styles.error]: isError,
          })}
        />
      )}
      {isPassword && (
        <IconPasswordSvg
          className={classNames(styles.icon, {
            [styles.focus]: isFocus,
            [styles.error]: isError,
          })}
        />
      )}
      {type === NAME && (
        <IconPersonSvg
          className={classNames(styles.icon, {
            [styles.focus]: isFocus,
            [styles.error]: isError,
          })}
        />
      )}

      <input
        type={inputTypePassword ? 'password' : 'text'}
        id="input"
        className={classNames(
          'w-full bg-transparent text-gray-1200 outline-none placeholder:text-gray-700 focus:outline-none',
          {
            'placeholder:text-primary-300 ': isFocus,
            '!text-alert placeholder:text-alert/50': isError,
          },
        )}
        placeholder={INPUT_TYPE_PLACEHOLDER_MAP[type]}
        onChange={e => {
          const { value } = e.target
          console.log(value)
        }}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
      />

      {isPassword && showPasseord && (
        <IconEyeSvg
          onClick={handleShowPasswordClick}
          className={classNames(styles.icon, {
            [styles.focus]: isFocus,
            [styles.error]: isError,
          })}
          role="presentation"
        />
      )}
      {isPassword && !showPasseord && (
        <IconCloseEyeSvg
          onClick={handleShowPasswordClick}
          className={classNames(styles.icon, {
            [styles.focus]: isFocus,
            [styles.error]: isError,
          })}
          role="presentation"
        />
      )}
      {isError && (
        <div className="absolute -bottom-7 left-0 flex items-center">
          <IconErrorSvg />
          <p className="relative -top-[1px] text-alert ml-2 text-sm">
            {errorContent}
          </p>
        </div>
      )}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  isError: PropTypes.bool,
  errorContent: PropTypes.string,
  showLabel: PropTypes.bool,
}

Input.defaultProps = {
  type: '',
  isError: false,
  errorContent: '',
  showLabel: false,
}
export default Input
