import DecorationLine from 'components/DecorationLine/DecorationLine'
import PostModalContent from 'components/PostModal/PostModalContent/PostModalContent'
import PostModalFooter from 'components/PostModal/PostModalFooter/PostModalFooter'
import PostModalHeader from 'components/PostModal/PostModalHeader/PostModalHeader'

const PostModal = () => (
  <div className="bg-white rounded-lg pb-4">
    <PostModalHeader />
    <div className="px-7">
      <div className="mb-4">
        <DecorationLine />
      </div>
      <div className="mb-4 pb-4 border-b border-gray-500">
        <PostModalContent />
      </div>
      <PostModalFooter />
    </div>
  </div>
)

export default PostModal
