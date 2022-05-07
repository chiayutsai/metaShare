import PropTypes from 'prop-types'
import Avator from 'components/Avator/Avator'
import formatDate from 'utils/formatDate'

const PostHeader = ({ avatorUrl, userName, createdAt }) => (
  <div className="flex items-center justify-start">
    <div className=" w-14 h-14 mr-3">
      <Avator isRounded avatorUrl={avatorUrl} />
    </div>
    <div>
      <p className="text-lg font-bold -mb-0.5">{userName}</p>
      <p className="text-sm  text-gray-800"> {formatDate(createdAt)}</p>
    </div>
  </div>
)
PostHeader.propTypes = {
  avatorUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default PostHeader
