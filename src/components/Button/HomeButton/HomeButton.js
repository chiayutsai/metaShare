import Link from 'components/Link/Link'
import { ReactComponent as IconHomeSvg } from './assets/Icon.svg'

const HomeButton = () => (
  <Link
    to="/metaShare"
    className="rounded-full w-10 h-10 p-[1px] bg-gradient-to-br from-[#B9D7FF] to-primary-700">
    <div className="flex items-center justify-center w-full h-full rounded-full bg-white dark:bg-dark-bg hover:bg-primary-50 duration-300">
      <IconHomeSvg />
    </div>
  </Link>
)

export default HomeButton
