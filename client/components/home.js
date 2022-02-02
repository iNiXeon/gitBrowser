import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header'
import DashboardProfile from './dashboardProfile'
import DashboardMain from './dashboardMain'
import Dashboard from './dashboard'
import NotFound from './404'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <Switch>
            <Route exact path="/dashboard" component={() => <Dashboard />} />
            <Route exact path="/dashboard/main" component={() => <DashboardMain />} />
            <Route exact path="/dashboard/profile/:user" component={() => <DashboardProfile />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)
