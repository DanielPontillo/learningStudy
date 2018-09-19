import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';


class Instructions extends Component {

  constructor(props) {
    super(props);
        this.state = {
          currentInstructionText: 1,
          readyToProceed: false
        }

         this.handleInstructionsLocal = this.handleInstructionsLocal.bind(this)
      }

    handleInstructionsLocal(event){
    var curText = this.state.currentInstructionText;
    var whichButton = event.currentTarget.id;
    console.log(curText)
    console.log(curText < 3)
    console.log(whichButton)
    if(whichButton == "left" && curText > 1){
      this.setState({currentInstructionText: curText-1});
    }
    else if(whichButton ==="right" && curText < 3){
      console.log("should transition")
      this.setState({currentInstructionText: curText+1});
    }
    if(whichButton ==="right" && curText === 2){
      this.setState({readyToProceed: true});
    }
  }

        render(){
  
  return (
    

    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <center>
      <div>Instructions</div></center>

      <center>
      <div className="instructionsButtonContainer">

      {this.state.currentInstructionText > 1 ?
      
      <Button id="left" className="buttonInstructions" onClick={this.handleInstructionsLocal}>
      &#8592;
      </Button>
      : 
      <Button id="left" className="buttonInstructionsHidden">
      &#8592;
      </Button>

      }

      {this.state.currentInstructionText < 3 ?
      <Button id="right" className="buttonInstructions" onClick={this.handleInstructionsLocal}>
      &#8594;
      </Button>
      : 
      <Button id="right" className="buttonInstructionsHidden">
      &#8594;
      </Button>

      }

      </div>
      </center>


      <div className="instructionsText">
        
        {this.state.currentInstructionText === 1 ? <div>Dans cette expérience, vous allez apprendre une langue étrangère. Dans certains essais, vous apprendrez à pluraliser les objets. Par example, vous allez apprendre à dire le mot 'les pommes' étant donné le mot 'le pomme'. Dans d'autres essais, vous allez apprendre comment marquer des objets de petit taille. Par exemple, vous allez apprendre à dire 'petit pomme'.</div>: null}
        {this.state.currentInstructionText === 2 ? <div>À chaque essai, on vous présentera un mot associé avec l'image d'un objet étranger. Sur l'écran suivant, on vous demandra soit le pluriel du mot, soit la forme "petit taille" du mot. Chaque fois, on vous présentera trois options possibles et vous serez invité(e)s à sélectionner la bonne. </div>: null}
        {this.state.currentInstructionText === 3 ? <div>Par la suite:<br/><ol><li>Pendant les blocs d'apprentissage, dans certains essais, on vous donnera un retour par apport à votre réponse.</li><li> Dans les autres essays, vous aurez un inice indiquant que l'une des trois options possibles est correcte ou incorrecte. Vous devez sélectionner l'élément sous l'indice, même s'il est incorrect.</li><li>Pendant les blocs de test, vous n'auriez pas de retour ni d'indice.</li><li>Il y a une limite de temps pour chaque essai, donc procédez rapidement.</li></ol><br/>Maintenant, on vous montrera d'abord quelques exemples.<br/></div>: null}
      
      </div>
      

      <br/>


      {this.state.readyToProceed ? 
      <div className="buttonContainer">
      <label>Lorsque vous êtes prêt, appuyez sur le bouton pour commencer l'entraînement.</label><br/>
       
      <Button className="button" onClick={this.props.handleInstructionsScreen.bind(this)}>
      Commencer
      </Button>
      </div>
      : null}

      
      
    </ReactCSSTransitionGroup>
  );

}

}

Instructions.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};


export default Instructions;
