import React, { Component } from 'react';
import learningStudy from './api/learningStudy';
import ExperimentTrial from './components/ExperimentTrial';
import Result from './components/Result';
import Intro from './components/Intro';
import Instructions from './components/Instructions';
import DemographicsSurvey from './components/DemographicsSurvey';
import Blockstart from './components/Blockstart';
//import Instructions from './components/Instructions';




import './preloadImages.css';
import './App.css';
import './selectize.css';

class App extends Component {

  
  constructor(props) {
    super(props);
    
    this.state = {
      //parameters of experiment
      numImages: 58,
      counter: 0,
      trialnum: 0,
      trialcontents: [],
      blockType: '',
      block: 1,
      miniblock: 1,
      showcell: [],
      totalNumTrials: 200,
      numTrialsPerBlock: 16,
      totalNumBlocks: 16,
      numGeneralizationTrials: 20,
      currentTarget: '',

      //flags for controlling screen
      noconsent: true,
      nodemographics: true,
      instructionsNotComplete: true,
      experimentStarted: false,
      showBlockstartScreen: false,
      receivedResponse: false,
    
      //performance 
      lastTestBlockPerformance: 0.00,
      lastReinforcementBlockPerformance: 0.33,
      currentTestBlockPerformance: 0.00,
      currentReinforcementBlockPerformance: 0.33,
      cumulativeTestPerformance: 0.00,

      //data to be collected
      responses: [],
      responseTimes: [],
      currentReinforcementBlockResponsesCorrect: [],
      currentTestBlockResponsesCorrect: [],
      testResponsesCorrect: [],
      responsesCorrect: [],
      demographicsInfo: []
      
    };

    var timeoutID = null;

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleConsentResponse = this.handleConsentResponse.bind(this)
    this.handleDemographicsSurveyResponse = this.handleDemographicsSurveyResponse.bind(this)
    this.handleInstructionsScreen = this.handleInstructionsScreen.bind(this)
    this.handleBlockstartScreen = this.handleBlockstartScreen.bind(this)
  }

  componentWillMount() {
    //const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    var showcell = [0];
    var numShown = 0;
    while (numShown < 3){
      showcell = Array.from({length: 9}, () => Math.round(Math.random() * 1));
      numShown = showcell.reduce((a, b) => a + b, 0)
    }

    //set the first trial's target
    var curTarg = '';
    //const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    if (learningStudy[0].contents.option1type === "target") {
      curTarg = learningStudy[0].contents.option1;
    }
    else if (learningStudy[0].option2type === "target"){
      curTarg = learningStudy[0].contents.option2;
    }
    else{
      curTarg = learningStudy[0].contents.option3;
    }


    //get number of blocks
    //get number of trials per block

