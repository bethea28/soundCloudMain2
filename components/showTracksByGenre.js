
import React from 'react';
import {Link} from 'react-router';
import DisplayUser from './displayUser';




const ShowTracksByGenre = (props) => {

  return (

    <div className = 'displayUser'>
      {props.renderUsers.length ? props.renderUsers
        && props.renderUsers.map((user, key) => <div className = "displayUserComponent"><DisplayUser key={user.id}  {...user}/> </div>):
        <h3 className = 'title '> Welcome To The User Sound
         <br/> <center>Search!</center>
        </h3>
      }
      
    </div>
  )
}


export default ShowTracksByGenre
