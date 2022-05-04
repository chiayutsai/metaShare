import PropTypes from 'prop-types'
import Avator from 'components/Avator/Avator'
import formatDate from 'utils/formatDate'

const PostHeader = ({ avatorUrl, userName, date, content }) => (
  <div className="flex items-start justify-start">
    <div className=" w-9 h-9 mr-2.5 shrink-0">
      <Avator isRounded avatorUrl={avatorUrl} />
    </div>
    <div className="bg-gray-200 rounded-lg py-2 px-3">
      <div className="flex items-end mb-1">
        <p className="mr-3">{userName}</p>
        <p className="text-sm  text-gray-800"> {formatDate(date)}</p>
      </div>

      <p>{content}</p>
    </div>
  </div>
)

PostHeader.propTypes = {
  avatorUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  content: PropTypes.string.isRequired,
}

export default PostHeader
