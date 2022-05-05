import PropTypes from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleAllPost } from 'actions/postModal'
import { handleUploadImage } from 'actions/uploadImage'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'
import PostModalContent from 'components/PostModal/PostModalContent/PostModalContent'
import PostModalFooter from 'components/PostModal/PostModalFooter/PostModalFooter'
import PostModalHeader from 'components/PostModal/PostModalHeader/PostModalHeader'
import { uploadImageSelector } from 'selectors/uploadImage'

const PostModal = ({ content, onClose }) => {
  const dispatch = useDispatch()
  const imageUrls = useSelector(uploadImageSelector)
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
  const handleUploadChange = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', 'file')

    try {
      await dispatch(handleUploadImage(formData))
    } catch (error) {
      setError(true)
      setErrorContent(error.message)
    }
  }
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
          <PostModalFooter
            isError={isError}
            onClick={handleAllPostClick}
            onChange={handleUploadChange}
          />
        </div>
      </div>
    </ModalWrapper>
  )
}

PostModal.propTypes = {
  content: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
PostModal.defaultProps = {
  content: '',
}
export default PostModal
