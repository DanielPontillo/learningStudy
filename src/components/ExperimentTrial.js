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
      teachingSignal1: null,
      teachingSignal2: null,
      teachingSignal3: null


    };
    var timeoutID = null


  this.handleAnswerSelectedExperiment = this.handleAnswerSelectedExperiment.bind(this);

  this.handleResume = this.handleResume.bind(this);

  this.handlePause = this.handlePause.bind(this);

  this.keyHandlerExperiment = this.keyHandlerExperiment.bind(this);

  }

  componentWillMount(){
    console.log("component will mount")
    console.log(this.props.trialContents)

    this.setState({blockType:this.props.blockType,
      trialcontents: this.props.trialContents,
      teachingSignal1: this.props.teachingSignal1,
      teachingSignal2: this.props.teachingSignal2,
      teachingSignal3: this.props.teachingSignal3})
  }

  componentDidMount(){
    //document.addEventListener("keydown", this.keyHandlerExperiment);

  }
  
  componentWillUpdate(){
    
    //document.removeEventListener("keydown", this.keyHandlerExperiment);
  }

  componentDidUpdate(oldProps) {

  //const newProps = this.props
  //if(oldProps.field !== newProps.field) {
  //  this.setState({ ...something based on newProps.field... })

  //}
}



  //componentDidUpdate(){
    //console.log("componentDidUpdate")
   //document.addEventListener("keydown", this.keyHandlerExperiment);
  //}

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
    console.log("hide feedback and proceed")

    this.setState({
      selectedResponse: false,
      feedback1: 'no_signal',
      feedback2: 'no_signal',
      feedback3: 'no_signal'
    })
    this.props.onAnswerSelected(response, selectedOption)

  }

  passResponseAndProceed(response,selectedOption){

    console.log("pass response and proceed, call parent class")

    this.setState({
      selectedResponse: false,
    })

    this.props.onAnswerSelected(response, selectedOption)
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

  keyHandlerExperiment(event) {
    console.log("key handler experiment called")
    
    var keyPressed = String(event.keyCode);

    if(this.state.paused === false && keyPressed === "66" ){
      console.log(this.props.teachingSignal1)
      console.log(this.props.blockType)

      if(this.props.teachingSignal1 === 'nonSelectable' && this.props.blockType === 'training'){

      console.log("Blue nonselectable")

    }
    else{
      console.log("Blue selected")
      clearTimeout(this.timeoutID);

      var response = this.props.trialcontents[0].option1
      var selectedOption= "option1"
      

      if (this.props.responseSelected){
        console.log("alreadySelectedResponse")

      }
      else{ 

        this.handleAnswerSelectedExperiment(response, selectedOption);
        //this.props.keyHandler(keyPressed)

      }

      }

    }
    else if(this.state.paused == false && keyPressed === "89"){
      console.log(this.props.teachingSignal2)
      console.log(this.props.blockType)


      if(this.props.teachingSignal2 === 'nonSelectable' && this.props.blockType === 'training'){

      console.log("yellow nonselectable")

    }
    else{
      console.log("yellow selected")
      clearTimeout(this.timeoutID);

      console.log("Yellow")
      var response = this.props.trialcontents[0].option2
      var selectedOption= "option2"

      if (this.props.responseSelected){
        console.log("alreadySelectedResponse")
      }
      else{ 

        this.handleAnswerSelectedExperiment(response, selectedOption);
        //this.props.keyHandler(keyPressed)

        
      }

      }

    }
    else if(this.state.paused == false && keyPressed === "71"){
      console.log(this.props.teachingSignal3)
      console.log(this.props.blockType)

      if(this.props.teachingSignal3 === 'nonSelectable' && this.props.blockType === 'training'){

      console.log("Green nonselectable")

    }
    else{
      console.log("green selected")
      clearTimeout(this.timeoutID);

      console.log("Green")
      var response = this.props.trialcontents[0].option3
      var selectedOption= "option3"

      if (this.props.responseSelected){
        console.log("alreadySelectedResponse")
      }

      else{ 

        this.handleAnswerSelectedExperiment(response, selectedOption);
        //this.props.keyHandler(keyPressed)

        

       
      }

      }
    }

    else if(this.state.paused == false && keyPressed === "84"){
      console.log("Trigger")
      this.props.keyHandler(keyPressed)
      
    }


    
  }



  handleAnswerSelectedExperiment(response, selectedOption) {

    console.log("handle Answer Selected Experiment")

    console.log(response)
    console.log(selectedOption)
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
    
    console.log("handle Response aftermath")
    console.log(response)
    console.log(selectedOption)
    console.log(this.props.trialcontents[0])

    if (this.props.blockType === "test" || this.props.blockType === "generalization"){
      //console.log("this is a test trial")

      this.timeoutID = setTimeout(() => this.passResponseAndProceed(response,selectedOption), 500);
    }

    else if (this.props.trialcontents[0].learningType === "reinforcement"){

      this.showFeedback(answerCorrect,selectedOption);
      //console.log("this is a reinforcement training trial")

      this.timeoutID = setTimeout(() => this.hideFeedbackAndProceed(response, selectedOption), 1500);

    }
    else{
      //console.log("this is a supervised training trial")
      this.timeoutID = setTimeout(() => this.passResponseAndProceed(response,selectedOption), 500);
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
        <ResponseOption optionID = {"option1"} feedback={this.state.feedback1} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal1} whichOption="option1" content={this.props.trialcontents[0].option1} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        <ResponseOption optionID = {"option2"} feedback={this.state.feedback2} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal2} whichOption="option2" content={this.props.trialcontents[0].option2} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
        <ResponseOption optionID = {"option3"} feedback={this.state.feedback3} blockType={this.props.blockType} trialTarget={this.props.trialTarget} learningType={this.props.trialcontents[0].learningType} teachingSignal={this.props.teachingSignal3} whichOption="option3" content={this.props.trialcontents[0].option3} response={this.props.response} handleAnswerSelectedExperiment={this.handleAnswerSelectedExperiment} />
      
      
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



