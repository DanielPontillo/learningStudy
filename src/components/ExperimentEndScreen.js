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
      <div>
      <text>
        <div id={"logo_img"}></div>
       
      En appuyant sur le bouton d'envoi ci-dessous, l'expérience sera terminée. Merci pour votre participation!<br/><br/>
    <br/>
    <br/>
        
        
        </text>
         </div>
       

      <div className="buttonContainer">
      <label>Appuyez sur le bouton pour soumettre et finir l'expérience</label><br/>
      
      
      <Button className="button" onClick={this.handleExperimentEndScreenLocal}>
      Soumettre
      </Button>


      </div>
      
    </ReactCSSTransitionGroup>
  );

}

}


export default ExperimentEndScreen;
