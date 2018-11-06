import React, { Component } from 'react';
import ExperimentTrial from './components/ExperimentTrial';
import Result from './components/Result';
import Intro from './components/Intro';
import Instructions from './components/Instructions';
import DemographicsSurvey from './components/DemographicsSurvey';
import ExperimentEndSurvey from './components/ExperimentEndSurvey';
import ExperimentEndScreen from './components/ExperimentEndScreen';
import Blockstart from './components/Blockstart';
import { Button} from 'react-bootstrap';
import 'whatwg-fetch';
import queryString from 'query-string';

let experimentLists = {
    list_1_a:  require('./api/list_1_a.js'),
    list_2_a:  require('./api/list_2_a.js'),
    list_3_a:  require('./api/list_3_a.js'),
    list_4_a:  require('./api/list_4_a.js'),
    list_5_a:  require('./api/list_5_a.js'),
    list_6_a:  require('./api/list_6_a.js'),
    list_7_a:  require('./api/list_7_a.js'),
    list_8_a:  require('./api/list_8_a.js'),
    list_9_a:  require('./api/list_9_a.js'),
    list_10_a:  require('./api/list_10_a.js')

}
//import Instructions from './components/Instructions';

import './preloadImages.css';
import './App.css';
import './selectize.css';

class App extends Component {

  
  constructor(props) {
    super(props);
    
    this.state = {
      experimentContents: {},
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
      showParamErrorMessage: false,
      showExperimentEndSurvey: false,
      showExperimentEndScreen: false,
    
      //performance 
      lastTestBlockPerformance: 0.00,
      lastReinforcementBlockPerformance: 0.33,
      currentTestBlockPerformance: 0.00,
      currentReinforcementBlockPerformance: 0.33,
      cumulativeTestPerformance: 0.00,

      //data to be collected
      assignmentId: '0',
      participantID: '0',
      platformType: '',
      condition: '',
      conditionListID: '',
      experimentName: '',
      participantComments: '',
      responses: [],
      responseTimes: [],
      currentReinforcementBlockResponsesCorrect: [],
      currentTestBlockResponsesCorrect: [],
      testResponsesCorrect: [],
      responsesCorrect: [],
      demographicsInfo: [],

      showDebug: false
      
    };
    var learningStudy = [];
    var timeoutID = null;
    this.sendMechanicalTurkExternalSubmit = this.sendMechanicalTurkExternalSubmit.bind(this);
    this.sendMechanicalTurkSandboxExternalSubmit = this.sendMechanicalTurkSandboxExternalSubmit.bind(this);
    this.sendCompletionPutRequestToServer = this.sendCompletionPutRequestToServer.bind(this);
    this.sendUpdatePutRequestToServer = this.sendUpdatePutRequestToServer.bind(this);
    this.sendSessionStartPostRequestToServer= this.sendSessionStartPostRequestToServer.bind(this);
    this.jumpToEnd= this.jumpToEnd.bind(this);
    
    this.handleExperimentEndScreen = this.handleExperimentEndScreen.bind(this);
    this.handleExperimentEndSurvey = this.handleExperimentEndSurvey.bind(this);
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

    var urlParamStruct = this.getParams(window.location);
    console.log(urlParamStruct);
    console.log(urlParamStruct.participantID)

    //load the list
    //var listLocation = './api/' + urlParamStruct.experimentName + '/' + urlParamStruct.conditionListID + '/' + 'learningStudy1.js';
    
    //var listLocation = './api/learningStudy1.js';
    
    //learningStudy = require(listLocation);
    
    //var learningStudy = require('./api/learningStudy1.js');

    //eval(const learningStudy=require('${listLocation}')
    
    var learningStudy = experimentLists[urlParamStruct.conditionListID]['default']

    //console.log(learningStudy['default'])
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
  

    if (urlParamStruct.participantID == 0){
      this.setState({
        showParamErrorMessage: true
      })
    }
   else{

    this.setState({
      experimentContents: learningStudy,
      assignmentId: urlParamStruct.assignmentId,
      participantID: urlParamStruct.participantID,
      experimentName: urlParamStruct.experimentName,
      conditionListID: urlParamStruct.conditionListID,
      condition: urlParamStruct.condition,
      platformType: urlParamStruct.platformType,
      showDebug: urlParamStruct.debug,

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

  }

  getParams(location) {
   const searchParams = new URLSearchParams(location.search);
   
  if(searchParams.has("assignmentId") &&
    searchParams.has("participantID") && 
    searchParams.has("condition") &&
    searchParams.has("conditionListID") &&
    searchParams.has("expName") &&
    searchParams.has("platformType")){
    return {
    assignmentId: searchParams.get('assignmentId'),
    participantID: searchParams.get('participantID'),
    condition: searchParams.get('condition'),
    conditionListID: searchParams.get('conditionListID'),
    experimentName: searchParams.get('expName'),
    platformType: searchParams.get('platformType'),
    debug: searchParams.get('debug') || false
  };
  }
  else{
    return{assignmentId: 0,
      participantID: 0,
      condition: '',
    conditionListID: '',
    experimentName: '',
    platformType: '',
    debug: searchParams.get('debug') || false}
  }
  
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
      console.log("response timed out, go to next trial")

      var responseTime = Number(Date.now()) - Number(this.state.currentTrialStartTime)
  
      this.checkResponseAndUpdate("timeout",responseTime);

      if (this.state.trialnum < this.state.totalNumTrials) {
       setTimeout(() => this.setNextTrial(), 0);
      } else {
        setTimeout(() => this.endTrials(), 0);
      }


    }
  

  handleAnswerSelected(selected_id, selected_option) {
    clearTimeout(this.timeoutID);

    

      console.log("Handle answer selected in main app")
      
      var responseTime = Number(Date.now()) - Number(this.state.currentTrialStartTime)
      console.log("Response Time: " + responseTime )

      if (responseTime > 500){
        var response = selected_id
        var selectedOption = selected_option

        console.log("selected word: " + response)
        console.log("selected option number: " + selectedOption)

        this.checkResponseAndUpdate(response,responseTime);

        //this.setState({
        //  receivedResponse: true
        //});

        //Set Next Question
        if (this.state.trialnum < this.state.totalNumTrials) {
           setTimeout(() => this.setNextTrial(), 0);
        } else {
            setTimeout(() => this.endTrials(), 0);
        }
      }
      else{
        console.log("Response Too Fast")
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

    console.log("Consent Form Screen Complete")
    this.setState({
      noconsent: false
    })
  }


handleExperimentEndScreen(event) {

    console.log("Experiment Ended, submit final results")

    this.sendCompletionPutRequestToServer("from debug")

    //if(this.state.platformType === "mturk_sandbox"){
    //  console.log("mechanicalTurk, so submit")
    //  this.sendMechanicalTurkSandboxExternalSubmit()
    //}
    //else if(this.state.platformType === "mturk"){
    //  console.log("mechanicalTurk, so submit")
    //  this.sendMechanicalTurkExternalSubmit()
    //}
    //redirect if it's mechanical turk

  }


   handleExperimentEndSurvey(event,comments) {

    console.log("Experiment End Survey Complete")

    this.renderExperimentEndScreen()
    this.sendCompletionPutRequestToServer(comments)
    this.setState({
      //participantComments: comments,
      showExperimentEndSurvey: false,
      showExperimentEndScreen: true
    })
  }

  handleDemographicsSurveyResponse(event,demographicsInfo) {

    console.log("Demographics Survey Complete")

    this.setState({
      nodemographics: false,
      demographicsInfo: demographicsInfo
    })
  }

  handleInstructionsScreen(event) {

    console.log("Instructions Screen Complete")

    this.sendSessionStartPostRequestToServer()

    this.setState({
      instructionsNotComplete: false,
      showBlockstartScreen: true
    })
  }

  handleBlockstartScreen(event) {
    console.log("Blockstart Screen Complete")

    this.setState({
      showBlockstartScreen: false,
      experimentStarted: true,
      currentTrialStartTime: Date.now()
    })
    this.timeoutID = setTimeout(() => this.responseTimedOut(),8000);
  }


  updateResponses(response) {

    this.setState({
        //answersCount: updatedAnswersCount,
        responses: this.state.responses.concat(response)
    });
    
  }

  endTrials() {

    this.setState({
        //answersCount: updatedAnswersCount,
        showExperimentEndSurvey: true,
    });
    
  }


  setNextTrial() {
    
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
    if (this.state.miniblock<this.state.experimentContents[counter].miniblock) {
      console.log("Begin New Miniblock")
      lastTestBlockPerformance = this.state.currentTestBlockPerformance
      currentTestBlockResponsesCorrect = []
      blockstartBoolean = true

      this.sendUpdatePutRequestToServer()
    }

    // if it's the end of the training block
    //  reset the reinforcement responses array
    //  flag the blockstart screen
    //  update last reinforcement block performance
    if (this.state.blockType === "training" && this.state.experimentContents[counter].blockType === "test") {
      lastReinforcementBlockPerformance = this.state.currentReinforcementBlockPerformance;
      currentReinforcementBlockResponsesCorrect = [];
      blockstartBoolean = true;
    }

    if (this.state.blockType === "test" && this.state.experimentContents[counter].blockType === "generalization") {
      lastReinforcementBlockPerformance = this.state.currentReinforcementBlockPerformance;
      currentReinforcementBlockResponsesCorrect = [];
      blockstartBoolean = true;
    }

    // determine the name of the new current target
    if (this.state.experimentContents[counter].contents[0].option1type === "target") {
      curTarg = this.state.experimentContents[counter].contents[0].option1
    }
    else if (this.state.experimentContents[counter].contents[0].option2type === "target"){
      curTarg = this.state.experimentContents[counter].contents[0].option2
    }
    else{
      curTarg = this.state.experimentContents[counter].contents[0].option3
    }

    this.setState({
        //update all the data for the next trial
        counter: counter,
        currentTarget: curTarg,
        trialnum: this.state.experimentContents[counter].trialnum,
        trialcontents: this.state.experimentContents[counter].contents,
        block: this.state.experimentContents[counter].block,
        miniblock: this.state.experimentContents[counter].miniblock,
        blockType: this.state.experimentContents[counter].blockType,
        showcell: showcell,
        showBlockstartScreen: blockstartBoolean,

        // new empty arrays for the previous blocks
        currentTestBlockResponsesCorrect: currentTestBlockResponsesCorrect,
        currentReinforcementBlockResponsesCorrect: currentReinforcementBlockResponsesCorrect,

        //update block-level performance metrics
        lastReinforcementBlockPerformance: lastReinforcementBlockPerformance,
        lastTestBlockPerformance: lastTestBlockPerformance,

        //refresh response recieved flag
        //receivedResponse: false
        
    });

    //if this isn't the first trial of the block, start the timeout counter
    if (!blockstartBoolean){
      this.setState({currentTrialStartTime: Date.now()});
      this.timeoutID = setTimeout(() => this.responseTimedOut(),8000);
      
    }
 
  }




  renderExperimentTrial() {

    var teachingSignal1 = "no_signal";
    var teachingSignal2 = "no_signal";
    var teachingSignal3 = "no_signal";


    if (this.state.trialcontents[0].learningType === "supervised" && this.state.blockType === "training"){
      var testRoll = Math.random();
      var positiveTeachingSignal = this.state.lastReinforcementBlockPerformance > testRoll;
      console.log(testRoll)
      console.log(this.state.lastReinforcementBlockPerformance)
      console.log("Positive Teaching Signal? " + positiveTeachingSignal.toString())

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

  renderExperimentEndSurvey() {
    return (
      <ExperimentEndSurvey handleExperimentEndSurvey = {this.handleExperimentEndSurvey} />
    );
  }

  renderExperimentEndScreen() {

    //this.sendCompletionPutRequestToServer()

    // if this is a mechanical turk experiment, you'll send the post request in the next screen
    var assignmentId = this.state.assignmentId.toString()

    var participantID = this.state.participantID.toString()
    var responses = this.state.responses.toString()
    var responseTimes = this.state.responseTimes.toString()
    var currentBlock = this.state.miniblock.toString()
    var responsesCorrect = this.state.responsesCorrect.toString()
    var demographicsInfo = this.state.demographicsInfo.toString()
    var experimentName = this.state.experimentName.toString()
    var participantComments = this.state.participantComments.toString()


    return (
      <ExperimentEndScreen platformType = {this.state.platformType}
      assignmentId = {assignmentId} 
      participantID = {participantID} 
      responses = {responses} 
      responseTimes = {responseTimes}
      responsesCorrect = {responsesCorrect}
      demographicsInfo = {demographicsInfo}
      participantComments = {participantComments}
      handleExperimentEndScreen = {this.handleExperimentEndScreen} />
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

    return (
      <Blockstart blockType={this.state.blockType} currentMiniblock={this.state.miniblock} blockType={this.state.blockType} blockstartMessage="Bon Travail!" cumulativeTestPerformanceMessage="Performance cumulative du test: " cumulativeTestPerformance={Number(this.state.cumulativeTestPerformance).toFixed(2)} lastTestBlockPerformanceMessage="Performance du dernier bloc de test: " lastTestBlockPerformance={Number(this.state.lastTestBlockPerformance).toFixed(2)} testBlockButtonLabel="Appuyez sur le bouton pour démarrer le bloc de test." trainingBlockButtonLabel="Appuyez sur le bouton pour démarrer le bloc d'apprentissage." firstPracticeBlockButtonLabel="Lorsque vous êtes prêt, appuyez sur le bouton pour démarrer l'entraînement." 
     handleBlockstartScreen={this.state.showBlockstartScreen,this.handleBlockstartScreen}/>
    );
  }

  jumpToEnd() {
    console.log("Jump to End of Experiment")
    console.log(this.state.counter)
    console.log(Number(this.state.totalNumTrials)+4)
    this.setState({
        //update counter
        counter: Number(this.state.totalNumTrials)+4,
    });
  }


  sendSessionStartPostRequestToServer() {
    console.log("Send POST request to set up a session")

    var participantID = this.state.participantID.toString()
    var responses = this.state.responses.toString()
    var responseTimes = this.state.responseTimes.toString()
    var currentBlock = this.state.miniblock.toString()
    var responsesCorrect = this.state.responsesCorrect.toString()
    var demographicsInfo = this.state.demographicsInfo.toString()
    

    var currentCondition = this.state.condition.toString()
    var currentConditionListID = this.state.conditionListID.toString()
    var currentExperimentName = this.state.experimentName.toString()
    var currentPlatformType = this.state.platformType.toString()

    var bodyContents = {experimentName: currentExperimentName, condition: currentCondition, conditionListID: currentConditionListID, platformType: currentPlatformType, demographicsInfo: demographicsInfo, participantID: participantID}
    console.log(queryString.stringify(bodyContents))

    fetch('https://onlinelab.fr:3000/start_new_participant_session',{mode:"cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: queryString.stringify(bodyContents)})
      .then(resp => console.log(resp.json()));
      // .then(resp => {
      //   const currentTime = resp.dateString;
      //   this.setState({currentTime})
      // })

  }


  sendUpdatePutRequestToServer() {
    console.log("Send PUT request to update the session")
    
    console.log(this.state.responses)
    console.log(this.state.responseTimes)

    var participantID = this.state.participantID.toString()
    var responses = this.state.responses.toString()
    var responseTimes = this.state.responseTimes.toString()
    var currentBlock = this.state.miniblock.toString()
    var responsesCorrect = this.state.responsesCorrect.toString()
    var demographicsInfo = this.state.demographicsInfo.toString()
    var experimentName = this.state.experimentName.toString()

    var bodyContents = {experimentName: experimentName, participantID: participantID,responsesCorrect: responsesCorrect, responses: responses, responseTimes: responseTimes}
    console.log(queryString.stringify(bodyContents))

    fetch('https://onlinelab.fr:3000/update_participant_session',{mode:"cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: queryString.stringify(bodyContents)})
      .then(resp => console.log(resp.json()));
      // .then(resp => {
      //   const currentTime = resp.dateString;
      //   this.setState({currentTime})
      // })

  }


  sendCompletionPutRequestToServer(comments) {
    console.log("Send PUT request to complete the session")

    var participantID = this.state.participantID.toString()
    var responses = this.state.responses.toString()
    var responseTimes = this.state.responseTimes.toString()
    var currentBlock = this.state.miniblock.toString()
    var responsesCorrect = this.state.responsesCorrect.toString()
    var demographicsInfo = this.state.demographicsInfo.toString()
    var experimentName = this.state.experimentName.toString()
    var participantComments = comments


    var bodyContents = {experimentName: experimentName, participantID: participantID,responsesCorrect: responsesCorrect, responses: responses, responseTimes: responseTimes, participantComments: participantComments}
    console.log(queryString.stringify(bodyContents))

    fetch('https://onlinelab.fr:3000/complete_participant_session',{mode:"cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: queryString.stringify(bodyContents)})
      .then(resp => console.log(resp.json()));
      // .then(resp => {
      //   const currentTime = resp.dateString;
      //   this.setState({currentTime})
      // })

  }

  sendMechanicalTurkExternalSubmit() {
    console.log("Send POST to mturk")
    var assignmentId = this.state.assignmentId.toString()
    var participantID = this.state.participantID.toString()
    var responses = this.state.responses.toString()
    var responseTimes = this.state.responseTimes.toString()
    var currentBlock = this.state.miniblock.toString()
    var responsesCorrect = this.state.responsesCorrect.toString()
    var demographicsInfo = this.state.demographicsInfo.toString()
    var experimentName = this.state.experimentName.toString()
    var participantComments = this.state.participantComments.toString()


    var bodyContents = {assignmentId: assignmentId,participantID: participantID,responsesCorrect: responsesCorrect, responses: responses, responseTimes: responseTimes, participantComments: participantComments}
    console.log(queryString.stringify(bodyContents))

    var url = new URL("https://mturk.com/mturk/externalSubmit");
    
    Object.keys(bodyContents).forEach(key => url.searchParams.append(key, bodyContents[key]))

    fetch(url,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST"
    })
      .then(resp => console.log(resp.json()));
      // .then(resp => {
      //   const currentTime = resp.dateString;
      //   this.setState({currentTime})
      // })

  }

  sendMechanicalTurkSandboxExternalSubmit() {
    console.log("Send POST to mturk")
    var assignmentId = this.state.assignmentId.toString()
    var participantID = this.state.participantID.toString()
    var responses = this.state.responses.toString()
    var responseTimes = this.state.responseTimes.toString()
    var currentBlock = this.state.miniblock.toString()
    var responsesCorrect = this.state.responsesCorrect.toString()
    var demographicsInfo = this.state.demographicsInfo.toString()
    var experimentName = this.state.experimentName.toString()
    var participantComments = this.state.participantComments.toString()


    var bodyContents = {assignmentId: assignmentId, participantID: participantID,responsesCorrect: responsesCorrect, responses: responses, responseTimes: responseTimes, participantComments: participantComments}
    console.log(queryString.stringify(bodyContents))

    var url = new URL("https://workersandbox.mturk.com/mturk/externalSubmit");
    
    Object.keys(bodyContents).forEach(key => url.searchParams.append(key, bodyContents[key]))

    fetch(url,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST"
    })
      .then(resp => console.log(resp.json()));
      // .then(resp => {
      //   const currentTime = resp.dateString;
      //   this.setState({currentTime})
      // })

  }


  render() {

    
    var arr = Array.from(Array(this.state.numImages).keys())
    var renderedOutput = arr.map(item => <div id={"image_" + item}> {item} </div>)
    
    

    return (
      <div className="App">
        {this.state.showDebug == 'true' ? 
        <div className="expDebugText">
        App Debug: 
        
        <br/> lastreinforcementblockperformance: {Number(this.state.lastReinforcementBlockPerformance).toFixed(2)}
        <br/> currentreinforcementblockperformance: {Number(this.state.currentReinforcementBlockPerformance).toFixed(2)}
        <br/> lasttestblockperformance: {Number(this.state.lastTestBlockPerformance).toFixed(2)}
        <br/> currenttestblockperformance: {Number(this.state.currentTestBlockPerformance).toFixed(2)}
        <br/> cumulativeperf: {Number(this.state.cumulativeTestPerformance).toFixed(2)}
        <br/> numTestTrials: {this.state.testResponsesCorrect.length}
         <br/><Button onClick={this.sendUpdatePutRequestToServer}>
      Debug Send PUT
      </Button>

      <br/><Button onClick={this.sendSessionStartPostRequestToServer}>
      Debug Send Session Start
      </Button>

      <br/><Button onClick={this.jumpToEnd}>
      Jump to End
      </Button>

      <br/><Button onClick={this.sendCompletionPutRequestToServer}>
      Send completion request
      </Button>

      <br/>{this.state.responses.slice(this.state.responses.length-5,this.state.responses.length-1)}
      <br/>{this.state.responseTimes.slice(this.state.responses.length-5,this.state.responses.length-1)}
        
        </div>

        : ''}

        {this.state.showParamErrorMessage ? <div className="participantIDError">Error accessing participantID. You must access this page with a valid participant ID.</div> : 
        this.state.showExperimentEndScreen ? this.renderExperimentEndScreen() :
        this.state.showExperimentEndSurvey ? this.renderExperimentEndSurvey() :
        this.state.noconsent ? this.renderIntro() : 
 this.state.nodemographics ? this.renderDemographicsSurvey() : 
 this.state.instructionsNotComplete ? this.renderInstructions() : 
 this.state.showBlockstartScreen ? this.renderBlockstart(): 
 this.state.experimentStarted ? this.renderExperimentTrial() : 
 this.renderIntro() }
        
        
        <div id="preload">
          {renderedOutput}
        {/* etc... */}
        </div>
        
        

      </div>
    );
  }

}

export default App;
