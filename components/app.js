import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import DropDown from './dropDownComponent'
import Sorts from './sorts'
import DisplayUser from './displayUser'
import {Link} from 'react-router'
import scss from '../stylesheets/main.scss'

/**
@summary finds all tracks belonging to a specific genre
then finds all users whom tracks belong to
then filters those users by specific location and displays users user name and pic
once clicked on pic then it shows all of that users tracks using:
https://api.soundcloud.com/users/10494998/tracks/?client_id=d6i0wruU7ddayTqrhwszluW0i9aNBlb1
*/

class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        allUsersByGenre: [],
        renderUsers: [],
        apiId: 'd6i0wruU7ddayTqrhwszluW0i9aNBlb1',
        genre: '',
        city: '',
        allData: null,
        usersByCity: []
      };

      this.handleChange = this.handleChange.bind(this);
      this.getAllTracksByGenre = this.getAllTracksByGenre.bind(this);
      // this.showUserTracks = this.showUserTracks.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.sortAZ = this.sortAZ.bind(this);
      this.sortZA = this.sortZA.bind(this);
      this.filterUsersByLocation = this.filterUsersByLocation.bind(this);
    }

    componentDidMount(){
      // connect to soundcloud's api
      SC.initialize({
        client_id: this.state.apiId,
      });
    }


    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }

    getAllTracksByGenre(event) {
      const genre = event.target.value;
      const users = []
      SC.initialize({
        client_id: this.state.apiId,
      });

      SC.get('/tracks', {
        genres: genre,
        limit: 50
      }).then((allTracksByGenre) => {
        // map through all users and return user ids
        const allUsersId = allTracksByGenre.map((tracks)=>{
          return tracks.user_id
        }).filter((userId, index, array) => {
          // get rid of duplicates
           return array.indexOf(userId) == index;
        });

        return allUsersId

      }).then((allUsersId)=> {
        return allUsersId.map((userId, i)=>{
          // take each user id make another api call to get all info of each specific user
          SC.get(`/users/${userId}`, {limit: 50})
          .then((userInfo)=> {
            users.push(userInfo)
          })
          .then(() => {
            if(i === allUsersId.length - 1){
              this.setState({ allUsersByGenre: users, renderUsers: users })
            }
          })

        })
      })
      // keep track of which genre the user selected
      this.setState({ genre: genre })
    }




    handleSubmit(event) {
      event.preventDefault()
    }

    // filters users out by location
    filterUsersByLocation(){
      const { allUsersByGenre } = this.state;

      let counter = 1

      let finalUsersByLocation = allUsersByGenre.filter(user => {
        if(user.city)
          return user.city.toLowerCase().includes(this.state.city.toLowerCase())
      })
      this.setState({ renderUsers: finalUsersByLocation })

    }

    sortAZ(){
      event.preventDefault()

      if(this.state.renderUsers ){
        let sorted = this.state.renderUsers.sort((a,b)=>{
          return  a.username.toLowerCase() > b.username.toLowerCase()
        })
        this.setState({renderUsers: sorted})
      }

    }

    sortZA(){
      event.preventDefault()

      if(this.state.renderUsers ){
        let sorted = this.state.renderUsers.sort((a,b)=>{
          return  a.username.toLowerCase() < b.username.toLowerCase()
        })
        this.setState({renderUsers: sorted})
      }

    }



  render(){
    // passes props to component
    const children = React.Children.map(this.props.children, (child) => (
      React.cloneElement(child, Object.assign({}, this.state))
    ));

    return (
      <div className = 'mainDiv'>
        <div className = 'pageLeft'>
          <div style = {{height: 20}}></div>
          <center>
            <Link to = {'/'}> <div> HOME </div> </Link>
            <div style = {{height: 10}}></div>
            <form onSubmit={this.handleSubmit}>
                <DropDown handleChangeDropDown={this.getAllTracksByGenre}/>

              {<div>

                <input
                  onChange = {()=>{this.handleChange}}
                  type = 'text'
                  placeholder = 'Enter City'
                  name = 'city'
                  value = {this.state.city || ''}
                />
                <button onClick={this.filterUsersByLocation}>Submit</button>
              </div>}

            </form>
          </center>
          <Sorts sortZA = {this.sortZA} sortAZ = {this.sortAZ} />
        </div>


        <div className = 'pageRight'>


            {children}

        </div>

      </div>

    )
  }
}





const mapStateToProps = () => {

  return {

  }
}


const dispatchToProps = () =>{

  return {

  }
}


export default connect(
  mapStateToProps,
  dispatchToProps
) (App)
