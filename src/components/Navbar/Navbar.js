import useStyles from 'isomorphic-style-loader/useStyles'
import Avator from 'components/Avator/Avator'
import HomeButton from 'components/Button/HomeButton/HomeButton'
import SearchBar from 'components/SerachBar/SearchBar'
import styles from './Navbar.scss'

const Navbar = () => {
  useStyles(styles)
  return (
    <div className="fixed flex items-center justify-between top-0 left-0 z-10 w-full py-1 px-6 bg-white shadow-navbar">
      <h1>
        <a href="/" className={styles.logo}>
          MetaShare
        </a>
      </h1>

      <SearchBar />

      <div className="flex items-center">
        <HomeButton />
        <button
          type="button"
          className="flex items-center ml-4 py-1 pl-1 pr-2 rounded-full  duration-300 hover:bg-primary-50">
          <div className=" w-10 h-10">
            <Avator isRounded isBorder />
          </div>
          <p className="font-bold ml-2">Chiayu</p>
        </button>
      </div>
    </div>
  )
}

export default Navbar
