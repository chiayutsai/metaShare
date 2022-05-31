import classNames from 'classnames'
import { useSelector } from 'react-redux'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import FollowCard from 'components/FollowCard/FollowCard'
import { loadingSelector } from 'selectors'
import { followingSelector } from 'selectors/follow'

const Follow = () => {
  const loading = useSelector(loadingSelector)
  const following = useSelector(followingSelector)
  const isEvenFollowing = following.length % 2 === 0
  const isNoFollowing = following?.length === 0 && !loading
  return (
    <div className="bg-white dark:bg-dark-bg shadow-card dark:shadow-dark-card py-3 px-4 rounded">
      <p className="font-bold text-primary-900 text-xl mb-4">追蹤名單</p>
      <div className="mb-3">
        <DecorationLine />
      </div>

      {isNoFollowing && (
        <p className="text-sm text-center text-gray-600 my-14">
          還沒有追蹤任何人喔
        </p>
      )}
      {!isNoFollowing && (
        <div className="flex justify-between flex-wrap">
          {following.map((props, index) => (
            <div
              key={`post${index + 1}`}
              className={classNames(
                'w-full 2xl:w-1/2 py-4 2xl:even:pl-4 2xl:odd:pr-4 border-b border-gray-400 dark:border-dark-primary-500/50 last:border-none ',
                {
                  'nth-last-child-two ': isEvenFollowing,
                },
              )}>
              <FollowCard {...props} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Follow.propTypes = {}

export default Follow
