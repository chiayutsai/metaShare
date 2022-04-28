const ComponentTemplate = () => <div />

export default {
  title: 'Component/ComponentTemplate',
  component: ComponentTemplate,
}

export const Default = args => <ComponentTemplate {...args} />

Default.args = {
  isActive: false,
  text: 'test',
}

Default.argTypes = {
  isActive: {
    control: {
      type: 'boolean',
    },
  },
}
