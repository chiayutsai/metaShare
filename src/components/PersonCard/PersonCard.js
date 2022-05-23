import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from 'actions/modal'
import Avator from 'components/Avator/Avator'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import Link from 'components/Link/Link'
import { FOLLOW_LIST_MODAL } from 'constants/modal'
import { followingCountSelector, followerCountSelector } from 'selectors/follow'

const PersonCard = ({ userId, avatorUrl, name }) => {
  const dispatch = useDispatch()
  const followingCount = useSelector(followingCountSelector)
  const followerCount = useSelector(followerCountSelector)
  const handleFollowingModal = useCallback(() => {
    dispatch(
      setModal({
        name: FOLLOW_LIST_MODAL,
        type: 'following',
      }),
    )
  }, [dispatch])
  const handleFollowerModal = useCallback(() => {
    dispatch(
      setModal({
        name: FOLLOW_LIST_MODAL,
        type: 'follower',
      }),
    )
  }, [dispatch])
  return (
    <div className="flex flex-col justify-center items-center px-[30px] py-9 bg-white rounded-lg shadow-card">
      <div className=" w-[120px] h-[120px] mb-2">
        <Avator avatorUrl={avatorUrl} />
      </div>
      <Link
        to={`/metaShare/profile/${userId}`}
        className="font-bold text-xl mb-3 hover:text-primary-800">
        {name}
      </Link>
      <DecorationLine />
      <div
        className="flex mt-3
    ">
        <div className="flex flex-col items-center border-r border-gray-600 pr-6">
          <p className="text-gray-1000 text-sm">關注數</p>
          <button
            type="button"
            className="text-gray-1300 hover:text-primary-700"
            onClick={handleFollowerModal}>
            {followerCount}
          </button>
        </div>
        <div className="flex flex-col items-center pl-6">
          <p className="text-gray-1000 text-sm">追蹤中</p>
          <button
            type="button"
            className="text-gray-1300 hover:text-primary-700"
            onClick={handleFollowingModal}>
            {followingCount}
          </button>
        </div>
      </div>
    </div>
  )
}
PersonCard.propTypes = {
  userId: PropTypes.string,
  name: PropTypes.string,
  avatorUrl: PropTypes.string,
}

PersonCard.defaultProps = {
  userId: '',
  name: '',
  avatorUrl: '',
}
export default PersonCard
