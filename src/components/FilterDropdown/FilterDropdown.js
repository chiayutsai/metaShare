import classNames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeFilterType } from 'actions/post'
import { LASTEST_POST, MOST_LIKE, MOST_COMMENT } from 'constants/filterType'
import styles from './FilterDropdown.scss'

const FilterDropdown = ({ filterType }) => {
  useStyles(styles)
  const dispatch = useDispatch()
  const [isToggleDropdown, setToggleDropdown] = useState(false)
  const [isFirstTimeToggle, setFirstTimeToggle] = useState(true)
  const handleToggleDropdown = useCallback(() => {
    setFirstTimeToggle(false)
    setToggleDropdown(!isToggleDropdown)
  }, [isToggleDropdown])

  const handleCloseDropdown = useCallback(
    e => {
      dispatch(changeFilterType(e.target.id))
      setToggleDropdown(false)
    },
    [dispatch],
  )

  return (
    <div className="relative w-[216px]">
      <button
        type="button"
        onClick={handleToggleDropdown}
        className={classNames(styles['filter-button'], {
          [styles.focus]: isToggleDropdown,
        })}>
        <p className="text-sm text-gray-1000 ">{filterType}</p>
        <div
          className={classNames(styles['dropdown-icon'], {
            [styles.rotate]: isToggleDropdown,
          })}>
          <span />
          <span />
        </div>
      </button>
      <ul
        className={classNames(styles['dropdown-menu'], {
          [styles['first-time']]: isFirstTimeToggle,
          [styles.close]: !isToggleDropdown,
        })}>
        <li
          id={LASTEST_POST}
          className={classNames({
            [styles.active]: filterType === LASTEST_POST,
          })}
          onClick={handleCloseDropdown}
          role="presentation">
          最新貼文
        </li>
        <li
          id={MOST_LIKE}
          className={classNames({
            [styles.active]: filterType === MOST_LIKE,
          })}
          onClick={handleCloseDropdown}
          role="presentation">
          最多人喜歡
        </li>
        <li
          id={MOST_COMMENT}
          className={classNames({
            [styles.active]: filterType === MOST_COMMENT,
          })}
          onClick={handleCloseDropdown}
          role="presentation">
          最多則貼文
        </li>
      </ul>
    </div>
  )
}

FilterDropdown.propTypes = {
  filterType: PropTypes.string,
}

FilterDropdown.defaultProps = {
  filterType: '',
}
export default FilterDropdown
