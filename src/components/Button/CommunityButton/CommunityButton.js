import classNames from 'classnames'
import PropTypes from 'prop-types'
import { GOOGLE, FACEBOOK } from 'constants/buttonType'
import { ReactComponent as IconFacebookSvg } from './assets/facebook.svg'
import { ReactComponent as IconGoogleSvg } from './assets/google.svg'

const CommunityButton = ({ type, isDisabled, onClick, login }) => (
  <button
    type="button"
    className={classNames(
      'flex items-center justify-center w-full rounded px-2 py-1 bg-primary-100/80 dark:bg-dark-primary-400 border border-primary-300 group hover:bg-primary-100 dark:hover:bg-dark-primary-500',
      {
        '!bg-gray-400 dark:!bg-gray-1100 dark:!border-gray-1200 !border-gray-600 pointer-events-none': isDisabled,
      },
    )}
    onClick={onClick}>
    {type === GOOGLE && (
      <IconGoogleSvg
        className={classNames({
          'grayscale opacity-50': isDisabled,
        })}
      />
    )}
    {type === FACEBOOK && (
      <IconFacebookSvg
        className={classNames({
          'grayscale opacity-50': isDisabled,
        })}
      />
    )}
    <p
      className={classNames(
        'ml-2 text-primary-900/80 font-bold group-hover:text-primary-900 dark:group-hover:text-primary-100',
        {
          '!text-gray-700 ': isDisabled,
        },
      )}>
      使用 {type} {login ? '登入' : '註冊'}
    </p>
  </button>
)
CommunityButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  login: PropTypes.bool,
}

CommunityButton.defaultProps = {
  type: '',
  isDisabled: false,
  onClick: () => {},
  login: false,
}
export default CommunityButton
