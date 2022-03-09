import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => {
    const padding = {
        paddingRight: 5
      }
      return (
        <div>
          <Link to="/" style={padding}>anecdotes</Link>
          <Link to="/Create"  style={padding}>create new</Link>
          <Link to="/About" style={padding}>about</Link>
        </div>
      )
}

export default Menu