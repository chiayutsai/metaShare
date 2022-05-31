import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setProfileEditPage } from 'actions/profile'
import { COVER_IMAGE, PERSON_INFO, RESET_PASSWORD } from 'constants/editType'
import { ReactComponent as IconImagelSvg } from './assets/image.svg'
import { ReactComponent as IconLockSvg } from './assets/lock.svg'
import { ReactComponent as IconPesonSvg } from './assets/person.svg'
import styles from './ProfileEditMenu.scss'

const ProfileEditMenu = ({ editPage }) => {
  useStyles(styles)
  const dispatch = useDispatch()
  const handleEdidPageClick = page => () => {
    dispatch(setProfileEditPage(page))
  }
  return (
    <div className="bg-gray-50 dark:bg-dark-bg/70 min-w-[200px] lg:min-w-[240px] md:rounded-tl md:rounded-bl overflow-hidden flex md:block">
      <div
        className={classNames(styles.item, {
          [styles.active]: editPage === COVER_IMAGE,
        })}
        role="presentation"
        onClick={handleEdidPageClick(COVER_IMAGE)}>
        <IconImagelSvg className={styles.icon} />
        <p className="hidden xs:block">修改封面圖片</p>
      </div>
      <div
        className={classNames(styles.item, {
          [styles.active]: editPage === PERSON_INFO,
        })}
        role="presentation"
        onClick={handleEdidPageClick(PERSON_INFO)}>
        <IconPesonSvg className={styles.icon} />
        <p className="hidden xs:block">編輯個人檔案</p>
      </div>
      <div
        className={classNames(styles.item, {
          [styles.active]: editPage === RESET_PASSWORD,
        })}
        role="presentation"
        onClick={handleEdidPageClick(RESET_PASSWORD)}>
        <IconLockSvg className={styles.icon} />
        <p className="hidden xs:block">重設密碼</p>
      </div>
    </div>
  )
}

ProfileEditMenu.propTypes = {
  editPage: PropTypes.string,
}

ProfileEditMenu.defaultProps = {
  editPage: '',
}
export default ProfileEditMenu
