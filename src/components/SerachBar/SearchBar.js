import useStyles from 'isomorphic-style-loader/useStyles'
import Button3D from 'components/Button/Button3D/Button3D'
import styles from './SearchBar.scss'

const SearchBar = () => {
  useStyles(styles)
  return (
    <div className={styles.root} role="presentation" onClick={() => {}}>
      <input
        className="w-full bg-transparent text-gray-1200 placeholder:text-gray-700 focus:outline-none"
        placeholder="搜尋"
      />
      <Button3D isRounded icon content="搜尋" />
    </div>
  )
}
export default SearchBar
