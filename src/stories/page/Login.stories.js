import { Provider as ReduxProvider } from 'react-redux'
import Layout from 'components/Layout/Layout'
import {
  CHECK_EMAIL,
  CHECK_VERIFICATION,
  RESET_PASSWORD,
  RESET_SUCCESS,
} from 'constants/forgetPassword'
import storyState from 'mocks/storybookState'
import ForgetPassword from 'routes/forgetPassword/ForgetPassword'
import Login from 'routes/login/Login'
import Register from 'routes/register/Register'

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

export const RegisterTemplate = () => {
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
        <Register />
      </Layout>
    </ReduxProvider>
  )
}

export const ForgetPasswordTemplate = args => {
  const { step } = args
  const store = {
    dispatch: () => {},
    getState: () => ({
      ...storyState,
      forgetPassword: step,
    }),
    subscribe: () => {},
  }
  return (
    <ReduxProvider store={store}>
      <Layout view="login">
        <ForgetPassword />
      </Layout>
    </ReduxProvider>
  )
}

ForgetPasswordTemplate.args = {
  step: CHECK_EMAIL,
}

ForgetPasswordTemplate.argTypes = {
  step: {
    control: {
      type: 'radio',
      options: [CHECK_EMAIL, CHECK_VERIFICATION, RESET_PASSWORD, RESET_SUCCESS],
    },
  },
}
