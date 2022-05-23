/* eslint-disable no-underscore-dangle */
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from 'actions/api/webApi'
import { handleUpdateUserFollow } from 'actions/follow'
import { deleteLikesPosts } from 'actions/likesPost'
import { setModal } from 'actions/modal'
import { setUpdatePostModal } from 'actions/postModal'
import Avator from 'components/Avator/Avator'
import Button from 'components/Button/Button'
import Link from 'components/Link/Link'
import { NORMAL, DARKEN } from 'constants/buttonType'
import { UNFOLLOW_MODAL, DELETE_POST_MODAL } from 'constants/modal'
import { followingSelector } from 'selectors/follow'
import { userIdSelector } from 'selectors/user'
import formatDate from 'utils/formatDate'

const SinglePostHeader = ({
  postId,
  authorId,
  avatorUrl,
  userName,
  createdAt,
  content,
  imageUrls,
  onClose,
}) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const following = useSelector(followingSelector)
  const isAdmin = userId === authorId
  const [isToggleDropdown, setToggleDropdown] = useState(false)
  const isFollow = Boolean(
    following.filter(follow => follow.user._id === authorId).length,
  )
  const handleToggleDropdown = useCallback(() => {
    setToggleDropdown(!isToggleDropdown)
  }, [isToggleDropdown])

  const handleUpdateUserFollowClick = useCallback(async () => {
    try {
      await dispatch(handleUpdateUserFollow({ userId: authorId }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, authorId])

  const openUnFollowModal = useCallback(() => {
    dispatch(
      setModal({
        name: UNFOLLOW_MODAL,
        user: {
          name: userName,
          avator: avatorUrl,
          _id: authorId,
        },
      }),
    )
  }, [dispatch, userName, avatorUrl, authorId])

  const handleDeletePost = useCallback(async () => {
    try {
      const { data } = await dispatch(deletePost({ postId }))
      onClose()
      dispatch(deleteLikesPosts(data))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, postId, onClose])

  const handleOpenDeleteModal = useCallback(() => {
    setToggleDropdown(false)
    dispatch(
      setModal({
        name: DELETE_POST_MODAL,
        deleteClick: handleDeletePost,
      }),
    )
  }, [dispatch, handleDeletePost])

  const handleOpenPostModal = useCallback(() => {
    setToggleDropdown(false)
    dispatch(setUpdatePostModal({ _id: postId, content, imageUrls }))
  }, [dispatch, postId, content, imageUrls])

  return (
    <div className="flex items-center justify-between p-3 bg-white shadow-card">
      <div className="flex items-center">
        <div className=" w-10 h-10 mr-2.5">
          <Avator isRounded avatorUrl={avatorUrl} />
        </div>
        <div>
          <Link
            to={`/metaShare/profile/${authorId}`}
            className="font-bold mb-0.5 hover:text-primary-800"
            onClick={onClose}>
            {userName}
          </Link>

          <p className="text-sm  text-gray-800"> {formatDate(createdAt)}</p>
        </div>
      </div>
      {isAdmin && (
        <div className="relative">
          <button
            type="button"
            onClick={handleToggleDropdown}
            className={classNames(
              'rounded px-1.5 py-2 bg-gray-100 flex justify-center items-center group hover:bg-primary-100',
              {
                '!bg-primary-100': isToggleDropdown,
              },
            )}>
            <div
              className={classNames(
                'rounded-full w-1 h-1 mr-1.5 bg-gray-500 group-hover:bg-primary-500',
                {
                  'bg-primary-500': isToggleDropdown,
                },
              )}
            />
            <div
              className={classNames(
                'rounded-full w-1 h-1 mr-1.5 bg-gray-500 group-hover:bg-primary-500',
                {
                  'bg-primary-500': isToggleDropdown,
                },
              )}
            />
            <div
              className={classNames(
                'rounded-full w-1 h-1 bg-gray-500 group-hover:bg-primary-500',
                {
                  'bg-primary-500': isToggleDropdown,
                },
              )}
            />
          </button>
          <ul
            className={classNames(
              'absolute w-[150px] h-0 top-6 right-0 bg-white  rounded shadow-navbar-dropdown overflow-hidden transition-height duration-500 ',
              {
                'h-[72px]': isToggleDropdown,
              },
            )}>
            <li
              className="flex items-center p-2  border-b border-gray-400 hover:bg-primary-100"
              role="presentation"
              onClick={handleOpenPostModal}>
              <p className="text-sm text-gray-1100 font-bold">編輯貼文</p>
            </li>
            <li
              className="flex items-center p-2 border-b border-gray-400 hover:bg-primary-100"
              role="presentation"
              onClick={handleOpenDeleteModal}>
              <p className="text-sm text-gray-1100 font-bold">刪除貼文</p>
            </li>
          </ul>
        </div>
      )}
      {!isAdmin && (
        <>
          {isFollow && (
            <Button
              type={NORMAL}
              content="取消追蹤"
              onClick={openUnFollowModal}
            />
          )}
          {!isFollow && (
            <Button
              type={DARKEN}
              content="追蹤"
              onClick={handleUpdateUserFollowClick}
            />
          )}
        </>
      )}
    </div>
  )
}

SinglePostHeader.propTypes = {
  postId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  avatorUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClose: PropTypes.func.isRequired,
}

SinglePostHeader.defaultProps = {
  content: '',
  imageUrls: [],
}
export default SinglePostHeader
