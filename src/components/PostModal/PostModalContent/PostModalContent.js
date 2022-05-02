import PropTypes from 'prop-types'
import { useState } from 'react'
import ErrorBadge from 'components/ErrorBadge/ErrorBadge'
import ScrollView from 'components/ScrollView'
import { ReactComponent as IconDeleteSvg } from './assets/delete.svg'
import { ReactComponent as IconLoadingSvg } from './assets/loading.svg'
// Todo: 瀑布流修正
const PostModalContent = ({ isLoading, isError, errorContent, imageUrls }) => {
  const singleImage = imageUrls.length === 1
  const mostImages = imageUrls.length > 1

  return (
    <>
      <textArea
        rows="5"
        className="w-full bg-gray-100 rounded p-3 outline-none placeholder:text-gray-700"
        placeholder="貼文內容"
      />

      {isError && (
        <div className="flex justify-center mt-4">
          <ErrorBadge content={errorContent} />
        </div>
      )}
      {mostImages && (
        <div className="h-[460px] mt-4">
          <ScrollView
            vertical
            verticalWidth={4}
            verticalHoverWidth={10}
            thumbSizeChangeOnHover>
            <div className="gap-2 columns-2 ">
              {imageUrls.map((img, index) => (
                <div className="relative mb-2 rounded overflow-hidden ">
                  <button
                    type="button"
                    className="absolute flex top-3 right-3 items-center justify-center w-6 h-6 rounded-full bg-white opacity-80 hover:opacity-100">
                    <IconDeleteSvg />
                  </button>
                  <img key={`img ${index + 1}`} src={img} alt="post" />
                </div>
              ))}
            </div>
          </ScrollView>
        </div>
      )}
      {singleImage && (
        <div className="h-[460px] mt-4">
          <ScrollView
            vertical
            verticalWidth={4}
            verticalHoverWidth={10}
            thumbSizeChangeOnHover>
            <div className="relative rounded overflow-hidden ">
              <button
                type="button"
                className="absolute flex top-3 right-3 items-center justify-center w-6 h-6 rounded-full bg-white opacity-80 hover:opacity-100">
                <IconDeleteSvg />
              </button>
              <img src={imageUrls[0]} alt="post" />
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
  isError: PropTypes.bool,
  imageUrls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  errorContent: PropTypes.string,
}

PostModalContent.defaultProps = {
  isLoading: false,
  isError: false,
  imageUrls: [],
  errorContent: '',
}
export default PostModalContent
