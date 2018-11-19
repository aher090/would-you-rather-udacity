import React from 'react'
import { Link } from 'react-router-dom'

const LoginNav = () => {
  return (
    <div className="menu login">
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </div>
  )
}

export default LoginNav
