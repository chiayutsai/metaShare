import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openProfileEdit, setProfileEditInit } from 'actions/profile'
import Avator from 'components/Avator/Avator'
import HomeButton from 'components/Button/HomeButton/HomeButton'
import Link from 'components/Link/Link'
import SearchBar from 'components/SerachBar/SearchBar'
import history from 'history.js'
import { profileEditSelector } from 'selectors/profile'
import BrowserStorage from 'utils/BrowserStorage'
import { ReactComponent as IconEditSvg } from './assets/edit.svg'
import { ReactComponent as IconFollowSvg } from './assets/follow.svg'
import { ReactComponent as IconLikeSvg } from './assets/like.svg'
import { ReactComponent as IconLogOutSvg } from './assets/logout.svg'
import { ReactComponent as IconPersonSvg } from './assets/person.svg'
import styles from './Navbar.scss'

const Navbar = ({ userId, avatorUrl, name }) => {
  useStyles(styles)
  const dispatch = useDispatch()
  const isEditProfile = useSelector(profileEditSelector)
  const [isToggleDropdown, setToggleDropdown] = useState(false)
  const handleToggleDropdown = useCallback(() => {
    setToggleDropdown(!isToggleDropdown)
  }, [isToggleDropdown])

  const handleToPersonProfile = useCallback(() => {
    if (isEditProfile) {
      dispatch(setProfileEditInit())
    }
    setToggleDropdown(false)
    history.push(`/metaShare/profile/${userId}`)
  }, [dispatch, isEditProfile, userId])

  const handleToEditProfile = useCallback(() => {
    if (!isEditProfile) {
      dispatch(openProfileEdit())
    }
    setToggleDropdown(false)
    history.push(`/metaShare/profile/${userId}`)
  }, [dispatch, isEditProfile, userId])

  const handleLogOut = useCallback(() => {
    BrowserStorage.remove('token')
    window.location = '/metaShare/login'
  }, [])
  return (
    <div className="fixed flex items-center justify-between top-0 left-0 z-10 w-full p-3 md:py-1 sm:px-6 bg-white shadow-navbar">
      <h1>
        <Link to="/metaShare" className={styles.logo}>
          MetaShare
        </Link>
      </h1>

      <SearchBar />

      <div className="hidden md:flex items-center">
        <HomeButton />
        <div className="relative  ml-4 ">
          <button
            type="button"
            className={classNames(
              'flex items-center py-1 pl-1 pr-2 rounded-full  duration-300 hover:bg-primary-100',

              {
                'bg-primary-100': isToggleDropdown,
              },
            )}
            onClick={handleToggleDropdown}>
            <div className=" w-10 h-10">
              <Avator avatorUrl={avatorUrl} isRounded isBorder />
            </div>
            <p className="font-bold ml-2">{name}</p>
          </button>
          <ul
            className={classNames(
              'absolute w-[150px] h-0 top-[52px] right-0 bg-white  rounded shadow-navbar-dropdown overflow-hidden transition-height duration-500 ',
              {
                'h-[180px]': isToggleDropdown,
              },
            )}>
            <li
              className="p-2  border-b border-gray-400 hover:bg-primary-100"
              role="presentation"
              onClick={() => {
                setToggleDropdown(false)
              }}>
              <Link to="/metaShare/follow" className="flex items-center ">
                <IconFollowSvg className="mr-2" />
                <p className="text-sm text-gray-1100 font-bold">追蹤名單</p>
              </Link>
            </li>
            <li
              className="p-2  border-b border-gray-400 hover:bg-primary-100"
              role="presentation"
              onClick={() => {
                setToggleDropdown(false)
              }}>
              <Link to="/metaShare/likesPost" className="flex items-center ">
                <IconLikeSvg className="mr-2" />
                <p className="text-sm text-gray-1100 font-bold">喜歡的貼文</p>
              </Link>
            </li>
            <li
              className="flex items-center p-2  border-b border-gray-400 hover:bg-primary-100"
              role="presentation"
              onClick={handleToPersonProfile}>
              <IconPersonSvg className="mr-2" />
              <p className="text-sm text-gray-1100 font-bold">個人貼文牆</p>
            </li>
            <li
              className="flex items-center p-2 border-b border-gray-400 hover:bg-primary-100"
              role="presentation"
              onClick={handleToEditProfile}>
              <IconEditSvg className="mr-2" />
              <p className="text-sm text-gray-1100 font-bold">編輯個人資料</p>
            </li>
            <li
              className="flex items-center p-2 hover:bg-primary-100"
              role="presentation"
              onClick={handleLogOut}>
              <IconLogOutSvg className="mr-2" />
              <p className="text-sm text-gray-1100 font-bold">登出</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
Navbar.propTypes = {
  userId: PropTypes.string,
  avatorUrl: PropTypes.string,
  name: PropTypes.string,
}

Navbar.defaultProps = {
  userId: '',
  avatorUrl: '',
  name: '',
}
export default Navbar
