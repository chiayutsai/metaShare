import { useCallback, useState } from 'react'

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback(event => {
    setValue(event.currentTarget.value)
  }, [])

  return {
    value,
    onChange,
  }
}

export default useInput
