import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';


function Instructions(props) {
  
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
      <div>
        
        <div id={"instructions_img"}></div>
      
        <br/>
      </div>

      <div className="buttonContainer">
      <label>Lorsque vous êtes prêt, appuyez sur le bouton pour commencer l'entraînement.</label><br/>
       
      <Button className="button" onClick={props.handleInstructionsScreen.bind(this)}>
      Commencer
      </Button>
      </div>


      
    </ReactCSSTransitionGroup>
  );

}

Instructions.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};


export default Instructions;
