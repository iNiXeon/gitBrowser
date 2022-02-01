import React from 'react'
import { useParams } from 'react-router-dom'

const DashboardProfile = () => {
  const { user } = useParams()
  return (
    <div className='profile'>
      <div id="title">Profile</div>
      <div id="username">{user}</div>
      <div>
        <a href="/dashboard/main">Go To Main</a>
        <a href="/dashboard">Go To Root</a>
      </div>
    </div>
  )
}

DashboardProfile.propTypes = {}

export default DashboardProfile
