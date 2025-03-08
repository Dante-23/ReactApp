import React from 'react'
import { Link } from 'react-router-dom'

const AlreadyOptionComponent = ({classes, displayText1, displayText2, toPage="/"}) => {
  return (
    <>
      <Link to={toPage} className={classes}>
          {displayText1}
      </Link>
    </>
  )
}

export default AlreadyOptionComponent
