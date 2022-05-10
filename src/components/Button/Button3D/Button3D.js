import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ReactComponent as IconSearchSvg } from './assets/Icon.svg'

const Button3D = ({
  className,
  onClick,
  isRounded,
  icon,
  isDisabled,
  content,
}) => (
  <button
    type="button"
    className={classNames(`${className} button-3d button-3d-primary`, {
      'button-3d-rounded': isRounded,
      'button-3d-disabled': !isRounded && isDisabled,
      'button-3d-rounded-disabled': isRounded && isDisabled,
    })}
    onClick={onClick}>
    {content}
    {icon && <IconSearchSvg className="ml-1" />}
  </button>
)

Button3D.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  isRounded: PropTypes.bool,
  icon: PropTypes.bool,
  isDisabled: PropTypes.bool,
  content: PropTypes.string,
}

Button3D.defaultProps = {
  className: '',
  onClick: () => {},
  isRounded: false,
  icon: false,
  isDisabled: false,
  content: '',
}
export default Button3D
