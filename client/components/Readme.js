import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import './css/Components.css'

const Repository = () => {
  const { userName, repositoryName } = useParams()
  const [readmeText, setReadmeText] = useState('')

  useEffect(() => {
    setReadmeText(`loading...`)
    const urlRepository = `https://api.github.com/repos/${userName}/${repositoryName}/readme`
    axios(urlRepository).then((it) => {
      axios(it.data.download_url).then((text) => {
        if (text.data) {
          setReadmeText(text.data)
        }
      })
    })
    .catch(() => {
      setReadmeText("not found")
    })
  }, [userName, repositoryName])

  return (
    <div className="component">
      <header id="repository-name" className="component-header">
        {repositoryName}
        <Link className="underline" id="go-repository-list" to={`/${userName}`}>
          go repository
        </Link>
        <Link className="underline" id="go-back" to="/">
          go home
        </Link>
      </header>
      <Markdown id="description" className="component-readme">
        {readmeText}
      </Markdown>
    </div>
  )
}

export default Repository
