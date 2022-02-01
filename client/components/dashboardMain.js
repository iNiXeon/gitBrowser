import React from 'react'

const DashboardMain = () => {
  return (
    <div className='profile'>
      <div id="title">Main</div>
      <div>
        <a href="/dashboard/profile/5b7a818e-af0f-4f2c-bba0-21b400fe5cbc">Go To Profile</a>
        <a href="/dashboard">Go To Root</a>
      </div>
    </div>
  )
}

DashboardMain.propTypes = {}

export default DashboardMain
