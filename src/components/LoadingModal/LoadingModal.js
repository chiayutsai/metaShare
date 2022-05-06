import classnames from 'classnames'
import useStyles from 'isomorphic-style-loader/useStyles'
import { useEffect } from 'react'
import styles from './LoadingModal.scss'

const LoadingModal = () => {
  useStyles(styles)
  useEffect(() => {
    document.body.classList.add('Body--Loading-disable-scroll')
    return () => {
      document.body.classList.remove('Body--Loading-disable-scroll')
    }
  }, [])
  return (
    <div className={styles.root}>
      <div className={styles.loading}>
        <div className={classnames(styles.circle, styles.blue)} />
        <div className={classnames(styles.circle, styles.green)} />
        <div className={classnames(styles.circle, styles.red)} />
        <div className={classnames(styles.circle, styles.w1, styles.white)} />
        <div className={classnames(styles.circle, styles.w2, styles.white)} />
        <div className={classnames(styles.circle, styles.w3, styles.white)} />
      </div>
    </div>
  )
}

export default LoadingModal
