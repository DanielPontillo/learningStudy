import React, {Component} from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TrialQuestionContent from '../components/TrialQuestionContent';
import QuestionCount from '../components/QuestionCount';
import BlockCount from '../components/BlockCount';
import ResponseOption from '../components/ResponseOption';

import KeyHandler, { KEYPRESS } from 'react-key-handler';

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
      feedback3: 'no_signal',
      paused: false,
      blockType:null,
      trialcontents: null,

    };
    var timeoutID = null


  this.handleAnswerSelectedExperiment = this.handleAnswerSelectedExperiment.bind(this);

  this.handleResume = this.handleResume.bind(this);

  this.handlePause = this.handlePause.bind(this);


  }

  componentWillMount(){
    console.log("component will mount")
    console.log(this.props.trialContents)

    this.setState({blockType:this.props.blockType,
      trialcontents: this.props.trialContents})
  }

  componentDidMount(){
    //document.addEventListener("keydown", this.keyHandlerExperiment);

  }
  
  componentWillUpdate(){ 
    //document.removeEventListener("keydown", this.keyHandlerExperiment);
  }

  componentDidUpdate() {

   //console.log("component did update")
    //console.log(this.state.selectedResponse)
    //console.log(Date.now())

}

componentWillReceiveProps(){

  //console.log("component willreceive props")
  //console.log(this.state.selectedResponse)
  //console.log(Date.now())
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


  showConfirmation(selectedOption){

    console.log("show confirmation")
    
    
    if (selectedOption === "option1"){
      
        this.setState({
        feedback1: 'confirmation_arrow'
        });
      

    }
    else if (selectedOption === "option2"){
      this.setState({
        feedback2: 'confirmation_arrow'
        });
      


    }
    else if (selectedOption === "option3"){
      this.setState({
        feedback3: 'confirmation_arrow'
        });
      

    }
  }
    

  hideFeedbackAndProceed(response, selectedOption,selectionTime){
    console.log("hide feedback and proceed")

    this.setState({
      selectedResponse: false,
      feedback1: 'no_signal',
      feedback2: 'no_signal',
      feedback3: 'no_signal'
    })
    this.props.onAnswerSelected(response, selectedOption, selectionTime)

  }

  passResponseAndProceed(response,selectedOption,selectionTime){

    console.log("pass response and proceed, hide feedback, call parent class")

    this.setState({
      selectedResponse: false,
      feedback1: 'no_signal',
      feedback2: 'no_signal',
      feedback3: 'no_signal'
    })

    this.props.onAnswerSelected(response, selectedOption, selectionTime)
  }

  handlePause(event){
    console.log("handlePause")
    console.log(event)

    if(this.state.paused === false){
     
      clearTimeout(this.timeoutID);

      this.setState({
         paused: true
        })

      this.props.keyHandlerAppLevel("p")
    }



  }
  handleResume(event){
    console.log("handleResume")

    if(this.state.paused === true){
      clearTimeout(this.timeoutID);
      
      this.setState({
         paused: false
        })
      this.props.keyHandlerAppLevel("r")
      
    }


  }


  handleAnswerSelectedExperiment(response, selectedOption) {


    var selectionTime = Date.now()

    console.log("Handle Answer Selected Experiment: "+ response + " " + selectedOption + " at " + selectionTime)
    

  
    if (this.props.responseSelected){
      console.log("Already Selected Response")
    }
    else{ 

    this.setState({
      selectedResponse: true
    })

    this.handleResponseAftermath(response,selectedOption, selectionTime);
    }
  }

  handleResponseAftermath(response,selectedOption, selectionTime){

    var answerCorrect = response === this.props.trialTarget
    
    console.log("Handle Response Aftermath: " + response + " " + selectedOption + " at " + selectionTime)
    

    if (this.props.blockType === "test" || this.props.blockType === "generalization"){
      //console.log("this is a test trial")
      this.showConfirmation(selectedOption);
      this.timeoutID = setTimeout(() => this.passResponseAndProceed(response,selectedOption,selectionTime), 1500);
    }

    else if (this.props.trialcontents[0].learningType === "reinforcement"){

      this.showFeedback(answerCorrect,selectedOption);
      //console.log("this is a reinforcement training trial")

      this.timeoutID = setTimeout(() => this.passResponseAndProceed(response, selectedOption,selectionTime), 1500);

    }
    else{

      this.showConfirmation(selectedOption);
      //console.log("this is a supervised training trial")
      this.timeoutID = setTimeout(() => this.passResponseAndProceed(response,selectedOption,selectionTime), 1500);
    }

    

    }
    
  



  render(){
  return (
    <div>
    <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="p"
          onKeyHandle={this.handlePause}
        />

      <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="r"
          onKeyHandle={this.handleResume}
        />

    {this.state.paused ? <center><h1> EXPÉRIENCE PAUSÉE</h1><br/><br/><h3>appuyez sur 'r' pour reprendre</h3></center> :
    <ReactCSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}
      transitionAppear
      transitionAppearTimeout={0}
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
        {this.state.selectedResponse ?
         <div>
        <ResponseOption optionID = {"option1"} responseSelected = {this.state.selectedResponse} feedback={this.state.feedback1} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={"nonSelectable"} whichOption="option1" content={this.props.trialcontents[0].option1} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        <ResponseOption optionID = {"option2"} responseSelected = {this.state.selectedResponse} feedback={this.state.feedback2} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={"nonSelectable"} whichOption="option2" content={this.props.trialcontents[0].option2} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        <ResponseOption optionID = {"option3"} responseSelected = {this.state.selectedResponse} feedback={this.state.feedback3} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={"nonSelectable"} whichOption="option3" content={this.props.trialcontents[0].option3} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        </div> : <div>
        <ResponseOption optionID = {"option1"} responseSelected = {this.state.selectedResponse} feedback={this.state.feedback1} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal1} whichOption="option1" content={this.props.trialcontents[0].option1} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        <ResponseOption optionID = {"option2"} responseSelected = {this.state.selectedResponse} feedback={this.state.feedback2} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal2} whichOption="option2" content={this.props.trialcontents[0].option2} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        <ResponseOption optionID = {"option3"} responseSelected = {this.state.selectedResponse} feedback={this.state.feedback3} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal3} whichOption="option3" content={this.props.trialcontents[0].option3} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        </div>
      }
      
      </div>
    </ReactCSSTransitionGroup>
  }
  </div>
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



