import { useCallback, useState } from 'react'

const useToggle = initialValue => {
  const [value, setValue] = useState(initialValue)
  const onSwitch = useCallback(() => setValue(prevIsOn => !prevIsOn), [])

  return {
    value,
    onSwitch,
  }
}

export default useToggle
