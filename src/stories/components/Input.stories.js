import Input from 'components/Input/Input'
import {
  EMAIL,
  PASSWORD,
  NEW_PASSWORD,
  CONFIRM_NEW_PASSWORD,
  NAME,
  VERIFICATION,
} from 'constants/inputType'

export default {
  title: 'Component/Input',
  component: Input,
}

export const InputTemplate = args => (
  <div style={{ width: 436 }}>
    <Input {...args} />
  </div>
)

InputTemplate.args = {
  type: EMAIL,
  isError: false,
  showLabel: true,
  errorContent: 'Error Message',
}

InputTemplate.argTypes = {
  type: {
    control: {
      type: 'radio',
      options: [
        EMAIL,
        PASSWORD,
        NEW_PASSWORD,
        CONFIRM_NEW_PASSWORD,
        NAME,
        VERIFICATION,
      ],
    },
  },
  isError: {
    control: {
      type: 'boolean',
    },
  },
  showLabel: {
    control: {
      type: 'boolean',
    },
  },
}
