import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, StaticRouter } from 'react-router-dom'
import store, { history } from '../redux'

import NotFound from '../components/404'
import App from '../components/App'
import Repository from '../components/Repository'
import Home from '../components/home'
import Readme from '../components/Readme'
import Startup from './startup'

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/dashboard" component={() => <Home />} />
            <Route exact path="/dashboard/main" component={() => <Home />} />
            <Route exact path="/dashboard/profile/:user" component={() => <Home />} />
            <Route exact path="/:userName" component={Repository} />
            <Route exact path="/:userName/:repositoryName" component={Readme} />
            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
