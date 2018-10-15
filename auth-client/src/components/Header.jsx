import React, {Component} from 'react'
import {Link}             from 'react-router-dom'


export default class extends Component {
  render() {
    return (
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/signup'}>Sign up</Link>
        <Link to={'/signin'}>Sign in</Link>
        <Link to={'/signout'}>Sign out</Link>
        <Link to={'/feature'}>Feature</Link>
      </div>
    )
  }
}
