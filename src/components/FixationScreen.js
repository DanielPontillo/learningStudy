import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';
import ResponseOption from '../components/ResponseOption';
import SizeTrialContent from '../components/SizeTrialContent';

//<label>Lorsque vous êtes prêt, appuyez sur le bouton pour démarrer le premier bloc d''apprentissage.</label><br/>

// <label>Appuyez sur le bouton pour démarrer le bloc d''apprentissage.</label><br/>

//
function FixationScreen(props) {

const imgDivStyle = {
    display: 'block',
    height: 60
  };

  return (
    <div className = "fixation_container">
    
    
      <div className="experimentContainer" >

        <div className="fullTrialContent">
          <br/>
            <center><h1>+</h1></center><br/>

            <div className="singular_empty">
              <h2 className="rootword"> &nbsp; </h2>
                <div  style={imgDivStyle}></div>
            </div>

            <div className="question">
              <div className="sizegrid">
                <div style={imgDivStyle}></div>
              </div>
            </div>
        </div>
        <br/><br/>

        

    

  <div className="answerContainer">
        
         <div>
        <ResponseOption optionID = {"option1"} responseSelected = {false} feedback={""} blockType={""} trialTarget={""} learningType={""} teachingSignal={"nonSelectable"} whichOption="option1" content={""} response={""} handleAnswerSelectedExperiment={""} />
        <ResponseOption optionID = {"option2"} responseSelected = {false} feedback={""} blockType={""} trialTarget={""} learningType={""} teachingSignal={"nonSelectable"} whichOption="option2" content={""} response={""} handleAnswerSelectedExperiment={""} />
        <ResponseOption optionID = {"option3"} responseSelected = {false} feedback={""} blockType={""} trialTarget={""} learningType={""} teachingSignal={"nonSelectable"} whichOption="option3" content={""} response={""} handleAnswerSelectedExperiment={""} />
        </div> 
</div>

  </div>
      
    
    </div>
  );

}

FixationScreen.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};


export default FixationScreen;
