import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from 'actions/api/webApi'
import { setModal } from 'actions/modal'
import { setUpdatePostModal } from 'actions/postModal'
import Avator from 'components/Avator/Avator'
import Link from 'components/Link/Link'
import { DELETE_POST_MODAL } from 'constants/modal'
import { userIdSelector } from 'selectors/user'
import formatDate from 'utils/formatDate'

const PostHeader = ({
  _id,
  authorId,
  avatorUrl,
  userName,
  createdAt,
  content,
  imageUrls,
}) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const isAdmin = userId === authorId
  const [isToggleDropdown, setToggleDropdown] = useState(false)
  const handleToggleDropdown = useCallback(() => {
    setToggleDropdown(!isToggleDropdown)
  }, [isToggleDropdown])

  const handleOpenPostModal = useCallback(() => {
    setToggleDropdown(false)
    dispatch(setUpdatePostModal({ _id, content, imageUrls }))
  }, [dispatch, _id, content, imageUrls])

  const handleDeletePost = useCallback(async () => {
    try {
      await dispatch(deletePost({ postId: _id }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, _id])

  const handleOpenDeleteModal = useCallback(() => {
    setToggleDropdown(false)
    dispatch(
      setModal({
        name: DELETE_POST_MODAL,
        deleteClick: handleDeletePost,
      }),
    )
  }, [dispatch, handleDeletePost])
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className=" w-14 h-14 mr-3">
          <Avator isRounded avatorUrl={avatorUrl} />
        </div>
        <div>
          <Link
            to={`/metaShare/profile/${authorId}`}
            className="text-lg font-bold -mb-0.5 hover:text-primary-800">
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
              'absolute z-10 w-[150px] h-0 top-6 right-0 bg-white  rounded shadow-navbar-dropdown overflow-hidden transition-height duration-500 ',
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
    </div>
  )
}

PostHeader.propTypes = {
  _id: PropTypes.string,
  content: PropTypes.string,
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  authorId: PropTypes.string.isRequired,
  avatorUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}
PostHeader.defaultProps = {
  _id: '',
  content: '',
  imageUrls: [],
}

export default PostHeader
