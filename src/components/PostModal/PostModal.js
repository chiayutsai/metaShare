import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from 'actions/api/webApi'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'
import PostModalContent from 'components/PostModal/PostModalContent/PostModalContent'
import PostModalFooter from 'components/PostModal/PostModalFooter/PostModalFooter'
import PostModalHeader from 'components/PostModal/PostModalHeader/PostModalHeader'

const PostModal = ({ content, imageUrls, onClose }) => {
  const dispatch = useDispatch()
  const [textAreaContent, setTextAreaContent] = useState(content)
  const handleAddPost = useCallback(() => {
    if (!textAreaContent && !imageUrls.length) {
      return
    }
    const data = {
      content: textAreaContent,
    }
    dispatch(addPost(data))
  }, [dispatch, textAreaContent, imageUrls])

  return (
    <ModalWrapper shouldCloseOnOverlayClick disableBodyScroll onClose={onClose}>
      <div className="w-[600px] bg-white rounded-lg pb-4">
        <PostModalHeader onClose={onClose} />
        <div className="px-7">
          <div className="mb-4">
            <DecorationLine />
          </div>
          <div className="mb-4 pb-4 border-b border-gray-500">
            <PostModalContent
              textAreaContent={textAreaContent}
              imageUrls={imageUrls}
              setTextAreaContent={setTextAreaContent}
            />
          </div>
          <PostModalFooter onClick={handleAddPost} />
        </div>
      </div>
    </ModalWrapper>
  )
}

PostModal.propTypes = {
  content: PropTypes.string,
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClose: PropTypes.func.isRequired,
}
PostModal.defaultProps = {
  content: '',
  imageUrls: [],
}
export default PostModal
