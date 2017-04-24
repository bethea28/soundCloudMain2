import React from 'react'
// import css from '../css/main.css'
// import '../stylesheets/main.scss'



const Sorts = (props) => {
  return (
    <div>
      <div className = 'sorts'>
        <center>

          <h1> Sort By:</h1>

          <button className = 'sortButtons' onClick = {props.sortAZ}>
            <h2>Users: A - Z</h2  >
          </button>

            <div style = {{height: 2}}> </div>

          <button className = 'sortButtons' onClick = {props.sortZA}>
            <h2> Users Z - A </h2  >
          </button>

        </center>
      </div>

    </div>

  )
}

export default Sorts
