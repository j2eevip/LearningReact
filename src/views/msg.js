import React from 'react'
import { Link } from 'react-router'

const MsgView = ({ children, location }) => (
  <div>
    { !location.pathname.startsWith('/msg/add') &&
      <Link
        className="btn btn-default btn-lg btn-block"
        to="/msg/add">
        添加消息
        <span className="glyphicon glyphicon-plus"/>
      </Link>
    }
    <br/>
    { children }
  </div>
)

export default MsgView
