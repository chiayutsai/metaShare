import numeral from 'numeral'

/**
 * Credit should be round down since it will not make client money become more
 * @param {number} value - credit amount
 * @param {integer} toFixed - decimal places
 */
const formatCredit = (value, toFixed = 2) => {
  const zeros = new Array(toFixed + 1).join(0)
  return numeral(value).format(`0,0.[${zeros}]`, Math.floor)
}
export default formatCredit
