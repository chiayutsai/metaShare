import PropTypes from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleAllPost, handleUpdatePost } from 'actions/postModal'
import { handleUploadImage, cleanAllImageUrl } from 'actions/uploadImage'
import DecorationLine from 'components/DecorationLine/DecorationLine'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'
import PostModalContent from 'components/PostModal/PostModalContent/PostModalContent'
import PostModalFooter from 'components/PostModal/PostModalFooter/PostModalFooter'
import PostModalHeader from 'components/PostModal/PostModalHeader/PostModalHeader'
import {
  uploadImageSelector,
  uploadImageLoadingSelector,
} from 'selectors/uploadImage'

const PostModal = ({ type, postId, avatorUrl, content, onClose }) => {
  const dispatch = useDispatch()
  const imageUrls = useSelector(uploadImageSelector)
  const isLoading = useSelector(uploadImageLoadingSelector)
  const [textAreaContent, setTextAreaContent] = useState(content)
  const [errorContent, setErrorContent] = useState('')
  const handleClose = useCallback(() => {
    onClose()
    dispatch(cleanAllImageUrl())
  }, [dispatch, onClose])

  useEffect(() => {
    if (textAreaContent || imageUrls.length) {
      setErrorContent('')
    }
  }, [textAreaContent, imageUrls])

  const handleAllPostClick = useCallback(() => {
    if (!textAreaContent && !imageUrls.length) {
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

  const handleUpdatePostClick = useCallback(() => {
    if (!textAreaContent && !imageUrls.length) {
      setErrorContent('請輸入要更新的貼文內容或上傳一張圖片')
      return
    }
    const data = {
      content: textAreaContent,
    }
    try {
      dispatch(handleUpdatePost({ postId, ...data }))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, postId, textAreaContent, imageUrls])

  const handleUploadChange = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', 'file')

    try {
      await dispatch(handleUploadImage(formData))
      setErrorContent('')
    } catch (error) {
      setErrorContent(error.message)
    }

    e.target.value = ''
  }
  return (
    <ModalWrapper disableBodyScroll onClose={handleClose}>
      <div className="w-[600px] bg-white rounded-lg pb-4">
        <PostModalHeader avatorUrl={avatorUrl} onClose={handleClose} />
        <div className="px-7">
          <div className="mb-4">
            <DecorationLine />
          </div>
          <div className="mb-4 pb-4 border-b border-gray-500">
            <PostModalContent
              textAreaContent={textAreaContent}
              imageUrls={imageUrls}
              setTextAreaContent={setTextAreaContent}
              errorContent={errorContent}
              isLoading={isLoading}
            />
          </div>
          <PostModalFooter
            type={type}
            isLoading={isLoading}
            isError={Boolean(errorContent)}
            onClick={
              type === 'update' ? handleUpdatePostClick : handleAllPostClick
            }
            onChange={handleUploadChange}
          />
        </div>
      </div>
    </ModalWrapper>
  )
}

PostModal.propTypes = {
  type: PropTypes.string,
  postId: PropTypes.string,
  avatorUrl: PropTypes.string,
  content: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
PostModal.defaultProps = {
  type: '',
  postId: '',
  avatorUrl: '',
  content: '',
}
export default PostModal
