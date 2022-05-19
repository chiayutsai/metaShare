import classnames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './ModalWrapper.scss'

const ModalWrapper = ({
  children,
  className,
  overlayClassName,
  onClose,
  showCloseButton,
  shouldCloseOnOverlayClick,
  disableBodyScroll,
}) => {
  useStyles(styles)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (disableBodyScroll) {
      document.body.classList.add('Body--Modal-open-disable-scroll')

      return () => {
        document.body.classList.remove('Body--Modal-open-disable-scroll')
      }
    }
  }, [disableBodyScroll])

  return (
    <div className={classnames(styles.root, className)}>
      <div
        className={classnames(styles.overlay, overlayClassName, {
          [styles['can-click']]: shouldCloseOnOverlayClick,
        })}
        role="presentation"
        onClick={() => {
          // TODO: 如果有更複雜的背景點擊關閉功能, 需改變作法
          if (shouldCloseOnOverlayClick) onClose()
        }}
      />
      {showCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className="absolute flex items-center justify-center w-7 h-7 right-10 top-10 pointer-events-auto">
          <span className="absolute w-9 h-1 bg-white rotate-45 rounded-full" />
          <span className="absolute w-9 h-1 bg-white rotate-[-45deg] rounded-full" />
        </button>
      )}

      <div className={styles.container}>{children}</div>
    </div>
  )
}

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  onClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool,
  disableBodyScroll: PropTypes.bool,
}

ModalWrapper.defaultProps = {
  className: '',
  overlayClassName: '',
  onClose: null,
  showCloseButton: false,
  shouldCloseOnOverlayClick: false,
  disableBodyScroll: false,
}

export default ModalWrapper
