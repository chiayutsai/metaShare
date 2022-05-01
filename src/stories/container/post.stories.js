import Post from 'components/Post/Post'

export default {
  title: 'Container/Post',
  component: Post,
}

export const PostTextTemplate = args => (
  <div style={{ width: 788 }}>
    <Post {...args} />
  </div>
)

const PostDefaultArgs = {
  userName: 'Chia Yu',
  date: Date.now(),
  content:
    '教上我大先每方…什焰已我處一工誰謝…。人義我水？筋是窕濫統討已生我著式，憔也，灣先核。三嗎通要反卻州...',
  likes: [{ id: '1234567', name: ' Chia Yu' }],
  comments: [
    {
      commenter: {
        name: 'Chia yu',
      },
      commentTime: Date.now(),
      content: '教上我大先每方…什焰已我處一工誰謝…。人義我水？',
    },
    {
      commenter: {
        name: 'Mike Lin',
      },
      commentTime: Date.now(),
      content:
        '教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？',
    },
    {
      commenter: {
        name: 'Marry Lu',
      },
      commentTime: Date.now(),
      content: '哈哈',
    },
  ],
}

PostTextTemplate.args = {
  ...PostDefaultArgs,
}

export const PostSingleImgTemplate = args => (
  <div style={{ width: 788 }}>
    <Post {...args} />
  </div>
)

PostSingleImgTemplate.args = {
  ...PostDefaultArgs,
  imageUrls: [
    'https://images.unsplash.com/photo-1651244532823-5e26d806e98b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  ],
}

export const PostSwiperImgTemplate = args => (
  <div style={{ width: 788 }}>
    <Post {...args} />
  </div>
)

PostSwiperImgTemplate.args = {
  ...PostDefaultArgs,
  imageUrls: [
    'https://images.unsplash.com/photo-1651244532823-5e26d806e98b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    'https://images.unsplash.com/photo-1650973500707-c125ffe3c066?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
  ],
}
