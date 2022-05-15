import Button from 'components/Button/Button'
import Button3D from 'components/Button/Button3D/Button3D'
import CommunityButton from 'components/Button/CommunityButton/CommunityButton'
import HomeButton from 'components/Button/HomeButton/HomeButton'
import ProfileButton from 'components/Button/ProfileButton/ProfileButton'

import {
  NORMAL,
  ALERT,
  ICON_EYE,
  ICON_PHOTO,
  ICON_UNLIKE,
  GOOGLE,
  FACEBOOK,
  DARKEN,
  CANCEL,
  ICON_EDIT,
  ICON_CANCEL,
  ICON_FOLLOW,
  ICON_UNFOLLOW,
} from 'constants/buttonType'

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

export const CommunityButtonTemplate = args => (
  <div style={{ width: 212 }}>
    <CommunityButton {...args} />
  </div>
)

CommunityButtonTemplate.args = {
  type: GOOGLE,
  isDisabled: false,
}

CommunityButtonTemplate.argTypes = {
  type: {
    control: {
      type: 'radio',
      options: [GOOGLE, FACEBOOK],
    },
  },
  isDisabled: {
    control: {
      type: 'boolean',
    },
  },
}

export const ButtonTemplate = args => <Button {...args} />

ButtonTemplate.args = {
  type: NORMAL,
  iconType: ICON_PHOTO,
  isDisabled: false,
  content: '新增照片',
}

ButtonTemplate.argTypes = {
  type: {
    control: {
      type: 'radio',
      options: [NORMAL, ALERT],
    },
  },
  iconType: {
    control: {
      type: 'radio',
      options: [ICON_PHOTO, ICON_EYE, ICON_UNLIKE],
    },
  },
  isDisabled: {
    control: {
      type: 'boolean',
    },
  },
}

export const ProfileButtonTemplate = args => <ProfileButton {...args} />

ProfileButtonTemplate.args = {
  type: NORMAL,
  iconType: ICON_EDIT,
  isDisabled: false,
  content: '編輯個人資料',
}

ProfileButtonTemplate.argTypes = {
  type: {
    control: {
      type: 'radio',
      options: [NORMAL, DARKEN, CANCEL],
    },
  },
  iconType: {
    control: {
      type: 'radio',
      options: [ICON_EDIT, ICON_CANCEL, ICON_FOLLOW, ICON_UNFOLLOW],
    },
  },
  isDisabled: {
    control: {
      type: 'boolean',
    },
  },
}
