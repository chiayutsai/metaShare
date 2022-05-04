import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from 'actions/api/webApi'
import FilterDropdown from 'components/FilterDropdown/FilterDropdown'
import ModalList from 'components/ModalList/ModalList'
import NoPost from 'components/Post/NoPost/NoPost'
import Post from 'components/Post/Post'
import PostInput from 'components/PostInput/PostInput'
import { postsSelector, postsWallLoadingSelector } from 'selectors/post'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])
  const isPostWallLoading = useSelector(postsWallLoadingSelector)
  const posts = useSelector(postsSelector)
  const isNopost = posts.length === 0 && !isPostWallLoading
  return (
    <>
      <div className="flex justify-end mb-4">
        <FilterDropdown filterType="最新貼文" />
      </div>
      <div className="w-full mb-6">
        <PostInput />
      </div>
      {isNopost && <NoPost />}

      {posts.map((props, index) => (
        <div key={`post${index + 1}`} className="w-full mb-6 last:mb-0 ">
          <Post {...props} />
        </div>
      ))}
      <ModalList />
    </>
  )
}

Home.propTypes = {}

export default Home
