import StyleContext from 'isomorphic-style-loader/StyleContext'
import insertCss from 'utils/insertCss'
// eslint-disable-next-line
import '!style-loader!css-loader!swiper/swiper-bundle.min.css'
// eslint-disable-next-line
import '!style-loader!css-loader!postcss-loader?{"postcssOptions":{"config":"./tools/postcss.config.js"}}!components/tailwind.css'

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
}

export const decorators = [
  Story => (
    <StyleContext.Provider value={{ insertCss }}>
      <Story />
    </StyleContext.Provider>
  ),
]

const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export default parameters
