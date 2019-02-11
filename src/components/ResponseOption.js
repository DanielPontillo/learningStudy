import React, {Component} from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';


const imgDivStyle = {
    
    display: 'block', backgroundSize: 20,
    height: 20
  };


  

class ResponseOption extends Component {

  constructor(props){
    super(props);

    this.state = {
      feedback: 'no_signal'
    };


  this.handleAnswerSelectedLocal = this.handleAnswerSelectedLocal.bind(this);

  this.handleGreen = this.handleGreen.bind(this);
  this.handleYellow = this.handleYellow.bind(this);
  this.handleBlue = this.handleBlue.bind(this);

  }

  componentWillReceiveProps(){

  }


  handleBlue(event){
    


   // if (this.props.responseSelected == false){

    
    if (this.props.optionID == "option1"){
      console.log("response received response level")
      console.log(Date.now())
    
      var response = this.props.content
      var selectedOption = "option1"
        this.props.handleAnswerSelectedExperiment(response, selectedOption)
    }

    this.setState({
      responseSelected: true
    })

  //}
  // else{
  //  console.log("already selected")
//    }
  }

  handleYellow(event){
    
    //if (this.props.responseSelected == false){

    
    if (this.props.optionID == "option2"){
      console.log("response received response level")
      console.log(Date.now())
    
      var response = this.props.content
      var selectedOption = "option2"
        this.props.handleAnswerSelectedExperiment(response, selectedOption)
    }

    this.setState({
      responseSelected: true
    })


  //}else{
   // console.log("already selected")
  //  }
}

  handleGreen(event){
    


    //if (this.props.responseSelected == false){

    if (this.props.optionID == "option3"){
      console.log("response received response level")
      console.log(Date.now())
    
      var response = this.props.content
      var selectedOption = "option3"
        this.props.handleAnswerSelectedExperiment(response, selectedOption)
    }

    this.setState({
      responseSelected: true
    })

   // } else{
   // console.log("already selected")
  // }

    
  }

  

  hideFeedbackAndProceed(response, selectedOption){
   
    this.setState({
      feedback: 'no_signal'
    })
    this.props.handleAnswerSelectedExperiment(response, selectedOption)
  }
  
  

  handleAnswerSelectedLocal(event) {
    console.log("handleAnswerSelectedLocal")

    var response = event.currentTarget.id
    var selectedOption = event.currentTarget.value
    

    this.props.handleAnswerSelectedExperiment(response, selectedOption)

    

    
  }
   render() {
  return (
 
  <div className="answerOption">

    {this.props.teachingSignal === 'nonSelectable' ? 

    

    <div className={this.props.teachingSignal}>
    

    <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={this.props.response === this.props.content}
        id={this.props.content}
        value={this.props.whichOption}
        />

        <label className="radioCustomLabel" htmlFor={this.props.content}>
        <br/>
        {this.props.content} 

        <div id={this.props.teachingSignal} style={imgDivStyle}><div id={this.props.feedback} style={imgDivStyle}></div></div>
      </label>
      </div>
      : 
      <div className={this.props.teachingSignal}>
      
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={this.props.response === this.props.content}
        id={this.props.content}
        value={this.props.whichOption}
        onChange={this.handleAnswerSelectedLocal}
        
      />
      <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="b"
          onKeyHandle={this.handleBlue}
        />

      <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="y"
          onKeyHandle={this.handleYellow}
        />
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="g"
          onKeyHandle={this.handleGreen}
        />

      <label className="radioCustomLabel" htmlFor={this.props.content}>
       <br/>
        {this.props.content} 
        <div id={this.props.teachingSignal} style={imgDivStyle}><div id={this.props.feedback} style={imgDivStyle}></div></div>
        
        

      </label>
      </div>
    }

</div>


  );
}

}

ResponseOption.propTypes = {
  content: React.PropTypes.string.isRequired,
  
};

export default ResponseOption;
