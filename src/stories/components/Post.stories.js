import NoPost from 'components/Post/NoPost/NoPost'
import PostButton from 'components/Post/PostButton/PostButton'
import PostComment from 'components/Post/PostComment/PostComment'
import PostCommentInput from 'components/Post/PostCommentInput/PostCommentInput'
import PostContent from 'components/Post/PostContent/PostContent'
import PostHeader from 'components/Post/PostHeader/PostHeader'
import PostInfo from 'components/Post/PostInfo/PostInfo'
import { LIKE, COMMENT } from 'constants/post'

export default {
  title: 'Component/Post',
  component: PostHeader,
}

export const PostHeaderTemplate = args => <PostHeader {...args} />

PostHeaderTemplate.args = {
  userName: 'Chia Yu',
  date: Date.now(),
}

export const PostContentTemplate = args => (
  <div style={{ width: 740 }}>
    <PostContent {...args} />
  </div>
)

PostContentTemplate.args = {
  content:
    '教上我大先每方…什焰已我處一工誰謝…。人義我水？筋是窕濫統討已生我著式，憔也，灣先核。三嗎通要反卻州...',
  imageUrls: [
    'https://images.unsplash.com/photo-1651244532823-5e26d806e98b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    'https://images.unsplash.com/photo-1650973500707-c125ffe3c066?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
  ],
}

export const PostCommentInputTemplate = args => (
  <div style={{ width: 740 }}>
    <PostCommentInput {...args} />
  </div>
)

export const PostButtonTemplate = args => (
  <div style={{ width: 358 }}>
    <PostButton {...args} />
  </div>
)

PostButtonTemplate.args = {
  type: LIKE,
  isLike: false,
}

PostButtonTemplate.argTypes = {
  type: {
    control: {
      type: 'radio',
      options: [LIKE, COMMENT],
    },
  },
  isLike: {
    control: {
      type: 'boolean',
    },
  },
}

export const PostInfoTemplate = args => <PostInfo {...args} />

PostInfoTemplate.args = {
  type: LIKE,
  likeAmount: 0,
  commentAmount: 0,
}

PostInfoTemplate.argTypes = {
  type: {
    control: {
      type: 'radio',
      options: [LIKE, COMMENT],
    },
  },
}

export const PostCommentTemplate = args => (
  <div style={{ width: 740 }}>
    <PostComment {...args} />
  </div>
)

PostCommentTemplate.args = {
  userName: 'Chia Yu',
  date: Date.now(),
  content: '教上我大先每方…什焰已我處一工誰謝…。人義我水？',
}

export const NoPostTemplate = () => (
  <div style={{ width: 740 }}>
    <NoPost />
  </div>
)
