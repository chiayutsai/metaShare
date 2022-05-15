import PropTypes from 'prop-types'
import { ReactComponent as IconNoticeSvg } from './assets/Icon.svg'

const SuccessBadge = ({ content }) => (
  <div className="relative flex w-full rounded bg-[#F4FAFF] py-2 px-3 overflow-hidden before:absolute before:w-1 before:h-full before:top-0 before:left-0 before:bg-success">
    <IconNoticeSvg />
    <p className="ml-2 text-success">{content}</p>
  </div>
)

SuccessBadge.propTypes = {
  content: PropTypes.string.isRequired,
}

export default SuccessBadge
