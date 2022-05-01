import PropTypes from 'prop-types'
import PostSwiper from 'components/Post/PostSwiper/PostSwiper'

const PostContent = ({ content, imageUrls }) => {
  const singleImage = imageUrls.length === 1
  const swiperImage = imageUrls.length > 1
  return (
    <>
      <p>{content}</p>
      {singleImage && (
        <div className="max-h-[740px] rounded-lg bg-gray-600/50 mt-3">
          <img
            className="w-full h-full max-h-[740px] object-contain rounded-lg"
            src={`${imageUrls[0]}`}
            alt="post"
          />
        </div>
      )}
      {swiperImage && <PostSwiper imageUrls={imageUrls} />}
    </>
  )
}

PostContent.propTypes = {
  content: PropTypes.string,
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

PostContent.defaultProps = {
  content: '',
  imageUrls: [],
}

export default PostContent
