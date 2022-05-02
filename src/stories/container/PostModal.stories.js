import PostModal from 'components/PostModal/PostModal'

export default {
  title: 'Container/PostModal',
  component: PostModal,
}

export const PostModalTemplate = args => (
  <div style={{ width: 800, padding: 100, backgroundColor: '#484848' }}>
    <PostModal {...args} />
  </div>
)
