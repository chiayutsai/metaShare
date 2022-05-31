import Link from 'components/Link/Link'
import { ReactComponent as IconFollowSvg } from './assets/follow.svg'
import { ReactComponent as IconLikeSvg } from './assets/like.svg'

const ButtonGroup = () => (
  <div className="flex flex-col justify-center items-center px-[30px] py-4 bg-white dark:bg-dark-bg rounded-lg shadow-card dark:shadow-dark-card">
    <Link
      to="/metaShare/follow"
      className="w-full flex items-center bg-primary-50 dark:bg-dark-primary-500/50 border border-primary-300 rounded-lg shadow-filter py-2 px-3 mb-5 hover:bg-primary-100 dark:hover:bg-dark-primary-500">
      <IconFollowSvg className="mr-4" />
      <p className="font-bold text-primary-900">追蹤名單</p>
    </Link>
    <Link
      to="/metaShare/likesPost"
      className="w-full flex items-center bg-primary-50 dark:bg-dark-primary-500/50 border border-primary-300 rounded-lg shadow-filter py-2 px-3
      hover:bg-primary-100 dark:hover:bg-dark-primary-500">
      <IconLikeSvg className="mr-4" />
      <p className="font-bold text-primary-900">喜歡的貼文</p>
    </Link>
  </div>
)

export default ButtonGroup
