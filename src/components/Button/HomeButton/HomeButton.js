import PropTypes from 'prop-types'
import { ReactComponent as IconHomeSvg } from './assets/Icon.svg'

const HomeButton = ({ onClick }) => (
  <button
    type="button"
    className="rounded-full w-10 h-10 p-[1px] bg-gradient-to-br from-[#B9D7FF] to-primary-700"
    onClick={onClick}>
    <div className="flex items-center justify-center w-full h-full rounded-full bg-white hover:bg-primary-50 duration-300">
      <IconHomeSvg />
    </div>
  </button>
)

HomeButton.propTypes = {
  onClick: PropTypes.func,
}

HomeButton.defaultProps = {
  onClick: () => {},
}
export default HomeButton
