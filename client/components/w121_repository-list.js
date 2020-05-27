import React from 'react'
import { Link } from 'react-router-dom'

const RepositoryList = (props) => {
  const { repo, username } = props
  return (
    <div>
      {repo.map((item) => (
        <div key={item}>
          <Link to={`/${username}/${item}`}>{item}</Link>
        </div>
      ))}
    </div>
  )
}

RepositoryList.propTypes = {}

export default RepositoryList
