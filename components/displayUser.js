
import React,{Component} from 'react'
import {Link} from 'react-router'



const DisplayUser = (props) => {

  return (

      <div className = "displayUser">

        <Link to = {'/' + props.id}>
          <article >
            <img className="avatars" src = {props.avatar_url}/>
            <h5 className = 'userInfo'> {props.username.toUpperCase()}</h5>
            <h5 className = 'userInfo'>{props.city}</h5>


          </article>
        </Link>

    </div>

  )
}




export default DisplayUser
