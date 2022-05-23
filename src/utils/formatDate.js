const formatDate = date => {
  const now = new Date()
  const newDate = new Date(date)
  const nowTime = now.getTime()
  const time = newDate.getTime()
  const calcTime = Math.ceil((nowTime - time) / 1000)
  if (calcTime < 60) {
    return `${calcTime}秒前`
  }
  if (calcTime >= 60 && calcTime < 3600) {
    return `${Math.ceil(calcTime / 60)}分鐘前`
  }
  if (calcTime >= 3600 && calcTime < 86400) {
    return `${Math.ceil(calcTime / 3600)}小時前`
  }
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  return `${year}-${month}-${day} ${hour}:${minute}`
}
export default formatDate

export const followFormatDate = date => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  return `${year}-${month}-${day} ${hour}:${minute}`
}

export const followFormatDay = date => {
  const now = new Date()
  const newDate = new Date(date)
  const nowTime = now.getTime()
  const time = newDate.getTime()
  const calcDay = Math.ceil((nowTime - time) / 86400000)
  return calcDay
}
