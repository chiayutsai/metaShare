import LoginCircle from 'components/LoginCircle/LoginCircle'

export default {
  title: 'Component/LoginCircle',
  component: LoginCircle,
}

export const LoginCircleTemplate = args => (
  <div style={{ margin: 50, width: 456, height: 456 }}>
    <LoginCircle {...args} />
  </div>
)
