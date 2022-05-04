import PropTypes from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleAllPost } from 'actions/postModal'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'
import PostModalContent from 'components/PostModal/PostModalContent/PostModalContent'
import PostModalFooter from 'components/PostModal/PostModalFooter/PostModalFooter'
import PostModalHeader from 'components/PostModal/PostModalHeader/PostModalHeader'

const PostModal = ({ content, imageUrls, onClose }) => {
  const dispatch = useDispatch()
  const [textAreaContent, setTextAreaContent] = useState(content)
  const [isError, setError] = useState(false)
  const [errorContent, setErrorContent] = useState('')
  useEffect(() => {
    if (textAreaContent || imageUrls.length) {
      setError(false)
    }
  }, [textAreaContent, imageUrls])
  const handleAllPostClick = useCallback(() => {
    if (!textAreaContent && !imageUrls.length) {
      setError(true)
      setErrorContent('請輸入貼文內容或上傳一張圖片')
      return
    }
    const data = {
      content: textAreaContent,
    }
    try {
      dispatch(handleAllPost(data))
    } catch (error) {
      console.log(error)
    }
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
              isError={isError}
              errorContent={errorContent}
            />
          </div>
          <PostModalFooter isError={isError} onClick={handleAllPostClick} />
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
