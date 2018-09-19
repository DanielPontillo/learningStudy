import React from 'react';
import SizeTrialContent from '../components/SizeTrialContent';
import PluralTrialContent from '../components/PluralTrialContent';

function TrialQuestionContent(props) {


  var imgNum = Number(props.content[0].image) - 2000



  const imgDivStyle = {
    display: 'block',
    height: 60
  };

  return (
    <div className="fullTrialContent">
  	<div className="singular">
  		
    	<h2 className="rootword"> {props.content[0].rootWord} </h2>
      
		  <div id={"image_" + imgNum.toString()} style={imgDivStyle}></div>
  
	   </div>

    <div className="question">
      {props.content[0].grammarType === "size" ? <SizeTrialContent image={props.content[0].image}/> : <PluralTrialContent showcell={props.showcell} image={props.content[0].image}/>}
    </div>
  </div>
  );

}

TrialQuestionContent.propTypes = {
  content: React.PropTypes.array.isRequired
};

export default TrialQuestionContent;