    this.setState({
      totalNumTrials: this.state.totalNumBlocks*this.state.numTrialsPerBlock + this.state.numGeneralizationTrials,
      currentTarget: curTarg,
      trialnum: learningStudy[0].trialnum,
      trialcontents: learningStudy[0].contents,
      block: learningStudy[0].block,
      blockType: learningStudy[0].blockType,
      miniblock: learningStudy[0].block,
      showcell: showcell
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  responseTimedOut(){
    console.log("timeout called")
      console.log("response timed out, go to next trial")

      var responseTime = Number(Date.now()) - Number(this.state.currentTrialStartTime)
      console.log("Response Time: " + responseTime )

      this.checkResponseAndUpdate("timeout",responseTime);
      
    

      if (this.state.trialnum < this.state.totalNumTrials) {
       setTimeout(() => this.setNextQuestion("timeout"), 0);
      } else {
        setTimeout(() => this.setResults(this.getResults()), 0);
      }


    }

    
  

  handleAnswerSelected(selected_id, selected_option) {
    clearTimeout(this.timeoutID);

    if (this.state.receivedResponse){
      console.log("Handle double-click")
    }
    else{  

      console.log("Handle answer selected in main app")
      
      var responseTime = Number(Date.now()) - Number(this.state.currentTrialStartTime)
      console.log("Response Time: " + responseTime )

      if (responseTime > 500){
        var response = selected_id
        var selectedOption = selected_option
        console.log("selected word: " + response)
        console.log("selected option number: " + selectedOption)

        this.checkResponseAndUpdate(response,responseTime);

        this.setState({
          receivedResponse: true
        });

        //Set Next Question
        if (this.state.trialnum < this.state.totalNumTrials) {
           setTimeout(() => this.setNextQuestion(response), 0);
        } else {
            setTimeout(() => this.setResults(this.getResults()), 0);
        }
      }
      else{
        console.log("Response Too Fast")
      }

  }
}

  checkResponseAndUpdate(response,responseTime){

    //test if response is correct
    var responseCorrect = this.state.currentTarget === response

    //get current response correct arrays
    var newTestResponsesCorrect = this.state.testResponsesCorrect
    var newCurrentTestBlockResponsesCorrect = this.state.currentTestBlockResponsesCorrect
    var newCurrentReinforcementBlockResponsesCorrect = this.state.currentReinforcementBlockResponsesCorrect

    //add the new response correct no matter what
    var newResponsesCorrect = this.state.responsesCorrect.concat(responseCorrect)

    //append current response outcome to the test response correct arrays
    if (this.state.blockType === 'test' && this.state.trialnum > 0 ){

      newTestResponsesCorrect = this.state.testResponsesCorrect.concat(responseCorrect)
      newCurrentTestBlockResponsesCorrect = this.state.currentTestBlockResponsesCorrect.concat(responseCorrect)
    }

    //append current response outcome to the reinforcement response correct arrays
    else if (this.state.trialcontents[0].learningType === 'reinforcement' && this.state.blockType === 'training' && this.state.trialnum > 0){
    
      newCurrentReinforcementBlockResponsesCorrect = this.state.currentReinforcementBlockResponsesCorrect.concat(responseCorrect)
    }

    //calculate current test performance
    //calculate current cumulative performance
    // if this is a real trial
    var currentTestBlockPerformance = newCurrentTestBlockResponsesCorrect.reduce((a, b) => a + b, 0) / newCurrentTestBlockResponsesCorrect.length
    var cumulativeTestPerformance = newTestResponsesCorrect.reduce((a, b) => a + b, 0) / newTestResponsesCorrect.length
    
    //calculate the current reinforcement block performance (not necessary)
    var currentReinforcementBlockPerformance = newCurrentReinforcementBlockResponsesCorrect.reduce((a, b) => a + b, 0) / newCurrentReinforcementBlockResponsesCorrect.length


    this.setState({
      //update response correct arrays
      currentReinforcementBlockResponsesCorrect: newCurrentReinforcementBlockResponsesCorrect,
      currentTestBlockResponsesCorrect: newCurrentTestBlockResponsesCorrect,
      testResponsesCorrect: newTestResponsesCorrect,
      responsesCorrect: newResponsesCorrect,
      //add response to responses array
      responses: this.state.responses.concat(response),
      //add response time to response time array
      responseTimes: this.state.responseTimes.concat(responseTime),
      //update performance metrics
      currentReinforcementBlockPerformance: currentReinforcementBlockPerformance,
      currentTestBlockPerformance: currentTestBlockPerformance,
      cumulativeTestPerformance: cumulativeTestPerformance
      
    });

  
  }

  handleConsentResponse(event) {
    //e.preventDefault()
    //consentCheckbox = true
    console.log("Consent Form Screen Complete")
    this.setState({
      noconsent: false
    })
  }

  handleDemographicsSurveyResponse(event,demographicsInfo) {
    //e.preventDefault()
    //consentCheckbox = true
    console.log("Demographics Survey Complete")
    console.log(demographicsInfo)
    this.setState({
      nodemographics: false,
      demographicsInfo: demographicsInfo
    })
  }

  handleInstructionsScreen(event) {
    //e.preventDefault()
    //consentCheckbox = true
    console.log("Instructions Screen Complete")
    this.setState({
      instructionsNotComplete: false,
      showBlockstartScreen: true
    })
  }

   handleBlockstartScreen(event) {
    //e.preventDefault()
    //consentCheckbox = true
    console.log("Blockstart Screen Complete")
    this.setState({
      showBlockstartScreen: false,
      experimentStarted: true,
      currentTrialStartTime: Date.now()
    })
    this.timeoutID = setTimeout(() => this.responseTimedOut(),8000);
  }


  updateResponses(response) {

     // var currentResponseArray = this.state.responses
     // var newResponseArray = currentResponseArray.push(response);

    this.setState({
        //answersCount: updatedAnswersCount,
        responses: this.state.responses.concat(response)
    });
    
  }

  setNextQuestion(response) {
    
    //increment trial counter
    const counter = this.state.counter + 1;

    //trial variables to be updated for next trial
    var showcell = [0];
    var numShown = 0;
    var curTarg = '';
    var blockstartBoolean = false;

    //get current block-level performance values
    var lastReinforcementBlockPerformance = this.state.lastReinforcementBlockPerformance;
    var lastTestBlockPerformance = this.state.lastTestBlockPerformance;

    //get current response correct arrays
    var currentTestBlockResponsesCorrect = this.state.currentTestBlockResponsesCorrect
    var currentReinforcementBlockResponsesCorrect = this.state.currentReinforcementBlockResponsesCorrect

    //determine how many plural objects to show (must be done at top level because of rerendering)
    while (numShown < 3){
      showcell = Array.from({length: 9}, () => Math.round(Math.random() * 1));
      numShown = showcell.reduce((a, b) => a + b, 0)
    }
    
    // if its the end of the entire block
    //  reset the testblock responses array
    //  flag the blockstart screen
    //  update last test block performance
    if (this.state.miniblock<learningStudy[counter].miniblock) {
      console.log("Begin New Miniblock")
      lastTestBlockPerformance = this.state.currentTestBlockPerformance
      currentTestBlockResponsesCorrect = []
      blockstartBoolean = true
    }

    // if it's the end of the training block
    //  reset the reinforcement responses array
    //  flag the blockstart screen
    //  update last reinforcement block performance
    if (this.state.blockType === "training" && learningStudy[counter].blockType === "test") {
      lastReinforcementBlockPerformance = this.state.currentReinforcementBlockPerformance;
      currentReinforcementBlockResponsesCorrect = [];
      blockstartBoolean = true;
    }

    // determine the name of the new current target
    if (learningStudy[counter].contents[0].option1type === "target") {
      curTarg = learningStudy[counter].contents[0].option1
    }
    else if (learningStudy[counter].contents[0].option2type === "target"){
      curTarg = learningStudy[counter].contents[0].option2
    }
    else{
      curTarg = learningStudy[counter].contents[0].option3
    }

    this.setState({
        //update all the data for the next trial
        counter: counter,
        currentTarget: curTarg,
        trialnum: learningStudy[counter].trialnum,
        trialcontents: learningStudy[counter].contents,
        block: learningStudy[counter].block,
        miniblock: learningStudy[counter].miniblock,
        blockType: learningStudy[counter].blockType,
        showcell: showcell,
        showBlockstartScreen: blockstartBoolean,

        // new empty arrays for the previous blocks
        currentTestBlockResponsesCorrect: currentTestBlockResponsesCorrect,
        currentReinforcementBlockResponsesCorrect: currentReinforcementBlockResponsesCorrect,

        //update block-level performance metrics
        lastReinforcementBlockPerformance: lastReinforcementBlockPerformance,
        lastTestBlockPerformance: lastTestBlockPerformance,

        //refresh response recieved flag
        receivedResponse: false
        
    });

    //if this isn't the first trial of the block, start the timeout counter
    if (!blockstartBoolean){
      this.setState({currentTrialStartTime: Date.now()});
      this.timeoutID = setTimeout(() => this.responseTimedOut(),8000);
      
    }
    console.log(this.state.responses)
    console.log(this.state.responseTimes)
  }

  getResults() {


    return "results"
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

//{this.state.result ? this.renderResult() : this.renderExperimentTrial()}
  renderExperimentTrial() {

    var teachingSignal1 = "no_signal";
    var teachingSignal2 = "no_signal";
    var teachingSignal3 = "no_signal";

    console.log("current target in app: " + this.state.currentTarget)

    if (this.state.trialcontents[0].learningType === "supervised" && this.state.blockType === "training"){
      
      var positiveTeachingSignal = this.state.lastReinforcementBlockPerformance > Math.random();
      console.log("positive signal position: " + positiveTeachingSignal)

      var targetLocation = 0;
      var nonTargetPositionArray = [1,2,3]

      if (this.state.trialcontents[0].option1type === "target"){
          targetLocation = 1;
          nonTargetPositionArray = [2,3];
      }
      else if (this.state.trialcontents[0].option2type === "target"){
          targetLocation = 2;
          nonTargetPositionArray = [1,3];
      }
      else if (this.state.trialcontents[0].option3type === "target"){
          targetLocation = 3;
          nonTargetPositionArray = [1,2];
      }
      console.log(this.state.trialcontents[0].option3Type)
      console.log(targetLocation)
      console.log(nonTargetPositionArray)

      if (positiveTeachingSignal){
        if (targetLocation === 1){
          teachingSignal1 = "smiley_img"
          teachingSignal2 = "nonSelectable"
          teachingSignal3 = "nonSelectable"
        }
        else if (targetLocation === 2){
          teachingSignal2 = "smiley_img"
          teachingSignal1 = "nonSelectable"
          teachingSignal3 = "nonSelectable"
        }
        else {
          teachingSignal3 = "smiley_img"
          teachingSignal1 = "nonSelectable"
          teachingSignal2 = "nonSelectable"
        }
      }
      else {
        
        var negativeSignalPosition = nonTargetPositionArray[Math.floor(Math.random() * nonTargetPositionArray.length)];
        console.log("negative signal position: " + negativeSignalPosition)
        if (negativeSignalPosition ===1){
          teachingSignal1 = "frown_img"
          teachingSignal2 = "nonSelectable"
          teachingSignal3 = "nonSelectable"
        }
        else if (negativeSignalPosition === 2){
          teachingSignal2 = "frown_img"
          teachingSignal1 = "nonSelectable"
          teachingSignal3 = "nonSelectable"
        }
        else {
          teachingSignal3 = "frown_img"
          teachingSignal2 = "nonSelectable"
          teachingSignal1 = "nonSelectable"
        }
      }
    

    }
   
    
    return (
      <ExperimentTrial
        //response={this.state.Curesponse}
        trialTarget={this.state.currentTarget}

        trialcontents={this.state.trialcontents}
        numTrialsPerBlock={this.state.totalNumTrials}
        trialnum={this.state.trialnum}
        block={this.state.miniblock}
        totalNumBlocks={this.state.totalNumBlocks}
        miniblock={this.state.miniblock}
        blockType={this.state.blockType}
        showcell={this.state.showcell}
        teachingSignal1={teachingSignal1}
        teachingSignal2={teachingSignal2}
        teachingSignal3={teachingSignal3}
        //questionTotal={this.state.numTrialsPerBlock}
        responseSelected={this.state.receivedResponse}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  renderIntro() {
    return (
      <Intro handleConsentResponse={this.state.noconsent,this.handleConsentResponse}/>
    );
  }

renderInstructions() {

    return (
      <Instructions handleInstructionsScreen={this.state.instructionsNotComplete,this.handleInstructionsScreen}/>
    );
  }


renderDemographicsSurvey() {

    return (
      <DemographicsSurvey handleDemographicsSurveyResponse={this.state.instructionsNotComplete,this.handleDemographicsSurveyResponse}/>
    );
  }

renderBlockstart() {
    console.log(this.state.lastTestBlockPerformance)
     console.log(this.state.lastReinforcementBlockPerformance)
     console.log(this.state.cumulativeTestPerformance)
    return (
      <Blockstart blockType={this.state.blockType} currentMiniblock={this.state.miniblock} blockType={this.state.blockType} blockstartMessage="Bon Travail!" cumulativeTestPerformanceMessage="Performance cumulative du test: " cumulativeTestPerformance={Number(this.state.cumulativeTestPerformance).toFixed(2)} lastTestBlockPerformanceMessage="Performance du dernier bloc de test: " lastTestBlockPerformance={Number(this.state.lastTestBlockPerformance).toFixed(2)} testBlockButtonLabel="Appuyez sur le bouton pour démarrer le bloc de test." trainingBlockButtonLabel="Appuyez sur le bouton pour démarrer le bloc d'apprentissage." firstPracticeBlockButtonLabel="Lorsque vous êtes prêt, appuyez sur le bouton pour démarrer l'entraînement." 
     handleBlockstartScreen={this.state.showBlockstartScreen,this.handleBlockstartScreen}/>
    );
  }


  render() {

    
    var arr = Array.from(Array(this.state.numImages).keys())
    var renderedOutput = arr.map(item => <div id={"image_" + item}> {item} </div>)
    
    

    return (
      <div className="App">

        <div className="expDebugText">
        App Debug: 
        <br/> lastreinforcementblockperformance: {Number(this.state.lastReinforcementBlockPerformance).toFixed(2)}
        <br/> currentreinforcementblockperformance: {Number(this.state.currentReinforcementBlockPerformance).toFixed(2)}
        <br/> lasttestblockperformance: {Number(this.state.lastTestBlockPerformance).toFixed(2)}
        <br/> currenttestblockperformance: {Number(this.state.currentTestBlockPerformance).toFixed(2)}
        <br/> cumulativeperf: {Number(this.state.cumulativeTestPerformance).toFixed(2)}
        <br/> numTestTrials: {this.state.testResponsesCorrect.length}
        
        </div>

        

        {this.state.noconsent ? this.renderIntro() : this.state.nodemographics ? this.renderDemographicsSurvey() : this.state.instructionsNotComplete ? this.renderInstructions() : this.state.showBlockstartScreen ? this.renderBlockstart(): this.state.experimentStarted ? this.renderExperimentTrial() : this.renderIntro() }
        


        <div id="preload">
          {renderedOutput}
        {/* etc... */}
        </div>
        

      </div>
    );
  }

}

export default App;
