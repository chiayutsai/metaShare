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
    <div className="w-full flex flex-col mini:flex-row items-start justify-between mini:items-center">
      <div className="flex items-center mb-2 mini:mb-0">
        <div className="w-10 h-10 mr-2 xs:w-14 xs:h-14 xs:mr-3 shrink-0">
          <Avator avatorUrl={user.avator} isRounded />
        </div>
        <div>
          <Link
            to={`/metaShare/profile/${user._id}`}
            className="text-lg font-bold leading-none hover:text-primary-800 dark:hover:text-primary-400">
            {user.name}
          </Link>

          <p className="text-sm ">
            你已追蹤
            <span className="font-bold text-base text-primary-900 dark:text-primary-500 mx-0.5 ">
              {followFormatDay(followAt)}
            </span>
            天
          </p>
          <p className="text-sm text-gray-800 dark:text-white/40">
            追蹤時間: {followFormatDate(followAt)}
          </p>
        </div>
      </div>
      <div className="ml-12 mini:ml-0">
        <Button type={NORMAL} content="取消追蹤" onClick={openUnFollowModal} />
      </div>
    </div>
  )
}
FollowCard.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  followAt: PropTypes.string.isRequired,
}

export default FollowCard
