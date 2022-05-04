import classNames from 'classnames'
import PropTypes from 'prop-types'

const Avator = ({ avatorUrl, isBorder, isRounded }) => (
  <div
    className={classNames('w-full h-full', {
      'rounded-lg': !isRounded,
      'rounded-full': isRounded,
      'p-[1px] bg-gradient-to-br from-[#B9D7FF] to-primary-700': isBorder,
    })}>
    <img
      src={avatorUrl}
      alt="person"
      className={classNames({
        'rounded-lg': !isRounded,
        'rounded-full': isRounded,
      })}
    />
  </div>
)

Avator.propTypes = {
  avatorUrl: PropTypes.string,
  isBorder: PropTypes.bool,
  isRounded: PropTypes.bool,
}

Avator.defaultProps = {
  avatorUrl: 'https://imgur.com/LwPqBcI.png',
  isBorder: false,
  isRounded: false,
}
export default Avator
