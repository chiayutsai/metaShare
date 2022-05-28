/* eslint-disable no-underscore-dangle */
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openLikesModal } from 'actions/post'
import {
  handleSinglePostLike,
  handleSinglePostComment,
} from 'actions/singlePost'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'
import PostButton from 'components/Post/PostButton/PostButton'
import PostComment from 'components/Post/PostComment/PostComment'
import PostCommentInput from 'components/Post/PostCommentInput/PostCommentInput'
import PostInfo from 'components/Post/PostInfo/PostInfo'
import PostSwiper from 'components/Post/PostSwiper/PostSwiper'
import SinglePostHeader from 'components/Post/SinglePostHeader/SinglePostHeader'
import ScrollView from 'components/ScrollView'
import { LIKE, COMMENT } from 'constants/post'
import { singlePostSelector } from 'selectors/post'
import { userIdSelector } from 'selectors/user'

const SinglePostModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const scrollViewRef = useRef()
  const commentScrollViewRef = useRef()
  const commentInputRef = useRef()
  const [commentContent, setCommentContent] = useState('')
  const userId = useSelector(userIdSelector)
  const {
    _id,
    author,
    createdAt,
    content,
    imageUrls,
    likes,
    comments,
  } = useSelector(singlePostSelector)
  const singleImage = imageUrls.length === 1
  const swiperImage = imageUrls.length > 1
  const hasImage = imageUrls.length >= 1
  const isLike = Boolean(likes.filter(user => user === userId).length)
  const likeAmount = likes.length
  const commentAmount = comments.length
  const hasComments = commentAmount >= 1
  const setScrollViewRef = useCallback(rootRef => {
    scrollViewRef.current = rootRef.current
  }, [])
  const setCommentScrollViewRef = useCallback(rootRef => {
    commentScrollViewRef.current = rootRef.current
  }, [])
  const scrollToEnd = useCallback(() => {
    const list = scrollViewRef.current.view
    const commetList = commentScrollViewRef.current.view
    if (list) {
      list.scrollTo(0, list.scrollHeight)
    }
    if (commetList) {
      commetList.scrollTo(0, commetList.scrollHeight)
    }
  }, [])
  const handleLikesClick = useCallback(async () => {
    try {
      await dispatch(handleSinglePostLike({ postId: _id, userId }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, _id, userId])
  const handleFocusComments = useCallback(() => {
    setTimeout(() => {
      commentInputRef.current.focus()
    }, 0)
  }, [])
  const handleCommentClick = useCallback(async () => {
    if (!commentContent) {
      return
    }
    try {
      await dispatch(
        handleSinglePostComment({ postId: _id, content: commentContent }),
      )
      setCommentContent('')

      setTimeout(() => {
        scrollToEnd()
      }, 300)
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, _id, commentContent, scrollToEnd])

  const handleLikesModal = useCallback(() => {
    dispatch(openLikesModal({ postId: _id }))
  }, [dispatch, _id])
  return (
    <ModalWrapper
      disableBodyScroll
      showCloseButton
      shouldCloseOnOverlayClick
      onClose={onClose}>
      <div
        className={classNames(
          'flex w-11/12 xs:w-10/12  mx-auto h-screen max-h-[760px] md:w-[760px] md:h-[550px]  lg:w-[990px] lg:h-[650px] py-12 sm:py-9 md:py-0',
          {
            '!max-h-[500px] md:!w-[500px]': !hasImage,
          },
        )}>
        {hasImage && (
          <div className="hidden md:block bg-[#3a3a3a] w-[420px] lg:w-[650px] shrink-0  rounded-tl-lg rounded-bl-lg overflow-hidden">
            {singleImage && (
              <img
                className="w-full h-full object-contain"
                src={`${imageUrls[0]}`}
                alt="post"
              />
            )}
            {swiperImage && (
              <div className=" group rounded-lg h-full">
                <PostSwiper imageUrls={imageUrls} />
              </div>
            )}
          </div>
        )}
        <div
          className={classNames(
            'relative flex flex-col justify-between w-full bg-white rounded-lg md:rounded-tl-none md:rounded-bl-none overflow-hidden',
            {
              'md:!rounded-tl-lg md:!rounded-bl-lg': !hasImage,
            },
          )}>
          <div className="sticky top-0 left-0 w-full z-10">
            <SinglePostHeader
              postId={_id}
              authorId={author._id}
              avatorUrl={author.avator}
              userName={author.name}
              createdAt={createdAt}
              content={content}
              imageUrls={imageUrls}
              onClose={onClose}
            />
          </div>
          <ScrollView
            setRef={setScrollViewRef}
            vertical
            verticalWidth={4}
            verticalHoverWidth={10}
            thumbSizeChangeOnHover>
            <div>
              <div className="border-b border-gray-600/50 py-3 mx-3 md:min-h-[80px]">
                <p>{content}</p>
                {hasImage && (
                  <div className="block md:hidden w-full sm:h-[500px] rounded-lg bg-gray-600/50 mt-3 ">
                    {singleImage && (
                      <img
                        className="w-full h-full object-contain"
                        src={`${imageUrls[0]}`}
                        alt="post"
                      />
                    )}
                    {swiperImage && (
                      <div className=" group rounded-lg h-full">
                        <PostSwiper imageUrls={imageUrls} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center border-b border-gray-600/50 py-3 mx-3">
                <PostButton
                  type={LIKE}
                  isLike={isLike}
                  onClick={handleLikesClick}
                />
                <div className="w-[1px] h-6 mx-1 bg-gray-500 shrink-0" />
                <PostButton type={COMMENT} onClick={handleFocusComments} />
              </div>
              <div className="flex justify-between border-b border-gray-600/50 py-3 mx-3">
                <PostInfo
                  type={LIKE}
                  likeAmount={likeAmount}
                  onClick={handleLikesModal}
                />
                <p className="text-gray-800">{commentAmount}則留言</p>
              </div>
            </div>
            <div className="flex max-h-[300px] sm:max-h-[340px] h-full shrink-0 items-center justify-center border-b border-gray-600/50 py-3 mx-3">
              {!hasComments && (
                <p className="text-sm text-gray-700">
                  快來成為第一個留言的朋友吧
                </p>
              )}
              {hasComments && (
                <ScrollView
                  setRef={setCommentScrollViewRef}
                  scrollSmooth
                  vertical
                  verticalWidth={4}
                  verticalHoverWidth={10}
                  initialScrollVToEnd
                  thumbSizeChangeOnHover>
                  {comments.map((comment, index) => (
                    <div
                      key={`comment${index + 1}`}
                      className="mb-3 last:mb-0 ">
                      <PostComment
                        avatorUrl={comment.commenter.avator}
                        userName={comment.commenter.name}
                        date={comment.createdAt}
                        content={comment.content}
                      />
                    </div>
                  ))}
                </ScrollView>
              )}
            </div>
          </ScrollView>
          <div className="sticky bottom-0 py-3 mx-3">
            <PostCommentInput
              postId={_id}
              setRef={commentInputRef}
              onClick={handleCommentClick}
              commentContent={commentContent}
              setCommentContent={setCommentContent}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

SinglePostModal.propTypes = {
  onClose: PropTypes.func,
}
SinglePostModal.defaultProps = {
  onClose: () => {},
}
export default SinglePostModal
