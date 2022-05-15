import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from 'actions/api/webApi'
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

const PostsWall = ({ avatorUrl }) => {
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
      <div className="w-full mb-6">
        <PostInput avatorUrl={avatorUrl} />
      </div>
      {isNopost && <NoPost />}

      {posts.map((props, index) => (
        <div key={`post${index + 1}`} className="w-full mb-6 last:mb-0 ">
          <Post {...props} />
        </div>
      ))}
    </>
  )
}
PostsWall.propTypes = {
  avatorUrl: PropTypes.string,
}

PostsWall.defaultProps = {
  avatorUrl: '',
}
export default PostsWall
