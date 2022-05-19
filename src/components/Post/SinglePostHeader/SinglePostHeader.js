import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Avator from 'components/Avator/Avator'
import { userIdSelector } from 'selectors/user'
import formatDate from 'utils/formatDate'

const SinglePostHeader = ({ authorId, avatorUrl, userName, createdAt }) => {
  const userId = useSelector(userIdSelector)
  const isAdmin = userId === authorId
  const [isToggleDropdown, setToggleDropdown] = useState(false)
  const handleToggleDropdown = useCallback(() => {
    setToggleDropdown(!isToggleDropdown)
  }, [isToggleDropdown])
  return (
    <div className="flex items-center justify-between p-3 bg-white shadow-card">
      <div className="flex items-center">
        <div className=" w-10 h-10 mr-2.5">
          <Avator isRounded avatorUrl={avatorUrl} />
        </div>
        <div>
          <p className="font-bold mb-0.5">{userName}</p>
          <p className="text-sm  text-gray-800"> {formatDate(createdAt)}</p>
        </div>
      </div>
      {isAdmin && (
        <div className="relative">
          <button
            type="button"
            onClick={handleToggleDropdown}
            className={classNames(
              'rounded px-1.5 py-2 bg-gray-100 flex justify-center items-center group hover:bg-primary-100',
              {
                '!bg-primary-100': isToggleDropdown,
              },
            )}>
            <div
              className={classNames(
                'rounded-full w-1 h-1 mr-1.5 bg-gray-500 group-hover:bg-primary-500',
                {
                  'bg-primary-500': isToggleDropdown,
                },
              )}
            />
            <div
              className={classNames(
                'rounded-full w-1 h-1 mr-1.5 bg-gray-500 group-hover:bg-primary-500',
                {
                  'bg-primary-500': isToggleDropdown,
                },
              )}
            />
            <div
              className={classNames(
                'rounded-full w-1 h-1 bg-gray-500 group-hover:bg-primary-500',
                {
                  'bg-primary-500': isToggleDropdown,
                },
              )}
            />
          </button>
          <ul
            className={classNames(
              'absolute w-[150px] h-0 top-6 right-0 bg-white  rounded shadow-navbar-dropdown overflow-hidden transition-height duration-500 ',
              {
                'h-[72px]': isToggleDropdown,
              },
            )}>
            <li
              className="flex items-center p-2  border-b border-gray-400 hover:bg-primary-100"
              role="presentation">
              <p className="text-sm text-gray-1100 font-bold">編輯貼文</p>
            </li>
            <li
              className="flex items-center p-2 border-b border-gray-400 hover:bg-primary-100"
              role="presentation">
              <p className="text-sm text-gray-1100 font-bold">刪除貼文</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

SinglePostHeader.propTypes = {
  authorId: PropTypes.string.isRequired,
  avatorUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default SinglePostHeader
