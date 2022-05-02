import ErrorBadge from 'components/ErrorBadge/ErrorBadge'

export default {
  title: 'Component/ErrorBadge',
  component: ErrorBadge,
}

export const ErrorBadgeTemplate = args => (
  <div style={{ width: 540 }}>
    <ErrorBadge {...args} />
  </div>
)

ErrorBadgeTemplate.args = {
  content: '圖片檔案過大，僅限 1mb 以下檔案',
}
