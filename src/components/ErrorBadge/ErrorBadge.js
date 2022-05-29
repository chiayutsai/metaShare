import PropTypes from 'prop-types'
import { ReactComponent as IconNoticeSvg } from './assets/notice.svg'

const ErrorBadge = ({ content }) => (
  <div className="relative flex w-full rounded bg-[#FFF4F4] dark:bg-[#321b1b] py-2 px-3 overflow-hidden before:absolute before:w-1 before:h-full before:top-0 before:left-0 before:bg-alert">
    <IconNoticeSvg />
    <p className="ml-2 text-alert">{content}</p>
  </div>
)

ErrorBadge.propTypes = {
  content: PropTypes.string.isRequired,
}

export default ErrorBadge
