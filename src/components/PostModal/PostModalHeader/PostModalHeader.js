import PropTypes from 'prop-types'
import Avator from 'components/Avator/Avator'

const PostModalHeader = ({ avatorUrl, onClose }) => (
  <div className="relative flex  items-center justify-between p-3 rounded-t-lg bg-white">
    <div className="absolute w-[106px] h-[106px] bottom-0 left-0 p-4 bg-white rounded-full">
      <div className="w-full h-full p-2 bg-gradient-to-br from-[#b9d7ff83] to-primary-700/50 rounded-full">
        <Avator avatorUrl={avatorUrl} isRounded />
      </div>
    </div>
    <p className=" ml-24 text-lg text-gray-1100">說點什麼呢?</p>
    <button
      type="button"
      onClick={onClose}
      className="relative flex items-center justify-center w-8 h-8  rounded-full hover:bg-primary-100">
      <span className="absolute block w-6 h-1 bg-primary-900 rounded-full rotate-45" />
      <span className="absolute block w-6 h-1 bg-primary-900 rounded-full rotate-[-45deg]" />
    </button>
  </div>
)

PostModalHeader.propTypes = {
  avatorUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
PostModalHeader.defaultProps = {
  avatorUrl: '',
}
export default PostModalHeader
