import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';



class ExperimentEndSurvey extends Component{
  constructor(props){
    super(props);

    this.state = {
      comments: '',
    };

    this.handleExperimentEndSurveyLocal = this.handleExperimentEndSurveyLocal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {

    if (e.target.name === 'comments'){
      this.setState({ comments: e.target.value });
    }
    
    
  }



  handleExperimentEndSurveyLocal(){

    //update comments

    var comments = this.state.comments;
    //send to controller parent
   
    this.props.handleExperimentEndSurvey(this,comments);
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
        
       
      Merci pour votre participation!<br/><br/>
    <br/>
    <br/>
        
        
        </text>
         </div>
    <br/>
    <br/>
        
       

      <div className="buttonContainer">
      <label>Appuyez sur le bouton pour soumettre</label><br/>
       
      <Button className="button" onClick={this.handleExperimentEndSurveyLocal}>
      Soumettre
      </Button>
      </div>
      
    </ReactCSSTransitionGroup>
  );

}

}



export default ExperimentEndSurvey;
