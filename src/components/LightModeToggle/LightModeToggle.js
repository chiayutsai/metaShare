import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { ReactComponent as IconDarkSvg } from './assets/dark.svg'
import { ReactComponent as IconLightSvg } from './assets/light.svg'
import { ReactComponent as IconMoonSvg } from './assets/moon.svg'
import { ReactComponent as IconSunSvg } from './assets/sun.svg'

const LightModeToggle = ({ lightMode, setLightMode }) => {
  const [firstClick, setFirstClick] = useState(true)
  const handleClick = useCallback(() => {
    if (firstClick) {
      setFirstClick(false)
    }
    setLightMode(!lightMode)
  }, [lightMode, setLightMode, firstClick])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative w-[104px] h-[40px] flex items-center justify-center">
      <IconLightSvg
        className={classNames('absolute top-0 left-0', {
          'opacity-0': !lightMode,
          'animate-mode-fade-in': lightMode && !firstClick,
          'animate-mode-fade-out': !lightMode && !firstClick,
        })}
      />
      <IconSunSvg
        className={classNames('absolute top-0 left-1.5', {
          'opacity-0': !lightMode,
          'animate-sun-close': !lightMode && !firstClick,
          'animate-sun-open': lightMode && !firstClick,
        })}
      />

      <IconDarkSvg
        className={classNames('absolute  top-0 left-0', {
          'opacity-0': lightMode,
          'animate-mode-fade-in': !lightMode && !firstClick,
          'animate-mode-fade-out': lightMode && !firstClick,
        })}
      />
      <IconMoonSvg
        className={classNames('absolute top-0 right-1', {
          'opacity-0': lightMode,
          'animate-moon-close': lightMode && !firstClick,
          'animate-moon-open': !lightMode && !firstClick,
        })}
      />
    </button>
  )
}
LightModeToggle.propTypes = {
  lightMode: PropTypes.bool,
  setLightMode: PropTypes.func,
}

LightModeToggle.defaultProps = {
  lightMode: false,
  setLightMode: () => {},
}
export default LightModeToggle
