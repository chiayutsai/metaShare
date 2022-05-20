import DecorationLine from 'components/DecorationLine/DecorationLine'

const Follow = () => (
  <div className="bg-white shadow-card py-3 px-4 rounded">
    <p className="font-bold text-primary-900 text-xl mb-4">追蹤名單</p>

    <DecorationLine />

    {isNoLikesPosts && (
      <p className="text-sm text-center text-gray-600 my-14">
        還沒有喜歡的貼文喔
      </p>
    )}
    {!isNoLikesPosts && (
      <>
        {likesPosts.map((props, index) => (
          <div
            key={`post${index + 1}`}
            className="w-full  py-6 px-4  last:mb-0 even:bg-gray-50/80 rounded">
            <LikePost {...props} />
          </div>
        ))}
      </>
    )}
  </div>
)

Follow.propTypes = {}

export default Follow
