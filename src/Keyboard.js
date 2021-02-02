import React, { Component } from 'react'

class Keyboard extends Component{
  constructor(props){
    super(props)
    this.handleKeydown = this.handleKeydown.bind(this);
    this.state = {
      failedLetters: []
    }
  }
  handleKeydown(event){
    return (this.isAuthorizedLetter(event.key) && this.props.handlePressKeyboard(event.key.toUpperCase()))
  }
  //-- Return the press key to event manager handlePressKeyboard in App.js if isAuthorizedLetter --
  eventKeyboard(){
    document.addEventListener('keydown',this.handleKeydown)
  }
  //-- includes() return "true" if the key match with the array else he return "false" --
  isAuthorizedLetter(key){
    const authorizedLetter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    return authorizedLetter.includes(key.toUpperCase())
  }
  //-- its call by refKeyboard in App.js, fill the failedLetters array --
  failedLetters(letter, isSuccessfulAttempts){
    const failedLetters = this.state.failedLetters.slice()
    if(!isSuccessfulAttempts){
      failedLetters.push(<button disabled>{letter}</button>)
    }
    this.setState({failedLetters: failedLetters})
  }
  componentDidMount(){
    this.eventKeyboard()
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeydown)
  }

  render(){
    return(
      <div id="keyboard">{this.state.failedLetters}</div>
    )
  }
}

export default Keyboard
