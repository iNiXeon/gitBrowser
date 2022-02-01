import React from 'react'
import { useParams } from 'react-router-dom'

const DashboardProfile = () => {
  const { user } = useParams()
  return (
    <div>
      <div id="title">Profile</div>
      <div id="username">{user}</div>
      <a href="/dashboard">Go To Root</a>
      <a href="/dashboard/main">Go To Main</a>
    </div>
  )
}

DashboardProfile.propTypes = {}

export default DashboardProfile
