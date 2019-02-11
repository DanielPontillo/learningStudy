import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';

//<label>Lorsque vous êtes prêt, appuyez sur le bouton pour démarrer le premier bloc d''apprentissage.</label><br/>

// <label>Appuyez sur le bouton pour démarrer le bloc d''apprentissage.</label><br/>

//
function FixationScreen(props) {


  return (
    

    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}
      transitionAppear
      transitionAppearTimeout={0}
    >
      <div>
        <center>
        <h1>+</h1>
        </center>

        <br/>
        <br/>
      </div>
      
    </ReactCSSTransitionGroup>
  );

}

FixationScreen.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};


export default FixationScreen;
