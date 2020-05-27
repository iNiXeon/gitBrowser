import React from 'react'
// import Markdown from 'markdown-to-jsx'

const RepositoryName = (props) => {
  return (
    <div className="text-teal-900 text-left">
      {/* <Markdown id="description">{props.text}</Markdown> */}
      MARKDOWN HERE
      {props.text[0]}
    </div>
  )
}

RepositoryName.propTypes = {}

export default RepositoryName
