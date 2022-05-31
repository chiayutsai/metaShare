import { useSelector } from 'react-redux'

import PostsWall from 'components/PostsWall/PostsWall'
import { userAvatorSelector } from 'selectors/user'

const Home = () => {
  const userAvator = useSelector(userAvatorSelector)
  return (
    <>
      <PostsWall key="home" isAdmin avatorUrl={userAvator} />
    </>
  )
}

Home.propTypes = {}

export default Home
