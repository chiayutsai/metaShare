import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from 'actions/api/webApi'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import PostModalContent from 'components/PostModal/PostModalContent/PostModalContent'
import PostModalFooter from 'components/PostModal/PostModalFooter/PostModalFooter'
import PostModalHeader from 'components/PostModal/PostModalHeader/PostModalHeader'

const PostModal = () => {
  const dispatch = useDispatch()
  const [textAreaContent, setTextAreaContent] = useState('')
  const handleAddPost = useCallback(() => {
    const data = {
      content: textAreaContent,
    }
    dispatch(addPost(data))
  }, [dispatch, textAreaContent])

  return (
    <div className="bg-white rounded-lg pb-4">
      <PostModalHeader />
      <div className="px-7">
        <div className="mb-4">
          <DecorationLine />
        </div>
        <div className="mb-4 pb-4 border-b border-gray-500">
          <PostModalContent setTextAreaContent={setTextAreaContent} />
        </div>
        <PostModalFooter onClick={handleAddPost} />
      </div>
    </div>
  )
}
export default PostModal
