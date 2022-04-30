import Button3D from 'components/Button/Button3D/Button3D'
import HomeButton from 'components/Button/HomeButton/HomeButton'

export default {
  title: 'Component/Button',
  component: Button3D,
}

export const Button3DTemplate = args => <Button3D {...args} />

Button3DTemplate.args = {
  isRounded: false,
  icon: false,
  isDisabled: false,
  content: '確認',
}

Button3DTemplate.argTypes = {
  isRounded: {
    control: {
      type: 'boolean',
    },
  },
  icon: {
    control: {
      type: 'boolean',
    },
  },
  isDisabled: {
    control: {
      type: 'boolean',
    },
  },
}

export const HomeButtonTemplate = () => <HomeButton />
