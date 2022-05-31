import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleGetUserLikesPosts } from 'actions/likesPost'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import LikePost from 'components/LikePost/LikePost'
import { likesPostsSelector, loadingSelector } from 'selectors'

const LikesPostsWall = () => {
  const loading = useSelector(loadingSelector)

  const dispatch = useDispatch()
  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(handleGetUserLikesPosts())
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch])
  const likesPosts = useSelector(likesPostsSelector)
  const isNoLikesPosts = likesPosts?.length === 0 && !loading
  return (
    <>
      <div className="bg-white dark:bg-dark-bg shadow-card dark:shadow-dark-card py-3 px-4 rounded">
        <p className="font-bold text-primary-900 text-xl mb-4">喜歡的貼文</p>

        <DecorationLine />

        {isNoLikesPosts && (
          <p className="text-sm text-center text-gray-600 my-14">
            還沒有喜歡的貼文喔
          </p>
        )}
        {!isNoLikesPosts && (
          <>
            {likesPosts.map((props, index) => (
              <div
                key={`post${index + 1}`}
                className="w-full  py-6 px-4  last:mb-0 even:bg-gray-50/80 dark:even:bg-dark-primary-500/10 rounded">
                <LikePost {...props} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default LikesPostsWall
