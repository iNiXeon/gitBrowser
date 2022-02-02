import React from 'react'
import { Link } from 'react-router-dom'

const DashboardMain = () => {
  return (
    <div className="profile">
      <div id="title">Main</div>
      <Link to="/dashboard/profile/5b7a818e-af0f-4f2c-bba0-21b400fe5cbc">Go To Profile</Link>
      <Link to="/dashboard">Go To Root</Link>
    </div>
  )
}

DashboardMain.propTypes = {}

export default DashboardMain
