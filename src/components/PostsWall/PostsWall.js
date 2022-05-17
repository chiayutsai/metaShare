import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from 'actions/api/webApi'
import { setSearchWord } from 'actions/post'
import FilterDropdown from 'components/FilterDropdown/FilterDropdown'
import NoPost from 'components/Post/NoPost/NoPost'
import Post from 'components/Post/Post'
import PostInput from 'components/PostInput/PostInput'
import {
  postsSelector,
  filterTypeSelector,
  searchWordSelector,
  postsWallLoadingSelector,
} from 'selectors/post'
import { userIdSelector } from 'selectors/user'

const PostsWall = ({ isAdmin, avatorUrl }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getAllPosts())
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch])
  useEffect(
    () => () => {
      dispatch(setSearchWord(''))
    },
    [dispatch],
  )
  const userId = useSelector(userIdSelector)
  const isPostWallLoading = useSelector(postsWallLoadingSelector)
  const searchWord = useSelector(searchWordSelector)
  const filterType = useSelector(filterTypeSelector)
  const posts = useSelector(postsSelector)
  const isNopost = posts?.length === 0 && !isPostWallLoading
  return (
    <>
      <div
        className={classNames('flex items-end mb-4', {
          'justify-end': !searchWord,
          'justify-between': searchWord,
        })}>
        {searchWord && (
          <p className="text-sm text-primary-800">搜尋 : {searchWord}</p>
        )}
        <FilterDropdown filterType={filterType} />
      </div>
      {isAdmin && (
        <div className="w-full mb-6">
          <PostInput avatorUrl={avatorUrl} />
        </div>
      )}

      {isNopost && <NoPost isAdmin={isAdmin} />}

      {posts.map((props, index) => (
        <div key={`post${index + 1}`} className="w-full mb-6 last:mb-0 ">
          <Post {...props} userId={userId} />
        </div>
      ))}
    </>
  )
}
PostsWall.propTypes = {
  isAdmin: PropTypes.bool,
  avatorUrl: PropTypes.string,
}

PostsWall.defaultProps = {
  isAdmin: false,
  avatorUrl: '',
}
export default PostsWall
