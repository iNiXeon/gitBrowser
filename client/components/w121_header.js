import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Header = () => {
  const { username, repositoryname } = useParams()
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6 border-2 border-black">
        <div id="repository-name">{repositoryname || username || 'Repository Finder'}</div>
      </div>
      {username && (
        <div id="go-back">
          <Link to="/">Search</Link>
        </div>
      )}
      {repositoryname && (
        <div id="go-repository-list">
          <Link to={`/${username}`}>List of Repositories</Link>
        </div>
      )}
    </nav>
  )
}

export default React.memo(Header)
