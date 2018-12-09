import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';



class ExperimentEndScreen extends Component{
  constructor(props){
    super(props);

    this.state = {
    
    };

    this.handleExperimentEndScreenLocal = this.handleExperimentEndScreenLocal.bind(this)
    
  }



  handleExperimentEndScreenLocal(){

    //update comments

    //send to controller parent
   
    this.props.handleExperimentEndScreen(this);
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

    {this.props.platformType === "server" ?


      <div>
      <text>
        <div id={"logo_img"}></div>
       
      Merci pour votre participation!<br/><br/>
    <br/>
    <br/>
        
        
        </text>
         </div>
     : this.props.platformType === "local" ?

     <div>
      <text>
        <div id={"logo_img"}></div>
       
      Merci pour votre participation! S'il vous plaît informer l'expérimentateur et <b>ne fermez pas </b> la fenêtre du navigateur.<br/><br/>
    <br/>
    <br/>
        
        
        </text>
         </div>


         :

        <div>
      <text>
        <div id={"logo_img"}></div>
       
      En appuyant sur le bouton d'envoi ci-dessous, l'expérience sera terminée. Merci pour votre participation!<br/><br/>
    <br/>
    <br/>
        
        
        </text>
         </div>

       }
       

      <div className="buttonContainer">


      {this.props.platformType === "mturk_sandbox" ?

      <div>
      <label>Appuyez sur le bouton pour soumettre et finir l'expérience</label><br/>
      
      <form id="hitForm" action="https://workersandbox.mturk.com/mturk/externalSubmit" method="POST">
        <input type="hidden" name="assignmentId" value={this.props.assignmentId} />
        <input type="hidden" name="participantID" value={this.props.participantID} />
        <input type="hidden" name="responses" value={this.props.responses} />
        <input type="hidden" name="responseTimes" value={this.props.responseTimes} />
        <input type="hidden" name="responsesCorrect" value={this.props.responsesCorrect} />
        <input type="hidden" name="demographicsInfo" value={this.props.demographicsInfo} />
        <input type="hidden" name="participantComments" value={this.props.participantComments} />
        <input type="submit" className="button" />
      </form>
      </div>

      : this.props.platformType === "mturk" ?
      <div>
      <label>Appuyez sur le bouton pour soumettre et finir l'expérience</label><br/>
      
        <form id="hitForm" action="https://www.mturk.com/mturk/externalSubmit" method="POST">
        <input type="hidden" name="assignmentId" value={this.props.assignmentId} />
        <input type="hidden" name="participantID" value={this.props.participantID} />
        <input type="hidden" name="responses" value={this.props.responses} />
        <input type="hidden" name="responseTimes" value={this.props.responseTimes} />
        <input type="hidden" name="responsesCorrect" value={this.props.responsesCorrect} />
        <input type="hidden" name="demographicsInfo" value={this.props.demographicsInfo} />
        <input type="hidden" name="participantComments" value={this.props.participantComments} />
        <input type="submit" className="button" />
      </form>
      </div>
      :
      <div></div>
      
      }

      </div>
      
    </ReactCSSTransitionGroup>
  );

}

}


export default ExperimentEndScreen;
