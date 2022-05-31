import PropTypes from 'prop-types'
import DecorationLine from 'components/DecorationLine/DecorationLine'

const ProfileCard = ({ description, tags }) => {
  const hasTags = tags.length >= 1
  return (
    <div className="w-full rounded bg-white py-3 px-4 shadow-card dark:bg-dark-bg dark:shadow-dark-card">
      <p className="font-bold text-xl text-primary-900 mb-4">關於</p>
      <div className="mb-4">
        <DecorationLine />
      </div>
      <p className="mb-4">{description}</p>
      {hasTags && (
        <div className="flex flex-wrap border-t border-gray-600 dark:border-dark-primary-500/50 pt-4 ">
          {tags.map((tag, index) => (
            <div
              key={`tag${index + 1}`}
              className="mb-1 mr-2 py-1 px-3 rounded-full text-primary-900 bg-primary-100 dark:bg-dark-primary-500/50 border border-primary-300 text-sm">
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

ProfileCard.propTypes = {
  description: PropTypes.string,
  tags: PropTypes.oneOfType([PropTypes.array]),
}

ProfileCard.defaultProps = {
  description: '',
  tags: [],
}

export default ProfileCard
