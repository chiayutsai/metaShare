/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateLikes, updateComments } from 'actions/api/webApi'
import { openLikesModal } from 'actions/post'

import PostButton from 'components/Post/PostButton/PostButton'
import PostComment from 'components/Post/PostComment/PostComment'
import PostCommentInput from 'components/Post/PostCommentInput/PostCommentInput'
import PostContent from 'components/Post/PostContent/PostContent'
import PostHeader from 'components/Post/PostHeader/PostHeader'
import PostInfo from 'components/Post/PostInfo/PostInfo'
import { LIKE, COMMENT } from 'constants/post'

const COMMENT_LIMIT = 5

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
  const [commentContent, setCommentContent] = useState('')
  const [isShowComments, setShowComments] = useState(false)
  const likeAmount = likes.length
  const commentAmount = comments.length
  const initHideCommentAmount = Math.max(commentAmount - COMMENT_LIMIT, 0)
  const [hideCommentAmount, setHideCommentAmount] = useState(
    initHideCommentAmount,
  )
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
    commentInputRef.current.focus()
    setTimeout(() => {
      commentInputRef.current.blur()
      commentInputRef.current.focus()
    }, 0)
  }, [])
  const handleShowCommentsClick = useCallback(() => {
    setShowComments(!isShowComments)
  }, [isShowComments])
  const showComments = isShowComments && commentAmount >= 1

  const handleCommentClick = useCallback(async () => {
    if (!commentContent) {
      return
    }
    commentInputRef.current.focus()
    try {
      await dispatch(updateComments({ postId: _id, content: commentContent }))
      setCommentContent('')
      setShowComments(true)
      setTimeout(() => {
        commentInputRef.current.blur()
        commentInputRef.current.focus()
      }, 0)
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, _id, commentContent])

  const handleMoreCommentClick = useCallback(() => {
    setHideCommentAmount(amount => Math.max(amount - COMMENT_LIMIT, 0))
  }, [])

  const handleLikesModal = useCallback(() => {
    dispatch(openLikesModal({ postId: _id }))
  }, [dispatch, _id])
  return (
    <div className="w-full py-3 px-6 rounded shadow-card dark:shadow-dark-card bg-white dark:bg-dark-bg">
      <div className="border-b border-gray-600/50 dark:border-dark-primary-500/50 pb-3 mb-3">
        <PostHeader
          _id={_id}
          authorId={author._id}
          avatorUrl={author.avator}
          userName={author.name}
          createdAt={createdAt}
          content={content}
          imageUrls={imageUrls}
        />
      </div>
      <div className="border-b border-gray-600/50 dark:border-dark-primary-500/50 pb-3 mb-2">
        <PostContent content={content} imageUrls={imageUrls} />
      </div>
      <div className="flex items-center border-b border-gray-600/50 dark:border-dark-primary-500/50 pb-2 mb-3">
        <PostButton type={LIKE} isLike={isLike} onClick={handleLikesClick} />
        <div className="w-[1px] h-6 mx-1 bg-gray-500 dark:bg-dark-primary-500/50 shrink-0" />
        <PostButton type={COMMENT} onClick={handleCommentsClick} />
      </div>
      <div className="flex border-b border-gray-600/50 dark:border-dark-primary-500/50 pb-3 mb-3">
        <div className="mr-3">
          <PostInfo
            type={LIKE}
            likeAmount={likeAmount}
            onClick={handleLikesModal}
          />
        </div>
        <PostInfo
          type={COMMENT}
          commentAmount={commentAmount}
          onClick={handleShowCommentsClick}
        />
      </div>
      {showComments && !!hideCommentAmount && (
        <div
          className="flex border-b border-gray-600/50 dark:border-dark-primary-500/50 pb-3 mb-3"
          role="presentation"
          onClick={handleMoreCommentClick}>
          查看先前的留言
        </div>
      )}
      {showComments && (
        <div className="border-b border-gray-600/50 dark:border-dark-primary-500/40 pb-3 mb-3">
          {comments.slice(hideCommentAmount).map((comment, index) => (
            <div key={`comment${index + 1}`} className="mb-3 last:mb-0 ">
              <PostComment
                id={comment.commenter._id}
                avatorUrl={comment.commenter.avator}
                userName={comment.commenter.name}
                date={comment.createdAt}
                content={comment.content}
              />
            </div>
          ))}
        </div>
      )}

      <PostCommentInput
        postId={_id}
        setRef={commentInputRef}
        onClick={handleCommentClick}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
      />
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
