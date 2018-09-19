import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';


function Intro(props) {
  
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
      <text>
        <div id={"logo_img"}></div>
        <br/>

        [consent form goes here]
        <br/><br/>
        </text>
         </div>
       

      <div className="buttonContainer">
      <label>En cliquant sur Soumettre, j'accepte que j'ai lu et compris ce formulaire de consentement</label><br/>
       
      <Button className="button" onClick={props.handleConsentResponse.bind(this)}>
      Soumettre
      </Button>
      </div>
      
    </ReactCSSTransitionGroup>
  );

}

Intro.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};

export default Intro;
