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
    <div
      className={classnames(styles.root, className, overlayClassName)}
      role="presentation"
      onClick={() => {
        // TODO: 如果有更複雜的背景點擊關閉功能, 需改變作法
        if (shouldCloseOnOverlayClick) onClose()
      }}>
      {children}
    </div>
  )
}

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  onClose: PropTypes.func,
  shouldCloseOnOverlayClick: PropTypes.bool,
  disableBodyScroll: PropTypes.bool,
}

ModalWrapper.defaultProps = {
  className: '',
  overlayClassName: '',
  onClose: null,
  shouldCloseOnOverlayClick: false,
  disableBodyScroll: false,
}

export default ModalWrapper
