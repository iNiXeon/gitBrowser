import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const DashboardMain = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <div id="title">Main</div>
          <div>
            <Link to="/dashboard/profile/5b7a818e-af0f-4f2c-bba0-21b400fe5cbc">Go To Profile</Link>
          </div>
          <div>
            <Link to="/dashboard">Go To Root</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

DashboardMain.propTypes = {}

export default DashboardMain
