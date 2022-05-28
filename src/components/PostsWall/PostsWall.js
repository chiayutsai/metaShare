import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearPosts, handleGetAllPosts, setSearchWord } from 'actions/post'
import FilterDropdown from 'components/FilterDropdown/FilterDropdown'
import NoPost from 'components/Post/NoPost/NoPost'
import Post from 'components/Post/Post'
import PostInput from 'components/PostInput/PostInput'
import {
  postsSelector,
  filterTypeSelector,
  searchWordSelector,
  postsWallLoadingSelector,
  noMorePostSelector,
} from 'selectors/post'
import { userIdSelector } from 'selectors/user'

const PostsWall = ({ isAdmin, avatorUrl }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(handleGetAllPosts())
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch])
  useEffect(
    () => () => {
      dispatch(setSearchWord(''))
      dispatch(clearPosts())
    },
    [dispatch],
  )

  const handleScroll = useCallback(() => {
    const { offsetHeight, scrollHeight } = document.body

    if (offsetHeight + window.scrollY >= scrollHeight) {
      dispatch(handleGetAllPosts())
    }
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      console.log('removeEventListener')
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const userId = useSelector(userIdSelector)
  const isPostWallLoading = useSelector(postsWallLoadingSelector)
  const searchWord = useSelector(searchWordSelector)
  const filterType = useSelector(filterTypeSelector)
  const posts = useSelector(postsSelector)
  const noMorePost = useSelector(noMorePostSelector)
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

      {isPostWallLoading && (
        <div className="w-full flex justify-center">
          <div className="relative left-[-9999px] w-2.5 h-2.5 rounded-full shadow-dot-carousel animate-dot-carousel" />
        </div>
      )}

      {noMorePost && (
        <div className="w-full flex justify-center text-sm text-gray-700">
          已經沒有更多貼文了
        </div>
      )}
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
