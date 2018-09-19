import React, {Component} from 'react';

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

  }

  componentWillMount() {
    

  }

  showFeedback(answerCorrect){
    console.log("show feedback")

    if (answerCorrect){
      this.setState({
      feedback: 'smiley_img'
    });
    }
    else{
      this.setState({
      feedback: 'frown_img'
    })
    }

    
  }

  hideFeedbackAndProceed(response, selectedOption){
    console.log("hide feedback and proceed")
    console.log(response)
    console.log(selectedOption)
    console.log(this.state.feedback)
    this.setState({
      feedback: 'no_signal'
    })
    this.props.handleAnswerSelectedExperiment(response, selectedOption)
  }
  
  handleAnswerSelectedLocal(event) {


    console.log("Handle answer local selected for " + this.props.learningType + " trial.")
    var response = event.currentTarget.id
    var selectedOption = event.currentTarget.value
    console.log("selected word: " + response)
    console.log("selected option number: " + selectedOption)
    console.log("trial target: " + this.props.trialTarget)

    this.props.handleAnswerSelectedExperiment(response, selectedOption)

    
  }
   render() {
  return (
 
  <div className="answerOption">

    {this.props.teachingSignal === 'nonSelectable' && this.props.blockType === 'training' ? 
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

        {this.props.content} 

        <div id={this.props.teachingSignal} style={imgDivStyle}></div>
      </label>
      </div>
      : 
      <div className={this.props.teachingSignal} >
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={this.props.response === this.props.content}
        id={this.props.content}
        value={this.props.whichOption}
        onChange={this.handleAnswerSelectedLocal}
      />

      <label className="radioCustomLabel" htmlFor={this.props.content}>
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
