import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';

//<label>Lorsque vous êtes prêt, appuyez sur le bouton pour démarrer le premier bloc d''apprentissage.</label><br/>

// <label>Appuyez sur le bouton pour démarrer le bloc d''apprentissage.</label><br/>

//
function TriggerWaitScreen(props) {


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
        <center>
        <div>En attente de trigger</div> 
        </center>
        <br/>
        <br/>
      </div>

      


      
    </ReactCSSTransitionGroup>
  );

}

TriggerWaitScreen.propTypes = {
  
  //quizResult: React.PropTypes.string.isRequired,
};


export default TriggerWaitScreen;
