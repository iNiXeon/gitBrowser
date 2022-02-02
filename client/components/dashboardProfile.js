import React from 'react'
import { useParams, Link } from 'react-router-dom'

const DashboardProfile = () => {
  const { user } = useParams()
  return (
    <div>
      <div id="title">Profile</div>
      <Link to="/dashboard/main">Go To Main</Link>
      <Link to="/dashboard">Go To Root</Link>
      <div id="username">{user}</div>
    </div>
  )
}

DashboardProfile.propTypes = {}

export default DashboardProfile
