import React, { Component } from 'react';
import ExperimentTrial from './components/ExperimentTrial';
import Result from './components/Result';
import Intro from './components/Intro';
import Instructions from './components/Instructions';
import DemographicsSurvey from './components/DemographicsSurvey';
import ExperimentEndSurvey from './components/ExperimentEndSurvey';
import ExperimentEndScreen from './components/ExperimentEndScreen';
import Blockstart from './components/Blockstart';
import MiniBlockstart from './components/MiniBlockstart';
import TestBlockstart from './components/TestBlockstart';
import FixationScreen from './components/FixationScreen';
import TriggerWaitScreen from './components/TriggerWaitScreen';
import { Button} from 'react-bootstrap';
import 'whatwg-fetch';
import queryString from 'query-string';

import KeyHandler, { KEYPRESS } from 'react-key-handler';


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
    list_10_a:  require('./api/list_10_a.js'),
    list_11_a:  require('./api/list_11_a.js'),
    list_12_a:  require('./api/list_12_a.js'),
    list_13_a:  require('./api/list_13_a.js'),
    list_14_a:  require('./api/list_14_a.js'),
    list_15_a:  require('./api/list_15_a.js'),
    list_16_a:  require('./api/list_16_a.js'),
    list_17_a:  require('./api/list_17_a.js'),
    list_18_a:  require('./api/list_18_a.js'),
    list_19_a:  require('./api/list_19_a.js'),
    list_20_a:  require('./api/list_20_a.js'),
    list_21_a:  require('./api/list_21_a.js'),
    list_22_a:  require('./api/list_22_a.js'),
    list_23_a:  require('./api/list_23_a.js'),
    list_24_a:  require('./api/list_24_a.js'),
    list_1_b:  require('./api/list_1_b.js'),
    list_2_b:  require('./api/list_2_b.js'),
    list_3_b:  require('./api/list_3_b.js'),
    list_4_b:  require('./api/list_4_b.js'),
    list_5_b:  require('./api/list_5_b.js'),
    list_6_b:  require('./api/list_6_b.js'),
    list_7_b:  require('./api/list_7_b.js'),
    list_8_b:  require('./api/list_8_b.js'),
    list_9_b:  require('./api/list_9_b.js'),
    list_10_b:  require('./api/list_10_b.js'),
    list_11_b:  require('./api/list_11_b.js'),
    list_12_b:  require('./api/list_12_b.js'),
    list_13_b:  require('./api/list_13_b.js'),
    list_14_b:  require('./api/list_14_b.js'),
    list_15_b:  require('./api/list_15_b.js'),
    list_16_b:  require('./api/list_16_b.js'),
    list_17_b:  require('./api/list_17_b.js'),
    list_18_b:  require('./api/list_18_b.js'),
    list_19_b:  require('./api/list_19_b.js'),
    list_20_b:  require('./api/list_20_b.js'),
    list_21_b:  require('./api/list_21_b.js'),
    list_22_b:  require('./api/list_22_b.js'),
    list_23_b:  require('./api/list_23_b.js'),
    list_24_b:  require('./api/list_24_b.js')

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
      paused: false,
      noconsent: true,
      nodemographics: true,
      instructionsNotComplete: true,
      experimentStarted: false,
      showBlockstartScreen: false,
      showMiniBlockstartScreen: false,
      showTestBlockstartScreen: false,
      showTriggerWaitScreen: false,
      showFixationScreen: false,
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
      triggerEvents: [],
      escapeEvents: [],
      trialStartTimes: [],

      showDebug: false,
      fmriMode: false
      
    };
    var learningStudy = [];
    var timeoutID = null;
    this.sendMechanicalTurkExternalSubmit = this.sendMechanicalTurkExternalSubmit.bind(this);
    this.sendMechanicalTurkSandboxExternalSubmit = this.sendMechanicalTurkSandboxExternalSubmit.bind(this);
    this.sendCompletionPutRequestToServer = this.sendCompletionPutRequestToServer.bind(this);
    this.sendUpdatePutRequestToServer = this.sendUpdatePutRequestToServer.bind(this);
    this.sendSessionStartPostRequestToServer= this.sendSessionStartPostRequestToServer.bind(this);
    this.jumpToEnd= this.jumpToEnd.bind(this);
    
    this.myKeyHandler = this.myKeyHandler.bind(this);
    this.keyHandlerAppLevel = this.keyHandlerAppLevel.bind(this);

    

    this.handleEsc = this.handleEsc.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
   //this.restartThisMiniblock =  this.restartThisMiniblock.bind(this);

    this.handleExperimentEndScreen = this.handleExperimentEndScreen.bind(this);
    this.handleExperimentEndSurvey = this.handleExperimentEndSurvey.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleConsentResponse = this.handleConsentResponse.bind(this)
    this.handleDemographicsSurveyResponse = this.handleDemographicsSurveyResponse.bind(this)
    this.handleInstructionsScreen = this.handleInstructionsScreen.bind(this)
    this.handleBlockstartScreen = this.handleBlockstartScreen.bind(this)
    this.handleTriggerWaitScreen = this.handleTriggerWaitScreen.bind(this)
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
    if (learningStudy[0].contents[0].option1type === "target") {
      curTarg = learningStudy[0].contents[0].option1;
    }
    else if (learningStudy[0].option2type === "target"){
      curTarg = learningStudy[0].contents[0].option2;
    }
    else{
      curTarg = learningStudy[0].contents[0].option3;
    }
    console.log(learningStudy[0].trialnum)
    console.log(learningStudy[0].contents[0].option2)
    console.log("current target: " + curTarg)
    //get number of blocks
    //get number of trials per block
  
    var emptytrialcontents = [{grammarType: "size", image: "",learningType: "supervised",
option1: " ",
option1type: "",
option2: " ",
option2type: "",
option3: " ",
option3type: "",
rootWord: ""}];

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
      fmriMode: urlParamStruct.fmriMode,

      totalNumTrials: this.state.totalNumBlocks*this.state.numTrialsPerBlock + this.state.numGeneralizationTrials,
      currentTarget: curTarg,
      trialnum: learningStudy[0].trialnum,
      trialcontents: learningStudy[0].contents,
      emptytrialcontents: emptytrialcontents,
      block: learningStudy[0].block,
      blockType: learningStudy[0].blockType,
      miniblock: learningStudy[0].block,
      showcell: showcell
    });
  }

  }

  //KEY HANDLING

  componentDidMount(){
    //document.addEventListener("keydown", this.keyHandlerApp);
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


handleEsc(event){
  console.log("Esc Pressed")

  this.restartThisBlock()

  //if experiment started, return to beginning of miniblock
}

handleTrigger(event){

  console.log("trigger event")


  if (this.state.showTriggerWaitScreen ){

        this.handleTriggerWaitScreen(null)
        

        this.setState({
         triggerEvents: this.state.triggerEvents.concat(Date.now())
        });
  }

  
  
  

  

}


  myKeyHandler(event){

    console.log("app key handler")
    console.log(keyPressed)

    var keyPressed = event.key;

    //if (keyPressed === "b" || keyPressed === "y" || keyPressed === "g" ){

    if (keyPressed === "w"){

      if (this.state.showBlockstartScreen ){

        this.handleBlockstartScreen(null)
        
      }

    }

  }


  keyHandlerAppLevel(keyPressed){

    if(this.state.paused === false && keyPressed === "p"){
      console.log("Pause")
      clearTimeout("TimeoutID: " + this.timeoutID);
      this.setState({
         paused: true
        })
    }
    else if(this.state.paused == true && keyPressed === "r"){
      console.log("Resume")

      clearTimeout(this.timeoutID);

      this.setState({
         paused: false
        })
      this.restartThisBlock()

      //if (this.state.trialnum < this.state.totalNumTrials) {
      //   this.setNextTrial()
     //   } else {
       //  this.endTrials();
      //  }
      
    }
    else if (this.state.paused === true && keyPressed === "1"){

      this.goToBlock(1)
    }
    else if (this.state.paused === true && keyPressed === "2"){

      this.goToBlock(2)
    }
    else if (this.state.paused === true && keyPressed === "3"){

      this.goToBlock(3)
    }
    else if (this.state.paused === true && keyPressed === "4"){

      this.goToBlock(4)
    }
    else if (this.state.paused === true && keyPressed === "5"){

      this.goToBlock(5)
    }

    
  };



  responseTimedOut(){
      console.log("response timed out, go to next trial")
      console.log(Date.now())
      console.log(Date.now() - this.state.currentTrialStartTime)
      clearTimeout(this.timeoutID)
      console.log("TimeoutID: " + this.timeoutID)

      if (this.state.paused === true){
        console.log("experiment is paused, restart trial")

        
      }
      else {
        var responseTime = Number(Date.now()) - Number(this.state.currentTrialStartTime)
  
        this.checkResponseAndUpdate("timeout",responseTime);

       if (this.state.trialnum < this.state.totalNumTrials) {
         this.setNextTrial();
        } else {
         this.endTrials();
        }

      }


    }
  

  handleAnswerSelected(response, selectedOption, selectionTime) {

      clearTimeout(this.timeoutID);
      
      console.log("Handle answer selected in main app: "+ String(response) + " " + String(selectedOption) + " at " + selectionTime) 
      console.log("Time of call: " + Date.now() + "  lag = " + String(Date.now() - Number(selectionTime)))
      console.log("TimeoutID: " + this.timeoutID)

      var responseTime = Number(selectionTime) - Number(this.state.currentTrialStartTime)
      //console.log("Response Time: " + responseTime )

      console.log("response time: " + String(responseTime))

     

        this.checkResponseAndUpdate(response,responseTime);

        //this.setState({
        //  receivedResponse: true
        //});

        //Set Next Question
        if (this.state.trialnum < this.state.totalNumTrials) {
           this.setNextTrial();
        } else {
          this.endTrials();
        }

        this.setState({
      teachingSignal1: "nonSelectable",
      teachingSignal2: "nonSelectable",
      teachingSignal3: "nonSelectable",
      });


      //}
      //else{
      //  console.log("Response Too Fast")
      //}

      

  
}

  checkResponseAndUpdate(response,responseTime){
    console.log("check response and update")
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

      console.log("update new test responses")

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

      trialStartTimes: this.state.trialStartTimes.concat(this.state.currentTrialStartTime),

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

    //this.arrangeExperimentTrial(this.state.counter);

    //if(this.state.block > 0){


    this.setState({
      showBlockstartScreen: false,
      showTriggerWaitScreen: true
    })

    //}

    //else{

    //this.setState({
    //  showBlockstartScreen: false,
    //  showTrigger
    //  currentTrialStartTime: Date.now()
    //})

    //if (this.state.paused === false){
    //  this.timeoutID = setTimeout(() => this.responseTimedOut(),10000);
    //}



  //}

    
  }

  handleTestBlockstartScreen(event) {
    console.log("Test Blockstart Screen Complete")
    //this.arrangeExperimentTrial(this.state.counter);

    this.setState({
      showTestBlockstartScreen: false,
      //experimentStarted: true,
      //currentTrialStartTime: Date.now()
    })

    this.setFixationScreen();
    
  }

  handleMiniBlockstartScreen(event) {
    console.log("Blockstart Screen Complete")
    //this.arrangeExperimentTrial(this.state.counter);

    this.setState({
      showMiniBlockstartScreen: false,
      //experimentStarted: true,
      //currentTrialStartTime: Date.now()
    })

    this.setFixationScreen();

    
  }

  handleTriggerWaitScreen(event) {
    console.log("Trigger Wait Screen Complete")
    //this.arrangeExperimentTrial(this.state.counter);
    //console.log(Date.now())

    this.setState({
      showTriggerWaitScreen: false,
     // experimentStarted: true,
     // currentTrialStartTime: Date.now()
    })

    //do a fixation
    this.setFixationScreen();

    //if (this.state.paused === false){
    //  this.timeoutID = setTimeout(() => this.responseTimedOut(),10000);
    //}
  }



  handleFixationScreen(event){
    console.log("handle fixation screen called")
    this.arrangeExperimentTrial(this.state.counter)
    var startTime = Date.now();

    this.setState({
      showFixationScreen: false,
      experimentStarted: true,
      currentTrialStartTime: startTime

    })
    console.log("Trial start time: " + startTime)

    //if (this.state.paused === false){
    //  this.timeoutID = setTimeout(() => this.responseTimedOut(),10000);
    //}
    //console.log(this.timeoutID)

  }


  

  endTrials() {

    this.setState({
        //answersCount: updatedAnswersCount,
        showExperimentEndSurvey: true,
    });
    
  }

  restartThisBlock() {


    if (this.state.showBlockstartScreen === false && this.state.block >= 1){

      clearTimeout(this.timeoutID);

      //console.log(this.state.counter-6)

      var counterDistanceFromStart = (this.state.counter-6) % 64

      //console.log(counterDistanceFromStart)

      //console.log(this.state.counter - counterDistanceFromStart)
    


      this.setState({
        counter: (this.state.counter - counterDistanceFromStart+1),
        escapeEvents: this.state.escapeEvents.concat(Date.now()),
        showTriggerWaitScreen: true
      })

      //console.log(this.state.escapeEvents)

      //this.setNextTrial()

    }
  }


    goToBlock(blockNum) {


     clearTimeout(this.timeoutID);
    
      var newCounter = (blockNum-1)*64 + 7

      this.setState({
        counter: newCounter,
        escapeEvents: this.state.escapeEvents.concat(Date.now()),
        showTriggerWaitScreen: true
      })

      //console.log(this.state.escapeEvents)

     // this.setNextTrial()

    }

    //if this isn't the first trial of the block, start the timeout counter


    //if (!blockstartBoolean){
      
    //  if (this.state.paused === false){

    //    this.setState({

     //     currentTrialStartTime: Date.now()


     //   });

    //    this.timeoutID = setTimeout(() => this.responseTimedOut(),10000);
     // }
      
 //   }
 
  


  setupTrialAfterRestart(){

    //trial variables to be updated for next trial
    var showcell = [0];
    var numShown = 0;
    var curTarg = '';
    var counter = this.state.counter
    //determine how many plural objects to show (must be done at top level because of rerendering)
    while (numShown < 3){
      showcell = Array.from({length: 9}, () => Math.round(Math.random() * 1));
      numShown = showcell.reduce((a, b) => a + b, 0)
    }
    
    var currentTestBlockResponsesCorrect = []
    var blockstartBoolean = true

    this.sendUpdatePutRequestToServer()
    
    var lastReinforcementBlockPerformance = this.state.currentReinforcementBlockPerformance;
    var currentReinforcementBlockResponsesCorrect = [];
    
    

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

    this.arrangeExperimentTrial(counter);

    this.setState({
        //update all the data for the next trial
      
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
        
        //refresh response recieved flag
        //receivedResponse: false
        
    });



  }

  setFixationScreen(){

    var duration = 500 + Math.round(Math.random() * 500)

    console.log("Fixation Screen Duration: " + duration)

    this.setState({
      showFixationScreen: true
    });

    setTimeout(() => this.handleFixationScreen(), duration);

  }

  setNextTrial() {

    console.log(this.state.currentTestBlockPerformance)
    console.log(this.state.cumulativeTestPerformance)

    console.log("set next trial called: " + Date.now())
    
    //increment trial counter
    const counter = this.state.counter + 1;

    //trial variables to be updated for next trial
    var showcell = [0];
    var numShown = 0;
    var curTarg = '';
    var blockstartBoolean = false;
    var testBlockstartBoolean = false;
    var miniBlockstartBoolean = false;

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

    if (this.state.block < this.state.experimentContents[counter].block){

      console.log("Begin New Block")
      lastTestBlockPerformance = this.state.currentTestBlockPerformance
      currentTestBlockResponsesCorrect = []
      blockstartBoolean = true
      this.sendUpdatePutRequestToServer()
    }
    else if (this.state.blockType === "test" && this.state.experimentContents[counter].blockType === "training") {
      console.log("Begin New Miniblock")
      lastTestBlockPerformance = this.state.currentTestBlockPerformance
      currentTestBlockResponsesCorrect = []
      miniBlockstartBoolean = true

      this.sendUpdatePutRequestToServer()
    }

    // if it's the end of the training block
    //  reset the reinforcement responses array
    //  flag the blockstart screen
    //  update last reinforcement block performance

    if (this.state.blockType === "training" && this.state.experimentContents[counter].blockType === "test") {
      console.log("Test Block Start")
      if (this.state.block > 0){
        lastReinforcementBlockPerformance = this.state.currentReinforcementBlockPerformance;
        currentReinforcementBlockResponsesCorrect = [];
      }
      testBlockstartBoolean = true;
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

    console.log("current target " + curTarg)
    this.arrangeExperimentTrial(counter);
    
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
        showTestBlockstartScreen: testBlockstartBoolean,
        showMiniBlockstartScreen: miniBlockstartBoolean,
        //showFixationScreen: false,

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
    if (!blockstartBoolean && !miniBlockstartBoolean && !testBlockstartBoolean){
      
      if (this.state.paused === false){

        this.setFixationScreen()

        //this.setState({currentTrialStartTime: Date.now()});
        //this.timeoutID = setTimeout(() => this.responseTimedOut(),10000);
      }
      
    }
 
  }

  arrangeExperimentTrial(counter) {

    var teachingSignal1 = "no_signal";
    var teachingSignal2 = "no_signal";
    var teachingSignal3 = "no_signal";

    
    if (this.state.experimentContents[counter].contents[0].learningType === "supervised" && this.state.experimentContents[counter].blockType === "training"){
      var testRoll = Math.random();
      var positiveTeachingSignal = Number(this.state.lastReinforcementBlockPerformance) > testRoll;
      console.log(this.state.lastReinforcementBlockPerformance)
      console.log(testRoll)
      var targetLocation = 0;
      var nonTargetPositionArray = [1,2,3]

      if (this.state.experimentContents[counter].contents[0].option1type === "target"){
          targetLocation = 1;
          nonTargetPositionArray = [2,3];
      }
      else if (this.state.experimentContents[counter].contents[0].option2type === "target"){
          targetLocation = 2;
          nonTargetPositionArray = [1,3];
      }
      else if (this.state.experimentContents[counter].contents[0].option3type === "target"){
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
   
    this.setState({
      teachingSignal1: teachingSignal1,
      teachingSignal2: teachingSignal2,
      teachingSignal3: teachingSignal3,
    });


    console.log("ArrangeExperimentTrial: " + String(counter))
    console.log(this.state.experimentContents[counter])
    
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
      <Blockstart blockType={this.state.blockType} currentBlock={this.state.block} currentMiniblock={this.state.miniblock} cumulativeTestPerformanceMessage="Performance cumulative du test: " cumulativeTestPerformance={Number(this.state.cumulativeTestPerformance).toFixed(2).toString()} lastTestBlockPerformanceMessage="Performance du dernier bloc de test: " lastTestBlockPerformance={Number(this.state.lastTestBlockPerformance).toFixed(2).toString()} fmriMode = {this.state.fmriMode} fmriTestBlockButtonLabel = "Attente pour démarrer le bloc de test" fmriTrainingBlockButtonLabel = "Attente pour démarrer le bloc d'apprentissage" testBlockButtonLabel="Attente pour démarrer le bloc de test." trainingBlockButtonLabel="Attente pour démarrer le bloc d'apprentissage." firstPracticeBlockButtonLabel="Attente pour démarrer l'entraînement." 
     handleBlockstartScreen={this.state.showBlockstartScreen,this.handleBlockstartScreen}/>
    );
  }

renderMiniBlockstart() {

    setTimeout(() => this.handleMiniBlockstartScreen(),5000);

    return (
      <MiniBlockstart blockType={this.state.blockType} currentBlock={this.state.block} currentMiniblock={this.state.miniblock} cumulativeTestPerformanceMessage="Performance cumulative du test: " cumulativeTestPerformance={Number(this.state.cumulativeTestPerformance).toFixed(2).toString()} lastTestBlockPerformanceMessage="Performance du dernier bloc de test: " lastTestBlockPerformance={Number(this.state.lastTestBlockPerformance).toFixed(2).toString()} fmriTestBlockButtonLabel = "Attente pour démarrer le bloc de test" fmriTrainingBlockButtonLabel = "Attente pour démarrer le bloc d'apprentissage" testBlockButtonLabel="Attente pour démarrer le bloc de test." trainingBlockButtonLabel="Attente pour démarrer le bloc d'apprentissage." firstPracticeBlockButtonLabel="Attente pour démarrer l'entraînement."/>
    );
  }

renderTestBlockstart() {

    setTimeout(() => this.handleTestBlockstartScreen(),5000);

    return (
      <TestBlockstart blockType={this.state.blockType} currentBlock={this.state.block} currentMiniblock={this.state.miniblock}  testBlockStartText = "Attente pour démarrer le bloc de test" />
    );
  }



renderTriggerWaitScreen() {

    return (
      <TriggerWaitScreen triggerWaitScreenMessage="Bon Travail!" handleTriggerWaitScreen={this.state.showTriggerWaitScreen,this.handleTriggerWaitScreen}/>
    );
  }


renderFixationScreen() {
  //console.log("Fixation Screen start: " + Date.now())

    return (
      <FixationScreen/>
    );
  }


  jumpToEnd() {
    console.log("Jump to End of Experiment")
   
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
    

    fetch('http://5.135.154.233/start_new_participant_session',{mode:"cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: queryString.stringify(bodyContents)})
      .then(resp => console.log("response received"));
      // .then(resp => {
      //   const currentTime = resp.dateString;
      //   this.setState({currentTime})
      // })

  }


  sendUpdatePutRequestToServer() {
    console.log("Send PUT request to update the session")
    

    var participantID = this.state.participantID.toString()
    var responses = this.state.responses.toString()
    var responseTimes = this.state.responseTimes.toString()
    var trialStartTimes = this.state.trialStartTimes.toString()

    var currentBlock = this.state.miniblock.toString()
    var responsesCorrect = this.state.responsesCorrect.toString()
    var demographicsInfo = this.state.demographicsInfo.toString()
    var experimentName = this.state.experimentName.toString()

    var triggerEvents = this.state.triggerEvents.toString()
    var escapeEvents = this.state.escapeEvents.toString()

    var bodyContents = {experimentName: experimentName, participantID: participantID,responsesCorrect: responsesCorrect, responses: responses, responseTimes: responseTimes, trialStartTimes: trialStartTimes, triggerEvents: triggerEvents, escapeEvents: escapeEvents}
    //console.log(queryString.stringify(bodyContents))

    fetch('http://5.135.154.233/update_participant_session',{mode:"cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: queryString.stringify(bodyContents)})
      .then(resp => console.log("response received"));
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
    var trialStartTimes = this.state.trialStartTimes.toString()
    var currentBlock = this.state.miniblock.toString()
    var responsesCorrect = this.state.responsesCorrect.toString()
    var demographicsInfo = this.state.demographicsInfo.toString()
    var experimentName = this.state.experimentName.toString()
    var participantComments = comments

    var triggerEvents = this.state.triggerEvents.toString()
    var escapeEvents = this.state.escapeEvents.toString()

    var currentCondition = this.state.condition.toString()
    var currentConditionListID = this.state.conditionListID.toString()
    var currentExperimentName = this.state.experimentName.toString()
    var currentPlatformType = this.state.platformType.toString()

    var bodyContents = {experimentName: experimentName, participantID: participantID,responsesCorrect: responsesCorrect, responses: responses, responseTimes: responseTimes, trialStartTimes: trialStartTimes, participantComments: participantComments,triggerEvents: triggerEvents, escapeEvents: escapeEvents, cumulativeTestPerformance: this.state.cumulativeTestPerformance}
    //console.log(queryString.stringify(bodyContents))

    var bodyContentsLocal = {experimentName: currentExperimentName, condition: currentCondition, conditionListID: currentConditionListID, platformType: currentPlatformType, demographicsInfo: demographicsInfo, participantID: participantID,responsesCorrect: responsesCorrect, responses: responses, responseTimes: responseTimes, trialStartTimes: trialStartTimes, participantComments: participantComments,triggerEvents: triggerEvents, escapeEvents: escapeEvents, cumulativeTestPerformance: this.state.cumulativeTestPerformance}
    
    console.log("Results")

    console.log(queryString.stringify(bodyContentsLocal))

    console.log(this.state.cumulativeTestPerformance)

    fetch('http://5.135.154.233/complete_participant_session',{mode:"cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    body: queryString.stringify(bodyContentsLocal)})
      .then(resp => console.log("response received"));
      // .then(resp => {
      //   const currentTime = resp.dfateString;
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
    //console.log(queryString.stringify(bodyContents))

    var url = new URL("https://www.mturk.com/mturk/externalSubmit");
    
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
    //console.log(queryString.stringify(bodyContents))

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

      <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="t"
          onKeyHandle={this.handleTrigger}
        />

      <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="escape"
          onKeyHandle={this.handleEsc}
        />

        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="w"
          onKeyHandle={this.myKeyHandler}
        />

     



        {this.state.showDebug == 'true' ? 
        <div className="expDebugText">
        App Debug: 
        <br/> counter: {this.state.counter}
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
 this.state.showMiniBlockstartScreen ? this.renderMiniBlockstart(): 
 this.state.showTestBlockstartScreen ? this.renderTestBlockstart(): 
 this.state.showTriggerWaitScreen ? this.renderTriggerWaitScreen():
 this.state.showFixationScreen ? <ExperimentTrial
        isFixation={true}
        trialTarget={""}

        trialcontents={this.state.emptytrialcontents}
        numTrialsPerBlock={""}
        trialnum={""}
        block={""}
        totalNumBlocks={""}
        miniblock={""}
        blockType={""}
        showcell={""}
        teachingSignal1={"nonSelectable"}
        teachingSignal2={"nonSelectable"}
        teachingSignal3={"nonSelectable"}

        keyHandlerAppLevel = {""}
        responseSelected={""}
        onAnswerSelected={""}/>:  
        this.state.experimentStarted ? <ExperimentTrial
        isFixation={false}
        trialTarget={this.state.currentTarget}

        trialcontents={this.state.trialcontents}
        numTrialsPerBlock={this.state.totalNumTrials}
        trialnum={this.state.trialnum}
        block={this.state.miniblock}
        totalNumBlocks={this.state.totalNumBlocks}
        miniblock={this.state.miniblock}
        blockType={this.state.blockType}
        showcell={this.state.showcell}
        teachingSignal1={this.state.teachingSignal1}
        teachingSignal2={this.state.teachingSignal2}
        teachingSignal3={this.state.teachingSignal3}

        //questionTotal={this.state.numTrialsPerBlock}
        keyHandlerAppLevel = {this.keyHandlerAppLevel}
        responseSelected={this.state.receivedResponse}
        onAnswerSelected={this.handleAnswerSelected}
        
      /> : 
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
