import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useState, useCallback, useEffect } from 'react'

const Avator = ({ avatorUrl, isBorder, isRounded }) => {
  const [imgUrl, setImgUrl] = useState(avatorUrl)
  const showDefaultImg = useCallback(() => {
    setImgUrl('https://imgur.com/pCHyxml.png')
  }, [])

  useEffect(() => {
    if (avatorUrl !== '') {
      setImgUrl(avatorUrl)
    }
  }, [avatorUrl])

  return (
    <div
      className={classNames('w-full h-full', {
        'rounded-lg': !isRounded,
        'rounded-full': isRounded,
        'p-[1px] bg-gradient-to-br from-[#B9D7FF] to-primary-700': isBorder,
      })}>
      <img
        src={imgUrl}
        alt="person"
        className={classNames('w-full h-full', {
          'rounded-lg': !isRounded,
          'rounded-full': isRounded,
        })}
        onError={showDefaultImg}
      />
    </div>
  )
}
Avator.propTypes = {
  avatorUrl: PropTypes.string,
  isBorder: PropTypes.bool,
  isRounded: PropTypes.bool,
}

Avator.defaultProps = {
  avatorUrl: '',
  isBorder: false,
  isRounded: false,
}
export default Avator
