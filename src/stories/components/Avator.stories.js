import Avator from 'components/Avator/Avator'

export default {
  title: 'Component/Avator',
  component: Avator,
}

export const AvatorTemplate = args => (
  <div style={{ width: 120, height: 120 }}>
    <Avator {...args} />
  </div>
)

AvatorTemplate.args = {
  isRounded: false,
  isBorder: false,
}

AvatorTemplate.argTypes = {
  isRounded: {
    control: {
      type: 'boolean',
    },
  },
  isBorder: {
    control: {
      type: 'boolean',
    },
  },
}
