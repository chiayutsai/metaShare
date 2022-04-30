import SearchBar from 'components/SerachBar/SearchBar'

export default {
  title: 'Component/SearchBar',
  component: SearchBar,
}

export const SearchBarTemplate = args => <SearchBar {...args} />

SearchBarTemplate.args = {
  isActive: false,
}

SearchBarTemplate.argTypes = {
  isActive: {
    control: {
      type: 'boolean',
    },
  },
}
