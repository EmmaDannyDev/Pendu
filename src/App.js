import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import Keyboard from './Keyboard';
import Pendu from './Pendu';
import Player from './Player';
import Menu from './Menu';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.refPlayer = React.createRef()
    this.refKeyboard = React.createRef()
    this.state = {
      arrayOfWords: ["OUI", "NON","COCO","TOTO", "TATA"],
      currentWord: [],
      maskWord: [],
      isWinner: false,
      winner: "",
      remainingAttempts: 7,
      isSuccessfulAttempts: false,
      gameStatus: 0, // 0 = Start Menu, 1 = Game in progress, 2 = End Of game, End Menu
      finalScorePlayer1: null,
      finalScorePlayer2: null
    }
  }

  //-- Return an integer in the min,max interval --
  getRandomIntInclusive(minInt, max) {
    minInt = Math.ceil(minInt);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - minInt +1)) + minInt;
  }
  //-- Pick a word in arrayOfWords[] --
  randomWord(){
    const randomInt = this.getRandomIntInclusive(0,(this.state.arrayOfWords.length - 1));
    const randomWord = this.state.arrayOfWords[randomInt]
    const randomWordArray = randomWord.split("")
    return randomWordArray
  }
  //-- Create a first mask --
  maskWord(randomWord){

    //-- First mask initialization --
    if(randomWord !== undefined){
      var maskWord = []
      randomWord.forEach(() => {
        maskWord.push("_")
      });

      return maskWord
    }
  }
  initWordAndMask(){
    const randomWord = this.randomWord()
    this.setState({
      currentWord: randomWord,
      maskWord: this.maskWord(randomWord)
    })
  }

  //-- Update the mask during the game --
  updateMaskWord(letter){
    //-- Use slice() to not keep the reference of this.state.maskWord --
    const newMaskWord = this.state.maskWord.slice()
    //-- Check if the selected letter is in the word --
    this.state.currentWord.forEach((currentLetter,i) => {
      if(letter === currentLetter){
        //-- Check if the letter is masked --
        this.state.maskWord.forEach((currentLetter,j) => {
          if(i === j && currentLetter === "_"){
            newMaskWord[j] = letter
          }
        });
      }
    });
    return newMaskWord
  }

  //-- Update the number of remaining attempts --
  decrementRemainingAttempts(isSuccessfulAttempts){
    let remainingAttempts = (!isSuccessfulAttempts ? this.state.remainingAttempts-1 : this.state.remainingAttempts)
    return remainingAttempts
  }

  //-- Init the winner if the game is finish --
  initWinner(){
    console.log("coucou")
    console.log(this.state.remainingAttempts)
    console.log(this.state.isWinner)
    console.log(this.state.gameStatus)
    const maskWord = this.state.maskWord.slice()
    const remainingAttempts = this.state.remainingAttempts
    const scorePlayer1 = this.refPlayer.current.state.scoreOfPlayers['player_1']
    const scorePlayer2 = this.refPlayer.current.state.scoreOfPlayers['player_2']
    let winner
    //-- Count how many masked letter there are --
    let nbMaskedLetter = 0
    maskWord.forEach((letter) => {
      nbMaskedLetter += ( letter === '_' ? 1 : 0)
    });
    //-- If the word has found then the winner is the current player --
    if(nbMaskedLetter === 0){
      winner = this.refPlayer.current.state.currentPlayer
    }
    //-- If remainingAttempts equal 0 then it's the player with the better score is winner --
    if(remainingAttempts <= 0){
      winner = (scorePlayer1 > scorePlayer2 ? this.refPlayer.current.state.players[0] : this.refPlayer.current.state.players[1])
    }
    //-- Init the winner if winner its defined and isWinner not yet equal true --
    if(winner !== undefined && !this.state.isWinner){
      const finalScorePlayer1 = this.refPlayer.current.state.scoreOfPlayers['player_1']
      const finalScorePlayer2 = this.refPlayer.current.state.scoreOfPlayers['player_2']
      //-- 1 seconde before display the last menu --
      this.setState({
        gameStatus: 2,
        isWinner: true,
        winner: winner,
        finalScorePlayer1: finalScorePlayer1,
        finalScorePlayer2: finalScorePlayer2
      })
    }
  }
  updateDataGame(newMaskWord, isSuccessfulAttempts, remainingAttempts){
    this.setState({
      maskWord: newMaskWord,
      isSuccessfulAttempts: isSuccessfulAttempts,
      remainingAttempts: remainingAttempts,
    })
  }
  //-- Event Manager of keyDown in Keyboard --
  handlePressKeyboard(letter){
    const newMaskWord = this.updateMaskWord(letter)
    const currentMask = this.state.maskWord
    const isSuccessfulAttempts = !(newMaskWord.toString() === currentMask.toString())
    const remainingAttempts = this.decrementRemainingAttempts(isSuccessfulAttempts)
    //-- Fill the failedLetters array --
    this.refKeyboard.current.failedLetters(letter, isSuccessfulAttempts)
    //-- Update the score and the current player --
    this.refPlayer.current.updateDataPlayer()
    //-- Update maskWord, isSuccessfulAttempts and remainingAttempts --
    this.updateDataGame(newMaskWord, isSuccessfulAttempts, remainingAttempts)
    //-- If a winner has found then init the winner --
    this.initWinner()
  }
  //-- Change the status of the game --
  updateStatusOfGame(status){
    this.setState({gameStatus: status})
  }
  //-- Unmount and remount App.js to reset the game --
  resetGame(status){
    this.updateStatusOfGame(1)
    this.initWordAndMask()
    //-- Not need to reset the currentPlayer and the scoreOfPlayers because Players.js is unmounted --
    this.setState({
      remainingAttempts: 7,
      isWinner: false,
      winner: "",
      gameStatus: status
    })
  }

  componentDidMount(){
    this.initWordAndMask()
  }

  render(){
    console.log(this.state.gameStatus)
    return (
      <div id="container">
        {/* Display the start menu */}
        {this.state.gameStatus === 0 && <Menu onClick={(status) => this.updateStatusOfGame(status)} gameStatus={this.state.gameStatus}/>}
        {this.state.gameStatus === 1 && (
          <div>
            <div id="game">

              <h4>Tentatives restantes: {this.state.remainingAttempts}</h4>

              <Player ref={this.refPlayer} isSuccessfulAttempts={this.state.isSuccessfulAttempts}/>

              <div id="maskWord">{this.state.maskWord}</div>

            </div>
            {<Pendu isSuccessfulAttempts={this.state.isSuccessfulAttempts} remainingAttempts={this.state.remainingAttempts}/>}
            <Keyboard ref={this.refKeyboard} handlePressKeyboard={(letter) => this.handlePressKeyboard(letter)} isSuccessfulAttempts={this.state.isSuccessfulAttempts}/>
          </div>
        )}
        {this.state.gameStatus === 2 && <Menu
          gameStatus={this.state.gameStatus}
          currentWord={this.state.currentWord}
          remainingAttempts={this.state.remainingAttempts}
          finalScorePlayer1={this.state.finalScorePlayer1}
          finalScorePlayer2={this.state.finalScorePlayer2}
          winner={this.state.winner}
          onClick={(status) => this.resetGame(status)}
        />}

      </div>
    );
  }
}

export default App;
