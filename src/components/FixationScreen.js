import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';

//<label>Lorsque vous êtes prêt, appuyez sur le bouton pour démarrer le premier bloc d''apprentissage.</label><br/>

// <label>Appuyez sur le bouton pour démarrer le bloc d''apprentissage.</label><br/>

//
function FixationScreen(props) {

const imgDivStyle = {
    display: 'block',
    height: 60
  };

  return (
    <div>
    
    <ReactCSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}
      transitionAppear
      transitionAppearTimeout={0}
    >
    <div className="experimentContainer" >

     <div className="fullTrialContent">
     <br/>
     
    <div className="singular_empty">
      
    
      <div  style={imgDivStyle}></div>
  
     </div>

     <center><h1>+</h1></center>

    <div className="question">
      </div>
  </div>
  </div>
      
    </ReactCSSTransitionGroup>

    </div>
  );

}

FixationScreen.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};


export default FixationScreen;
