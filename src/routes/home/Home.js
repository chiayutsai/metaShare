import { useSelector } from 'react-redux'
import FilterDropdown from 'components/FilterDropdown/FilterDropdown'
import NoPost from 'components/Post/NoPost/NoPost'
import Post from 'components/Post/Post'
import PostInput from 'components/PostInput/PostInput'
import { postsSelector } from 'selectors/post'

const Home = () => {
  const posts = useSelector(postsSelector)
  const isNopost = posts.length === 0
  console.log(posts)
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
    </>
  )
}

Home.propTypes = {}

export default Home
