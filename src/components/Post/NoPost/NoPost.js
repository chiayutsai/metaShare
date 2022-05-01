import Button3D from 'components/Button/Button3D/Button3D'

const NoPost = () => (
  <div className="flex items-center justify-center w-full py-6 bg-white shadow-card rounded">
    <p className="text-xs text-gray-700 mr-3">尚無貼文，快去新增一則貼文吧！</p>

    <Button3D content="新增貼文" />
  </div>
)

export default NoPost
