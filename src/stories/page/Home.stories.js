import { Provider as ReduxProvider } from 'react-redux'
import Layout from 'components/Layout/Layout'
import storyState from 'mocks/storybookState'
import Home from 'routes/home/Home'

export default {
  title: 'Page/Home',
  component: Home,
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
      <Layout view="home">
        <Home />
      </Layout>
    </ReduxProvider>
  )
}

export const HomeTemplate = Template.bind({})

export const HomeNoPostTemplate = () => {
  const store = {
    dispatch: () => {},
    getState: () => ({
      ...storyState,
      postsWall: {
        ...storyState.postsWall,
        posts: [],
      },
    }),
    subscribe: () => {},
  }
  return (
    <ReduxProvider store={store}>
      <Layout view="home">
        <Home />
      </Layout>
    </ReduxProvider>
  )
}
