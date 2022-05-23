/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from 'actions/modal'
import Avator from 'components/Avator/Avator'
import Button from 'components/Button/Button'
import Link from 'components/Link/Link'
import { NORMAL } from 'constants/buttonType'
import { UNFOLLOW_MODAL } from 'constants/modal'
import { followFormatDate, followFormatDay } from 'utils/formatDate'

const FollowCard = ({ user, followAt }) => {
  const dispatch = useDispatch()
  const openUnFollowModal = useCallback(() => {
    dispatch(
      setModal({
        name: UNFOLLOW_MODAL,
        user,
      }),
    )
  }, [dispatch, user])

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <div className=" w-14 h-14 mr-3">
          <Avator avatorUrl={user.avator} isRounded />
        </div>
        <div>
          <Link
            to={`/metaShare/profile/${user._id}`}
            className="text-lg font-bold leading-none hover:text-primary-800">
            {user.name}
          </Link>

          <p className="text-sm ">
            你已追蹤
            <span className="font-bold text-base text-primary-900 mx-0.5 ">
              {followFormatDay(followAt)}
            </span>
            天
          </p>
          <p className="text-sm text-gray-800">
            追蹤時間: {followFormatDate(followAt)}
          </p>
        </div>
      </div>
      <Button type={NORMAL} content="取消追蹤" onClick={openUnFollowModal} />
    </div>
  )
}
FollowCard.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  followAt: PropTypes.string.isRequired,
}

export default FollowCard
