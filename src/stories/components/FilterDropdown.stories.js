import FilterDropdown from 'components/FilterDropdown/FilterDropdown'
import { LASTEST_POST, MOST_LIKE, MOST_COMMENT } from 'constants/filterType'

export default {
  title: 'Component/FilterDropdown',
  component: FilterDropdown,
}

export const FilterDropdownTemplate = args => <FilterDropdown {...args} />

FilterDropdownTemplate.args = {
  filterType: LASTEST_POST,
}

FilterDropdownTemplate.argTypes = {
  filterType: {
    control: {
      type: 'radio',
      options: [LASTEST_POST, MOST_LIKE, MOST_COMMENT],
    },
  },
}
