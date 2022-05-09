import { Provider as ReduxProvider } from 'react-redux'
import Layout from 'components/Layout/Layout'
import storyState from 'mocks/storybookState'
import Login from 'routes/login/Login'

export default {
  title: 'Page/Login',
  component: Login,
}

const Template = () => {
  const store = {
    dispatch: () => {},
    getState: () => ({
      ...storyState,
    }),
    subscribe: () => {},
  }
  return (
    <ReduxProvider store={store}>
      <Layout view="login">
        <Login />
      </Layout>
    </ReduxProvider>
  )
}

export const LoginTemplate = Template.bind({})
