const storyState = {
  user: {
    id: 123456789,
    avatorUrl: '',
    name: 'Chia Yu',
  },
  appReady: true,
  loading: false,
  modals: [],
  postsWall: {
    filterType: 'news',
    posts: [
      {
        id: '12421414',
        userName: 'Chia Yu',
        date: Date.now(),
        content:
          '教上我大先每方…什焰已我處一工誰謝…。人義我水？筋是窕濫統討已生我著式，憔也，灣先核。三嗎通要反卻州...',
        likes: [{ id: '1234567', name: ' Chia Yu' }],
        images: [],
        comments: [
          {
            id: '1242151512',
            commenter: {
              name: 'Chia yu',
            },
            commentTime: Date.now(),
            content: '教上我大先每方…什焰已我處一工誰謝…。人義我水？',
          },
          {
            id: '1242151513',
            commenter: {
              name: 'Mike Lin',
            },
            commentTime: Date.now(),
            content:
              '教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？',
          },
          {
            id: '1242151514',
            commenter: {
              name: 'Marry Lu',
            },
            commentTime: Date.now(),
            content: '哈哈',
          },
        ],
      },
      {
        id: '1242151512',
        userName: 'Mike Lin',
        date: Date.now(),
        content:
          '教上我大先每方…什焰已我處一工誰謝…。人義我水？筋是窕濫統討已生我著式，憔也，灣先核。三嗎通要反卻州...',
        likes: [
          { id: '123', name: ' Chia Yu' },
          { id: '22', name: ' Chia Yu' },
        ],
        imageUrls: [
          'https://images.unsplash.com/photo-1651244532823-5e26d806e98b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        ],
        comments: [
          {
            id: '1',
            commenter: {
              name: 'Chia yu',
            },
            commentTime: Date.now(),
            content: '教上我大先每方…什焰已我處一工誰謝…。人義我水？',
          },
          {
            id: '2',
            commenter: {
              name: 'Mike Lin',
            },
            commentTime: Date.now(),
            content:
              '教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？教上我大先每方…什焰已我處一工誰謝…。人義我水？',
          },
          {
            id: '3',
            commenter: {
              name: 'Marry Lu',
            },
            commentTime: Date.now(),
            content: '哈哈',
          },
        ],
      },
    ],
  },
}

export default storyState
