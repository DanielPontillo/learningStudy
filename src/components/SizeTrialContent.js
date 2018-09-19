import React from 'react';

function SizeTrialContent(props) {
 
  var imgNum = Number(props.image) - 2000


  const imgDivStyle = {
    display: 'block', backgroundSize: 40,
    height: 60
  };

  return (
  	<div className="experimentContentSize">
  		
    	<h2 className="rootword"> ? </h2>
		<div className="sizegrid">
		<div id={"image_" + imgNum.toString()} style={imgDivStyle}></div>
  		</div>

	</div>
  );

}

SizeTrialContent.propTypes = {
  image: React.PropTypes.number.isRequired
};

export default SizeTrialContent;
