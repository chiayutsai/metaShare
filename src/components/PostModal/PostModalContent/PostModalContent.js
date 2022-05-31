import PropTypes from 'prop-types'
import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { deleteImage } from 'actions/uploadImage'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import ScrollView from 'components/ScrollView'
import { ReactComponent as IconDeleteSvg } from './assets/delete.svg'
import { ReactComponent as IconLoadingSvg } from './assets/loading.svg'
// Todo: 瀑布流修正
const PostModalContent = ({
  textAreaContent,
  isLoading,
  errorContent,
  imageUrls,
  setTextAreaContent,
}) => {
  const dispatch = useDispatch()
  const scrollViewRef = useRef()
  const setScrollViewRef = useCallback(rootRef => {
    scrollViewRef.current = rootRef.current
  }, [])
  const singleImage = imageUrls.length === 1
  const mostImages = imageUrls.length > 1
  const handleDeleteImageClick = id => {
    dispatch(deleteImage({ id }))
  }
  return (
    <>
      <textarea
        rows="5"
        className="w-full bg-gray-100 dark:bg-dark-input-bg rounded p-3 outline-none placeholder:text-gray-700 dark:placeholder:text-white/30"
        placeholder="貼文內容"
        value={textAreaContent}
        onChange={e => {
          const { value } = e.target
          setTextAreaContent(value)
        }}
      />

      {errorContent && (
        <div className="flex justify-center mt-4">
          <ErrorBadge content={errorContent} />
        </div>
      )}
      {mostImages && (
        <div className="h-[200px] sm:h-[460px] mt-4">
          <ScrollView
            setRef={setScrollViewRef}
            vertical
            verticalWidth={4}
            verticalHoverWidth={10}
            thumbSizeChangeOnHover>
            <div className="gap-2 columns-2 ">
              {imageUrls.map((img, index) => (
                <div
                  key={`img${index + 1}`}
                  className="relative mb-2 rounded overflow-hidden ">
                  <button
                    type="button"
                    className="absolute flex top-3 right-3 items-center justify-center w-6 h-6 rounded-full bg-white opacity-80 hover:opacity-100"
                    onClick={() => {
                      handleDeleteImageClick(img.id)
                    }}>
                    <IconDeleteSvg />
                  </button>
                  <img key={`img ${index + 1}`} src={img.imageUrl} alt="post" />
                </div>
              ))}
            </div>
          </ScrollView>
        </div>
      )}
      {singleImage && (
        <div className="h-[200px] sm:h-[460px] mt-4">
          <ScrollView
            setRef={setScrollViewRef}
            vertical
            verticalWidth={4}
            verticalHoverWidth={10}
            thumbSizeChangeOnHover>
            <div className="relative rounded overflow-hidden ">
              <button
                type="button"
                className="absolute flex top-3 right-3 items-center justify-center w-6 h-6 rounded-full bg-white opacity-80 hover:opacity-100"
                onClick={() => {
                  handleDeleteImageClick(imageUrls[0].id)
                }}>
                <IconDeleteSvg />
              </button>
              <img src={imageUrls[0].imageUrl} alt="post" />
            </div>
          </ScrollView>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <IconLoadingSvg className=" animate-spin" />
        </div>
      )}
    </>
  )
}

PostModalContent.propTypes = {
  isLoading: PropTypes.bool,
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  textAreaContent: PropTypes.string,
  errorContent: PropTypes.string,
  setTextAreaContent: PropTypes.func,
}

PostModalContent.defaultProps = {
  isLoading: false,
  imageUrls: [],
  errorContent: '',
  textAreaContent: '',
  setTextAreaContent: () => {},
}
export default PostModalContent
