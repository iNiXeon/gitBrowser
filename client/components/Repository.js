import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './css/Components.css'

const Repository = () => {
  const { userName } = useParams()
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    axios.get(`https://api.github.com/users/${userName}/repos`).then((it) => {
      setRepositories(it.data)
    })
  }, [userName])

  return (
    <div className="component">
      <header id="repository-name" className="component-header">
        {userName}
        <br />
        <Link className="underline" id="go-back" to="/">
          go back
        </Link>
      </header>
      <h1>Repositories:</h1>
      {repositories.map((rep) => {
        return (
          <div key={rep.name}>
            <Link id="repository-name" to={`/${rep.full_name}`}>{`${rep.name}`}</Link>
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default Repository
