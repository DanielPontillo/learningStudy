import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';

//<label>Lorsque vous êtes prêt, appuyez sur le bouton pour démarrer le premier bloc d''apprentissage.</label><br/>

// <label>Appuyez sur le bouton pour démarrer le bloc d''apprentissage.</label><br/>

//
function Blockstart(props) {


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
        {props.blockType === "training" && props.currentMiniblock === 0 ? <div>Nous allons d'abord vous montrer quelques exemples d'essais d'apprentissage.</div>  : null}
        {props.blockType === "test" && props.currentMiniblock === 0 ? <div>Nous allons maintenant vous montrer quelques exemples d'essais de test.</div>  : null}
        {props.blockType === "training" && props.currentMiniblock === 1 ? <div>Nous allons maintenant commencons le premier bloc.</div>  : null}
        </center>
        
        {props.blockType === "training" && props.currentMiniblock > 1 ? <div>Ce bloc est terminé.<br/><br/></div>  : null}
        {props.blockType === "training" && props.currentMiniblock > 1 ? props.lastTestBlockPerformanceMessage + props.lastTestBlockPerformance : null}<br/>
        {props.blockType === "training" && props.currentMiniblock > 1 ? props.cumulativeTestPerformanceMessage + props.cumulativeTestPerformance : null}
        
        <br/>
        <br/>
      </div>

      <div className="buttonContainer">
      
      <label>{props.blockType === "training" ? props.trainingBlockButtonLabel : props.testBlockButtonLabel }</label><br/>
      <Button className="button" onClick={props.handleBlockstartScreen.bind(this)}>
      Démarrer
      </Button>
      </div>


      
    </ReactCSSTransitionGroup>
  );

}

Blockstart.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};


export default Blockstart;
