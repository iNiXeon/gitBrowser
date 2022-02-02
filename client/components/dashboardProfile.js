import React from 'react'
import { useParams, Link } from 'react-router-dom'

const DashboardProfile = () => {
  const { user } = useParams()
  return (
    <div className='profile'>
      <div id="title">Profile</div>
      <div id="username">{user}</div>
      <div>
        <Link to="/dashboard/main">Go To Main</Link>
        <Link to="/dashboard">Go To Root</Link>
      </div>
    </div>
  )
}

DashboardProfile.propTypes = {}

export default DashboardProfile
