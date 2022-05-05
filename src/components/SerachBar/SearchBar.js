import useStyles from 'isomorphic-style-loader/useStyles'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilterType } from 'actions/post'
import Button3D from 'components/Button/Button3D/Button3D'
import { filterTypeSelector } from 'selectors/post'
import styles from './SearchBar.scss'

const SearchBar = () => {
  useStyles(styles)
  const dispatch = useDispatch()
  const filterType = useSelector(filterTypeSelector)
  const [searchWord, setSearchWord] = useState('')
  const handleBtnClick = useCallback(() => {
    dispatch(changeFilterType(filterType, searchWord))
    setSearchWord('')
  }, [dispatch, filterType, searchWord])

  useEffect(() => {
    const handleKeydown = event => {
      if (event.key === 'Enter') {
        handleBtnClick()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [handleBtnClick])
  return (
    <div className={styles.root} role="presentation" onClick={() => {}}>
      <input
        className="w-full bg-transparent text-gray-1200 outline-none placeholder:text-gray-700 focus:outline-none"
        placeholder="搜尋"
        value={searchWord}
        onChange={e => {
          const { value } = e.target
          setSearchWord(value)
        }}
      />
      <Button3D isRounded icon content="搜尋" onClick={handleBtnClick} />
    </div>
  )
}
export default SearchBar
