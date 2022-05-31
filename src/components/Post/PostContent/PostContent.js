import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import PostSwiper from 'components/Post/PostSwiper/PostSwiper'

const PostContent = ({ content, imageUrls }) => {
  const [showMore, setShowMore] = useState(false)
  const [isMore, setIsMore] = useState(false)
  let postContent = content
  if (content.length >= 50) {
    if (!isMore) {
      setIsMore(true)
    }
    postContent = content.substring(0, 75)
  }
  const handleShowMore = useCallback(() => {
    setShowMore(true)
  }, [])
  const singleImage = imageUrls.length === 1
  const swiperImage = imageUrls.length > 1
  return (
    <>
      {!showMore && (
        <p>
          {postContent}
          {isMore && (
            <>
              <span className="mr-0.5">...</span>
              <span
                role="presentation"
                onClick={handleShowMore}
                className="font-bold text-primary-900 dark:text-primary-400">
                顯示更多
              </span>
            </>
          )}
        </p>
      )}
      {showMore && <p>{content}</p>}
      {singleImage && (
        <div className="max-h-[740px] rounded-lg bg-gray-600/50 dark:bg-gray-1200/50 mt-3">
          <img
            className="w-full h-full max-h-[740px] object-contain rounded-lg"
            src={`${imageUrls[0]}`}
            alt="post"
          />
        </div>
      )}
      {swiperImage && (
        <div className="mt-3 group max-h-[740px] rounded-lg bg-gray-600/50 dark:bg-gray-1200/50">
          <PostSwiper imageUrls={imageUrls} />
        </div>
      )}
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
