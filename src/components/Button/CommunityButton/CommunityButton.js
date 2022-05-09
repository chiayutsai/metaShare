import classNames from 'classnames'
import PropTypes from 'prop-types'
import { GOOGLE, FACEBOOK } from 'constants/buttonType'
import { ReactComponent as IconFacebookSvg } from './assets/facebook.svg'
import { ReactComponent as IconGoogleSvg } from './assets/google.svg'

const CommunityButton = ({ type, isDisabled, onClick }) => (
  <button
    type="button"
    className={classNames(
      'flex items-center justify-center w-full rounded px-2 py-1 bg-primary-100/80 border border-primary-300 group hover:bg-primary-100',
      {
        '!bg-gray-400 !border-gray-600 pointer-events-none': isDisabled,
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
        'ml-2 text-primary-900/80 font-bold group-hover:text-primary-900',
        {
          '!text-gray-700': isDisabled,
        },
      )}>
      使用 {type} 登入
    </p>
  </button>
)

CommunityButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
}

CommunityButton.defaultProps = {
  type: '',
  isDisabled: false,
  onClick: () => {},
}
export default CommunityButton