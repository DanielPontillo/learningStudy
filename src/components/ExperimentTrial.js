import React, {Component} from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TrialQuestionContent from '../components/TrialQuestionContent';
import QuestionCount from '../components/QuestionCount';
import BlockCount from '../components/BlockCount';
import ResponseOption from '../components/ResponseOption';


////<ul className="answerOptions">
         // {props.answerOptions.map(renderAnswerOptions)}
        //</ul>
class ExperimentTrial extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedResponse: false,
      feedback1: 'no_signal',
      feedback2: 'no_signal',
      feedback3: 'no_signal'
    };


  this.handleAnswerSelectedExperiment = this.handleAnswerSelectedExperiment.bind(this);

  }

  showFeedback(answerCorrect,selectedOption){
    
    if (selectedOption === "option1"){
      if (answerCorrect){
        this.setState({
        feedback1: 'smiley_img'
        });
      }
      else{
        this.setState({
        feedback1: 'frown_img'
        })
      }

    }
    else if (selectedOption === "option2"){
      if (answerCorrect){
        this.setState({
        feedback2: 'smiley_img'
        });
      }
      else{
        this.setState({
        feedback2: 'frown_img'
        })
      }


    }
    else if (selectedOption === "option3"){
      if (answerCorrect){
        this.setState({
        feedback3: 'smiley_img'
        });
      }
      else{
        this.setState({
        feedback3: 'frown_img'
        })
      }


    }
  }
    

  hideFeedbackAndProceed(response, selectedOption){
    
    
    this.setState({
      selectedResponse: false,
      feedback1: 'no_signal',
      feedback2: 'no_signal',
      feedback3: 'no_signal'
    })
    this.props.onAnswerSelected(response, selectedOption)
  }

  passResponseAndProceed(response,selectedOption){
    this.setState({
      selectedResponse: false,
    })
    this.props.onAnswerSelected(response, selectedOption)
  }


  handleAnswerSelectedExperiment(response, selectedOption) {
   // console.log("Handle answer experiment level, selected for " + this.props.trialcontents[0].learningType + " trial.")
    if (this.props.responseSelected){
      console.log("alreadySelectedResponse")
    }
    else{ 

    this.setState({
      selectedResponse: true
    })

    this.handleResponseAftermath(response,selectedOption);
    }
  }

  handleResponseAftermath(response,selectedOption){

    var answerCorrect = response === this.props.trialTarget
    

    

    if (this.props.blockType === "test" || this.props.blockType === "generalization"){
      //console.log("this is a test trial")

      setTimeout(() => this.passResponseAndProceed(response,selectedOption), 500);
    }

    else if (this.props.trialcontents[0].learningType === "reinforcement"){

      this.showFeedback(answerCorrect,selectedOption);
      //console.log("this is a reinforcement training trial")

      setTimeout(() => this.hideFeedbackAndProceed(response, selectedOption), 1000);

    }
    else{
      //console.log("this is a supervised training trial")
      setTimeout(() => this.passResponseAndProceed(response,selectedOption), 500);
    }

    

    }
    
  



  render(){
  return (

    <ReactCSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div className="experimentContainer" key={this.props.questionId}>

      

        {/*<QuestionCount
          counter={this.props.trialnum}
          total={this.props.numTrialsPerBlock}
        

        {this.props.block >0 ? 
          <BlockCount
          counter={this.props.block}
          total={this.props.totalNumBlocks}
        /> 
        : null}
      />*/}
      
        <TrialQuestionContent showcell={this.props.showcell} content={this.props.trialcontents} />
        
        
        
      </div>
      <div className="answerContainer">
      {this.state.selectedResponse ? <div className="answerBlockingScreen"></div> : <div/>}
        <ResponseOption feedback={this.state.feedback1} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal1} whichOption="option1" content={this.props.trialcontents[0].option1} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        <ResponseOption feedback={this.state.feedback2} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal2} whichOption="option2" content={this.props.trialcontents[0].option2} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        <ResponseOption feedback={this.state.feedback3} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal3} whichOption="option3" content={this.props.trialcontents[0].option3} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
      
      
      </div>
    </ReactCSSTransitionGroup>
  );
}
}

ExperimentTrial.propTypes = {
  
  
  trialcontents: React.PropTypes.array.isRequired,
  trialnum: React.PropTypes.number.isRequired,
  block: React.PropTypes.number.isRequired,
  miniblock: React.PropTypes.number.isRequired,
  blockType: React.PropTypes.string.isRequired,

  onAnswerSelected: React.PropTypes.func.isRequired
};

export default ExperimentTrial;



