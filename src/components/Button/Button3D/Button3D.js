import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ReactComponent as IconSearchSvg } from './assets/Icon.svg'

const Button3D = ({ onClick, isRounded, icon, isDisabled, content }) => (
  <div
    className={classNames('button-3d button-3d-primary', {
      'button-3d-rounded': isRounded,
      'button-3d-disabled': !isRounded && isDisabled,
      'button-3d-rounded-disabled': isRounded && isDisabled,
    })}
    role="presentation"
    onClick={onClick}>
    {content}
    {icon && <IconSearchSvg className="ml-1" />}
  </div>
)

Button3D.propTypes = {
  onClick: PropTypes.func,
  isRounded: PropTypes.bool,
  icon: PropTypes.bool,
  isDisabled: PropTypes.bool,
  content: PropTypes.string,
}

Button3D.defaultProps = {
  onClick: () => {},
  isRounded: false,
  icon: false,
  isDisabled: false,
  content: '',
}
export default Button3D
