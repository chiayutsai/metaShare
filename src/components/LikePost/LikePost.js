/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { handleRemoveLikes } from 'actions/likesPost'
import { handleShowPost } from 'actions/singlePost'

import Avator from 'components/Avator/Avator'
import Button from 'components/Button/Button'
import Link from 'components/Link/Link'
import { NORMAL, ALERT, ICON_EYE, ICON_UNLIKE } from 'constants/buttonType'
import formatDate from 'utils/formatDate'

const LikePost = ({ _id, author, createdAt, content, imageUrls }) => {
  const dispatch = useDispatch()
  const hasImage = imageUrls.length >= 1
  const handleLikesClick = useCallback(async () => {
    try {
      await dispatch(handleRemoveLikes({ postId: _id }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, _id])

  const handleShowPostClick = useCallback(async () => {
    try {
      await dispatch(handleShowPost({ postId: _id }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, _id])
  return (
    <>
      <div className="border-b border-gray-600/50 pb-2.5 mb-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className=" w-14 h-14 mr-3">
              <Avator avatorUrl={author.avator} isRounded />
            </div>
            <div>
              <Link
                to={`/metaShare/profile/${author._id}`}
                className="font-bold text-lg hover:text-primary-800">
                {author.name}
              </Link>
              <p className="text-sm text-gray-800">{formatDate(createdAt)}</p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-3">
              <Button
                type={ALERT}
                iconType={ICON_UNLIKE}
                content="收回喜歡"
                onClick={handleLikesClick}
              />
            </div>
            <Button
              type={NORMAL}
              iconType={ICON_EYE}
              content="查看貼文"
              onClick={handleShowPostClick}
            />
          </div>
        </div>
      </div>
      <div className="flex ">
        <p className="w-full h-10 overflow-hidden text-ellipsis text-overflow">
          {content}
        </p>
        {hasImage && (
          <img
            src={imageUrls[0]}
            alt="postImage"
            className=" shrink-0 rounded-lg w-24 h-24 ml-3 "
          />
        )}
      </div>
    </>
  )
}
LikePost.propTypes = {
  _id: PropTypes.string,
  author: PropTypes.oneOfType([PropTypes.object]).isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

LikePost.defaultProps = {
  _id: '',
  content: '',
  imageUrls: [],
}
export default LikePost
