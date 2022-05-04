import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from 'actions/api/webApi'
import FilterDropdown from 'components/FilterDropdown/FilterDropdown'
import ModalList from 'components/ModalList/ModalList'
import NoPost from 'components/Post/NoPost/NoPost'
import Post from 'components/Post/Post'
import PostInput from 'components/PostInput/PostInput'
import {
  postsSelector,
  filterTypeSelector,
  postsWallLoadingSelector,
} from 'selectors/post'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(getAllPosts())
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])
  const isPostWallLoading = useSelector(postsWallLoadingSelector)
  const filterType = useSelector(filterTypeSelector)
  const posts = useSelector(postsSelector)
  const isNopost = posts?.length === 0 && !isPostWallLoading
  return (
    <>
      <div className="flex justify-end mb-4">
        <FilterDropdown filterType={filterType} />
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
