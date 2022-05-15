import ProfileHeader from 'components/ProfileHeader/ProfileHeader'

export default {
  title: 'Component/ProfileHeader',
  component: ProfileHeader,
}

export const ProfileHeaderTemplate = args => <ProfileHeader {...args} />

ProfileHeaderTemplate.args = {
  isAdmin: true,
  isEdit: false,
  name: 'Chia Yu',
  following: 0,
  follower: 0,
}

ProfileHeaderTemplate.argTypes = {
  isAdmin: {
    control: {
      type: 'boolean',
    },
  },
  isEdit: {
    control: {
      type: 'boolean',
    },
  },
}
