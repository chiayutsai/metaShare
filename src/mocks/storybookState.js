import { LASTEST_POST } from 'constants/filterType'

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
    isLoading: false,
    filterType: LASTEST_POST,
    searchWord: '',
    posts: [
      {
        _id: '6274aa1e2a836900f7d6bf69',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '測試內容',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-06T04:54:54.600Z',
        comments: [],
      },
      {
        _id: '6274a7be7a27c99f9486601d',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '測試內容',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-06T04:44:46.296Z',
        comments: [],
      },
      {
        _id: '6274a0aa1f0394ec6bb483d6',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '測試內容',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-06T04:14:34.942Z',
        comments: [],
      },
      {
        _id: '627417972b7a0c0b2fcc5148',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '終於做完了 ＱＱ',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-05T18:29:43.075Z',
        comments: [],
      },
      {
        _id: '62740cb8ad1be26f72a5eb76',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '哈哈哈',
        imageUrls: [
          'https://i.imgur.com/Hrzf4Ob.jpg',
          'https://i.imgur.com/RT4QdtP.png',
        ],
        likes: [],
        createdAt: '2022-05-05T17:43:20.896Z',
        comments: [],
      },
      {
        _id: '627407ecad1be26f72a5eb47',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '22',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-05T17:22:52.047Z',
        comments: [],
      },
      {
        _id: '62740699ad1be26f72a5eb2f',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-05T17:17:13.385Z',
        comments: [],
      },
      {
        _id: '6273ff5bad1be26f72a5eb06',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        imageUrls: [
          'https://i.imgur.com/L3Pb7o9.png',
          'https://i.imgur.com/zjKIHeK.png',
        ],
        likes: [],
        createdAt: '2022-05-05T16:46:19.967Z',
        comments: [],
      },
      {
        _id: '6273fe51ad1be26f72a5eafb',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        imageUrls: ['https://i.imgur.com/frSB9EA.jpg'],
        likes: [],
        createdAt: '2022-05-05T16:41:53.093Z',
        comments: [],
      },
      {
        _id: '62728c5692cab3d6868b044e',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '你好哇',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-04T14:23:18.415Z',
        comments: [],
      },
      {
        _id: '62728bc092cab3d6868b0449',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: 'hii',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-04T14:20:48.574Z',
        comments: [],
      },
      {
        _id: '62728b9092cab3d6868b0444',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: 'hello',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-04T14:20:00.181Z',
        comments: [],
      },
      {
        _id: '62728b5892cab3d6868b043c',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: 'test\nttttttt',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-04T14:19:04.499Z',
        comments: [],
      },
      {
        _id: '6271261006e6036757c92798',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '今天是星期二',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-03T12:54:40.361Z',
        comments: [],
      },
      {
        _id: '627124435c60064ee5c53c60',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '今天晚上吃粥喔',
        imageUrls: [],
        likes: [],
        createdAt: '2022-05-03T12:46:59.598Z',
        comments: [],
      },
      {
        _id: '627101d6ef3c6fc812010348',
        author: {
          _id: '627100547ef69b72689e67f6',
          name: 'Chia Yu',
          avator: 'https://imgur.com/LwPqBcI.png',
        },
        content: '今天天氣好好喔',
        imageUrls: [],
        likes: ['627100547ef69b72689e67f6', '627100a67ef69b72689e67f7'],
        createdAt: '2022-05-03T10:20:06.167Z',
        comments: [
          {
            commenter: {
              _id: '627100a67ef69b72689e67f7',
              name: 'Amy Lin',
              avator: 'https://imgur.com/m9p1N0H.png',
            },
            content: '哈哈',
            createdAt: '2022-05-04T10:20:06.167Z',
          },
          {
            commenter: {
              _id: '627100547ef69b72689e67f6',
              name: 'Chia Yu',
              avator: 'https://imgur.com/LwPqBcI.png',
            },
            content: '笑屁喔',
            createdAt: '2022-05-05T10:20:06.167Z',
          },
        ],
      },
    ],
  },
  // personPage:{

  // }
}

export default storyState
