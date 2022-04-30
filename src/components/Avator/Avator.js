import classNames from 'classnames'
import PropTypes from 'prop-types'
import perosn from './assets/person.png'

const Avator = ({ isBorder, isRounded }) => (
  <div
    className={classNames('w-full h-full', {
      'rounded-lg': !isRounded,
      'rounded-full': isRounded,
      'p-[1px] bg-gradient-to-br from-[#B9D7FF] to-primary-700': isBorder,
    })}>
    <img
      src={perosn}
      alt="person"
      className={classNames({
        'rounded-lg': !isRounded,
        'rounded-full': isRounded,
      })}
    />
  </div>
)

Avator.propTypes = {
  isBorder: PropTypes.bool,
  isRounded: PropTypes.bool,
}

Avator.defaultProps = {
  isBorder: false,
  isRounded: false,
}
export default Avator
