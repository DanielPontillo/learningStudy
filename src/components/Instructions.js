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
    
    if(whichButton == "left" && curText > 1){
      this.setState({currentInstructionText: curText-1});
    }
    else if(whichButton ==="right" && curText < 3){
      
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


      <div className="instructionsTextBox">
        
        {this.state.currentInstructionText === 1 ? <div> Dans cette expérience, vous devrez apprendre les règles d’une langue étrangère d’une autre galaxie. Les extraterrestres qui habitent là utilisent des objets inconnus sur la Terre. Vous n'avez pas besoin de mémoriser leurs noms, mais vous devez apprendre les règles de grammaire.<br/><center><div id={"example_object1"}></div></center></div>: null}
        {this.state.currentInstructionText === 2 ? <div><p>À chaque essai, on vous présentera un mot associé avec l'image d'un objet étranger.</p> <p>Dans certains tests, vous apprendrez la règle pour indiquer plusieurs objets. Par un exemple dans votre langue, comme dans l'écran ci-dessus, vous apprendrez à dire le mot "bouteilles" à partir du mot "bouteille".</p> <center><div id={"example1_img"}></div></center><p>Dans d'autres essais, vous allez apprendre comment marquer des objets de petit taille. Par exemple, vous allez apprendre à dire 'petite pomme'.</p><center><div id={"example2_img"}></div></center></div>: null}
        {this.state.currentInstructionText === 3 ? <div>Par la suite:<br/><ol><li>Pendant les blocs d'apprentissage, dans certains essais, on vous donnera un retour par apport à votre réponse.</li><li> Dans les autres essays, vous aurez un indice indiquant que l'une des trois options possibles est correcte ou incorrecte. Vous devez sélectionner l'élément sous l'indice, même s'il est incorrect.</li><li>Pendant les blocs de test, vous n'auriez pas de retour ni d'indice.</li><li>Il y a une limite de temps pour chaque essai, donc procédez rapidement.</li></ol><br/>Maintenant, on vous montrera d'abord quelques exemples.<br/></div>: null}
      
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
