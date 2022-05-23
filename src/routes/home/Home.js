import { useSelector } from 'react-redux'

import PostsWall from 'components/PostsWall/PostsWall'
import { profileUserIdSelector } from 'selectors/profile'
import { userAvatorSelector } from 'selectors/user'

const Home = () => {
  const userAvator = useSelector(userAvatorSelector)
  const profileUserId = useSelector(profileUserIdSelector)
  return (
    <>
      <PostsWall key={profileUserId} isAdmin avatorUrl={userAvator} />
    </>
  )
}

Home.propTypes = {}

export default Home
