import React from 'react';

function Question(props) {
  var imgroot = "img/"
  var imgpath = imgroot.concat(props.content[0].image)
  imgpath = imgpath.concat(".jpg")
  return (
  	<div className="experimentContent">

    	<h2 className="rootword"> {props.content[0].rootword} </h2>
		{imgpath}
		
	</div>
  );

}

Question.propTypes = {
  content: React.PropTypes.array.isRequired
};

export default Question;
