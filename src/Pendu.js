import React, { PureComponent } from 'react'

class Pendu extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      numberOfStep: 7
    }
  }
  displayStepOfPendu(){
    const numberOfStep = this.state.numberOfStep
    const stepOfPendu = document.getElementById('pendu').children
    const isSuccessfulAttempts = this.props.isSuccessfulAttempts
    const remainingAttempts = this.props.remainingAttempts

    //-- Don't display step of pendu if the player has not yet played and if his Attempt it's success --
    if(remainingAttempts !== numberOfStep && !isSuccessfulAttempts){
      for (var i = 0; i < numberOfStep; i++) {
        if(stepOfPendu[i].style.display != "block"){
          stepOfPendu[i].style.display = "block"
          break
        }
      }
    }

  }
  componentDidUpdate(prevProps){
    this.displayStepOfPendu()
  }

  render(){
    return(
      <div id="pendu_block">
        <div id="pendu_base">
          <div id="pendu">
            <div id="head"></div>
            <div id="body"></div>
            <div className="arm"></div>
            <div className="arm right"></div>
            <div className="leg"></div>
            <div className="leg right"></div>
            <div id="face">
              <div className="eyes"></div>
              <div className="eyes right"></div>
              <div id="mouth"></div>
            </div>
          </div>
          <div className="base base_5"></div>
          <div className="base base_4"></div>
          <div className="base base_3"></div>
          <div className="base base_2"></div>
          <div className="base base_1"></div>
        </div>
      </div>
    )
  }
}

export default Pendu
