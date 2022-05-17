/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateLikes } from 'actions/api/webApi'
import PostButton from 'components/Post/PostButton/PostButton'
import PostComment from 'components/Post/PostComment/PostComment'
import PostCommentInput from 'components/Post/PostCommentInput/PostCommentInput'
import PostContent from 'components/Post/PostContent/PostContent'
import PostHeader from 'components/Post/PostHeader/PostHeader'
import PostInfo from 'components/Post/PostInfo/PostInfo'
import { LIKE, COMMENT } from 'constants/post'

const Post = ({
  _id,
  userId,
  author,
  createdAt,
  content,
  imageUrls,
  likes,
  comments,
}) => {
  const commentInputRef = useRef()
  const dispatch = useDispatch()
  const [isShowComments, setShowComments] = useState(false)
  const likeAmount = likes.length
  const commentAmount = comments.length
  const isLike = Boolean(likes.filter(user => user === userId).length)
  const handleLikesClick = useCallback(async () => {
    try {
      await dispatch(updateLikes({ postId: _id }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, _id])
  const handleCommentsClick = useCallback(async () => {
    setShowComments(true)
    setTimeout(() => {
      commentInputRef.current.focus()
    }, 0)
  }, [])
  const handleShowCommentsClick = useCallback(() => {
    setShowComments(!isShowComments)
  }, [isShowComments])
  const showComments = isShowComments && commentAmount >= 1
  return (
    <div className="w-full py-3 px-6 rounded shadow-card bg-white">
      <div className="border-b border-gray-600/50 pb-3 mb-3">
        <PostHeader
          authorId={author._id}
          avatorUrl={author.avator}
          userName={author.name}
          createdAt={createdAt}
        />
      </div>
      <div className="border-b border-gray-600/50 pb-3 mb-2">
        <PostContent content={content} imageUrls={imageUrls} />
      </div>
      <div className="flex items-center border-b border-gray-600/50 pb-2 mb-3">
        <PostButton type={LIKE} isLike={isLike} onClick={handleLikesClick} />
        <div className="w-[1px] h-6 mx-1 bg-gray-500 shrink-0" />
        <PostButton type={COMMENT} onClick={handleCommentsClick} />
      </div>
      <div className="flex border-b border-gray-600/50 pb-3 mb-3">
        <div className="mr-3">
          <PostInfo type={LIKE} likeAmount={likeAmount} />
        </div>
        <PostInfo
          type={COMMENT}
          commentAmount={commentAmount}
          onClick={handleShowCommentsClick}
        />
      </div>
      {showComments && (
        <div className="border-b border-gray-600/50 pb-3 mb-3">
          {comments.map((comment, index) => (
            <div key={`comment${index + 1}`} className="mb-3 last:mb-0 ">
              <PostComment
                avatorUrl={comment.commenter.avator}
                userName={comment.commenter.name}
                date={comment.createdAt}
                content={comment.content}
              />
            </div>
          ))}
        </div>
      )}

      <PostCommentInput postId={_id} setRef={commentInputRef} />
    </div>
  )
}
Post.propTypes = {
  _id: PropTypes.string,
  userId: PropTypes.string,
  author: PropTypes.oneOfType([PropTypes.object]).isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  likes: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.arrayOf(PropTypes.object),
}

Post.defaultProps = {
  _id: '',
  userId: '',
  content: '',
  imageUrls: [],
  likes: [],
  comments: [],
}
export default Post
