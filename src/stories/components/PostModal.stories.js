import PostModalContent from 'components/PostModal/PostModalContent/PostModalContent'
import PostModalFooter from 'components/PostModal/PostModalFooter/PostModalFooter'
import PostModalHeader from 'components/PostModal/PostModalHeader/PostModalHeader'

export default {
  title: 'Component/PostModal',
  component: PostModalHeader,
}

export const PostModalHeaderTemplate = () => (
  <div style={{ paddingTop: 100, width: 600 }}>
    <PostModalHeader />
  </div>
)

export const PostModalContentTemplate = args => (
  <div style={{ width: 540 }}>
    <PostModalContent {...args} />
  </div>
)

PostModalContentTemplate.args = {
  isLoading: false,
  isError: false,
  imageUrls: [
    'https://images.unsplash.com/photo-1651173889796-5cd7ed0c1108?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    'https://images.unsplash.com/photo-1651319721939-34e8864b7006?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80',
    'https://images.unsplash.com/photo-1648047547783-8d64bf80c17f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80',
  ],
  errorContent: '圖片檔案過大，僅限 1mb 以下檔案',
}

PostModalContentTemplate.argTypes = {
  isLoading: {
    control: {
      type: 'boolean',
    },
  },
  isError: {
    control: {
      type: 'boolean',
    },
  },
}

export const PostModalFooterTemplate = args => (
  <div style={{ width: 600 }}>
    <PostModalFooter {...args} />
  </div>
)
PostModalFooterTemplate.args = {
  isLoading: false,
}
PostModalFooterTemplate.argTypes = {
  isLoading: {
    control: {
      type: 'boolean',
    },
  },
}
