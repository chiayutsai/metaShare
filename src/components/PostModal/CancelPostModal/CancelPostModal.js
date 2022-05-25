import PropTypes from 'prop-types'
import { useCallback } from 'react'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'

const CancelPostModal = ({ closeModal, onClose }) => {
  console.log('test')
  const handleCloseModal = useCallback(() => {
    onClose()
    closeModal()
  }, [onClose, closeModal])
  return (
    <ModalWrapper disableBodyScroll onClose={onClose}>
      <div className="relative w-[300px] xs:w-[360px] bg-white rounded-lg shadow-card px-4 py-3">
        <button
          type="button"
          className="absolute top-[18px] right-4 flex items-center justify-center w-4 h-4"
          onClick={onClose}>
          <span className="absolute w-4 h-0.5 bg-alert block rotate-45" />
          <span className="absolute w-4 h-0.5 bg-alert block rotate-[-45deg]" />
        </button>
        <p className=" text-center font-bold text-alert text-lg mb-4">
          捨棄/取消更新貼文
        </p>
        <div className="mb-4">
          <div className=" relative w-full h-[1px] bg-alert/50 opacity-50 before:absolute before:w-1.5 before:h-1.5 before:rounded-full before:bg-alert/50 before:-top-[2.5px] after:absolute after:w-1.5 after:h-1.5 after:rounded-full after:bg-alert/50 after:-top-[2.5px] after:right-0" />
        </div>

        <div className=" pb-4 border-b border-gray-500/50 mb-4">
          <p>確定要捨棄/取消更新這篇貼文嗎?</p>
          <p className="text-sm text-gray-800 mt-1">
            系統將不會儲存你的編輯內容
          </p>
        </div>
        <div className="w-full flex justify-end">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-800 py-1.5 px-3 rounded border border-gray-800 mr-2 hover:bg-gray-500 hover:border-gray-500">
              取消
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="text-white bg-alert/80 py-1.5 px-3 border border-alert/80 rounded hover:bg-alert">
              確定取消
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

CancelPostModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CancelPostModal
