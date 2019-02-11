import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';

//<label>Lorsque vous êtes prêt, appuyez sur le bouton pour démarrer le premier bloc d''apprentissage.</label><br/>

// <label>Appuyez sur le bouton pour démarrer le bloc d''apprentissage.</label><br/>

//
function TestBlockstart(props) {


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

        {props.testBlockStartText}
        
        </center>

        <br/>
        <br/>
      </div>
      
    </ReactCSSTransitionGroup>
  );

}

TestBlockstart.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};


export default TestBlockstart;
