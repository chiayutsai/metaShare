// Enables critical path CSS rendering
// https://github.com/kriasoft/isomorphic-style-loader
const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(x => x._insertCss())
  return () => {
    removeCss.forEach(f => f())
  }
}

export default insertCss
