import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const styles = {
  container: {
    position: 'fixed',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #5B5858 50%, #E99C74 50%)',
  },
  box_menu: {
    backgroundColor: 'white',
    width: '400px',
    textAlign: 'center',
    borderRadius: ' 18px 18px 22px 22px'
  },
  box_button: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    borderRadius: 'inherit',
    fontSize: '20px',
    padding: '15px',
    '&:nth-child(2)': {
      backgroundColor: '#5b5858',
      color: '#e99c74',
      borderRadius: '0 0 18px 18px'
    }
  },
  button_first_menu: {
    width: '160px',
    borderRadius: '3px',
    marginBottom: '15px',
    fontSize: '16px',
    backgroundColor: '#5b5858',
    color: '#e99c74',
    '&:hover': {
      backgroundColor: '#5b5858'
    }
  },
  button_last_menu_1: {
    width: '200px',
    padding: '15px 0 !important',
  },
  button_last_menu_2: {
    width: '200px',
    borderRadius: '3px',
    marginBottom: '15px',
    fontSize: '16px',
    backgroundColor: '#5b5858',
    color: '#e99c74',
    '&:hover': {
      backgroundColor: '#5b5858'
    },
  },
  rules: {
    fontSize: '18px',
    lineHeight: '1.9',
    padding: '0 30px',
    textAlign: 'justify'
  },
  '@global': {
    'h1': {
      borderBottom: '1px dashed black',
      paddingBottom: '20px',
      marginBottom: '0px'
    },
    'button': {
      padding: '10px !important'
    }
  }
}

class Menu extends Component{
  constructor(props){
    super(props)
    this.state = {
      showRules: false
    }
  }
  handleClickRules(boolean){
    this.setState({ showRules: boolean })
  }
  render(){
    const { classes } = this.props
    return(
      <Container className={classes.container} maxWidth="xl">
        <Box className={classes.box_menu} boxShadow={11}>
          {/* Show the menu just if the rules is not display */}
          {!this.state.showRules && this.props.gameStatus === 0 && (
            <div>
              <h1>Jeux Du Pendu</h1>
              <Box className={classes.box_button}>
                <Button className={classes.button} onClick={() => this.handleClickRules(true)}>
                  Règles du jeux
                </Button>
                <Button className={classes.button} variant="contained" onClick={() => this.props.onClick(1)}>
                  Jouer
                </Button>
              </Box>
            </div>
          )}
          {/* If the button rules of game is clicked then show the rules */}
          {this.state.showRules && this.props.gameStatus === 0 && (
            <div>
              <h1>Règles du jeux</h1>
              <p className={classes.rules}>
                Le but du jeux est de trouver le mot avant l'adversaire. Si les 2 joueurs non pas trouvés le mot avant la fin
                de la partie alors c'est le score qui déterminera le gagnant.
                Au cours de la partie si un joueur échoue il se verra retirer 1 point, en revanche s'il trouve la bonne lettre
                il se verra atrribuer 2 points.
              </p>
              <Button className={classes.button_first_menu} variant="contained" onClick={() => this.handleClickRules(false)}>
                Retour
              </Button>
            </div>
          )}
          {/* Display the end game menu */}
          {this.props.gameStatus === 2 && (
            <div>
              <h1>Fin du jeux</h1>
              {/* The word has been found */}
              {this.props.remainingAttempts !== 0 && (
                <div>
                  <p>
                    <h3>Mot trouvé:</h3>
                    {this.props.currentWord}<br/>
                    <h3>{this.props.winner} à gagné !</h3>
                  </p>
                </div>
              )}
              {/* The word has not been found */}
              {this.props.remainingAttempts === 0 && (
                <div>
                  <p>
                    <h3>Mot non trouvé:</h3>
                    {this.props.currentWord}
                    <h3>Récapitulatif des scores:</h3>

                    Score Joueur 1: {this.props.finalScorePlayer1} <br/>
                    Score Joueur 2: {this.props.finalScorePlayer2} <br/><br/>
                    <h3>{this.props.winner} a fait le meilleur score !</h3><br/>
                  </p>
                </div>
              )}
              <Button className={classes.button_last_menu_1} onClick={() => this.props.onClick(0)}>
                Menu Principal
              </Button>
              <br/>
              <Button className={classes.button_last_menu_2} onClick={() => this.props.onClick(1)} variant="contained">
                Rejouer
              </Button>


            </div>
          )}
        </Box>
      </Container>
    )
  }
}
export default withStyles(styles)(Menu)
