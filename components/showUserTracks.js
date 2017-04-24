
import React, {Component} from 'react'
import {Link} from 'react-router'



class ShowUserTracks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: props.params.id,
      allTracksForUser: '',
      trackIdPlaying: '',
      userName: '',
      soundCloud: null,
      songInstance: '',
      songid: ''
    }
    this.playMusic = this.playMusic.bind(this);
  }


  componentDidMount(){
    SC.get('/users/'+ this.state.userId + '/tracks', {limit: 50})
    .then((userTracks)=> {

      this.setState({allTracksForUser: userTracks, userName: userTracks[0].user.username})
    })

    SC.oEmbed('https://soundcloud.com/username/https:/api.soundcloud.com/tracks/289030393/stream', {maxheight: 200, auto_play: false}, function(res) {
  $("#player").html(res.html);
});

  }

  playMusic(trackId) {

    SC.stream(`/tracks/${trackId}`).then((sound)=>{
      this.setState({ songInstance: sound, songInstanceId: trackId})

      this.state.songInstance.play()

    })
  }

  pauseSong(sound){
    SC.stream(`/tracks/` + this.state.songInstanceId).then((sound)=>{
      this.state.songInstance.pause()
    })
  }

  render(){
    return(
      <div>

        {this.state.userName ? <h1 id = 'userName'> {this.state.userName.toUpperCase()}S  Tracks  </h1> : <h1 id = 'noTracks'>No Tracks To Select</h1>}
        {this.state.allTracksForUser ?  this.state.allTracksForUser.map((song,key)=>{
          return (
            <div>
              <article className = "mainSongArticle"key={song.id} >


                  <div className = "songDiv">
                    <img src = {song.artwork_url}/>
                    <div className = "songInfo">
                      <div>
                        <h3 id = 'songTitle'>{song.title}</h3>

                      </div>
                      <div>

                        <h3 id = 'songTitle'> #Likes: {song.favoritings_count}</h3>
                      </div>

                    </div>
                    <div className = "songButtons">
                      <button onClick={()=>{this.playMusic(song.id)}}>Press To Play</button>
                      <button onClick = {()=>{this.pauseSong(this.state.songInstance)}}> Press To Stop</button>

                    </div>
                  </div>

              </article>
            </div>
          )
        }): <h1 id = 'noTracks'> </h1>}
      </div>
    )
  }
}

export default ShowUserTracks
