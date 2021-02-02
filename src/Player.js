import React, { PureComponent } from 'react'

class Player extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      currentPlayer: null,
      players: ['Joueur 1', 'Joueur 2'],
      scoreOfPlayers: {
        'player_1' : 0,
        'player_2' : 0
      }
    }
  }
  //-- Change the current player --
  setCurrentPlayer(){
    if(!this.props.isSuccessfulAttempts){
      const nextPlayer = (this.state.players[0] === this.state.currentPlayer ? this.state.players[1] : this.state.players[0]);
      return nextPlayer
    }
    return this.state.currentPlayer
  }
  //-- Add point and return the new object scoreOfPlayers --
  setScorePlayer(){
    //-- Copy of object scoreOfPlayers to not keep the reference --
    const scoreOfPlayers = {...this.state.scoreOfPlayers};
    const idPlayer = (this.state.currentPlayer === this.state.players[0] ? 'player_1' : 'player_2')
    const point = (this.props.isSuccessfulAttempts ? 2 : -1)
    scoreOfPlayers[idPlayer] += point

    return scoreOfPlayers
  }
  updateDataPlayer(){
    this.setState({
      currentPlayer: this.setCurrentPlayer(),
      scoreOfPlayers: this.setScorePlayer()
    })
  }
  componentDidMount(){
    //-- Init the current player to player 1 --
    this.setState({ currentPlayer: this.state.players[0]})
  }

  render(){
    return(
      <div>
        <h4>Joueur courant: {this.state.currentPlayer}</h4>
        {"Score "+this.state.players[0]+": "+this.state.scoreOfPlayers['player_1']}
        <br/>
        {"Score "+this.state.players[1]+": "+this.state.scoreOfPlayers['player_2']}
        <br/>
      </div>
    )
  }
}

export default Player
