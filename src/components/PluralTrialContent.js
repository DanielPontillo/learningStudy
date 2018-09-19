import React from 'react';

function PluralTrialContent(props) {
 
  var imgNum = Number(props.image) - 2000

  
  const imgDivStyle = {
    display: 'block', backgroundSize: 60,
    height: 60
  };
  const imgDivStyleHidden = {
    display: 'block', backgroundSize: 60,
    background: 'white',
    height: 60
  };
  

  //var showcell = Array.apply(null, Array(9)).map( Boolean(Math.random() >= 0.5));
  
  

  return (
    <div className="experimentContentPlural">
      
    <h2 className="rootword"> ? </h2>

    <div className="pluralgrid">
        { props.showcell[0] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle} ></div> : <div id={"image_" + imgNum.toString()} style={imgDivStyleHidden} className="leftright"></div> }
        
        { props.showcell[1] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle} className="leftright"></div> : <div id={"image_" + imgNum.toString()} style={imgDivStyleHidden} className="leftright"></div> }
        { props.showcell[2] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle}></div> : <div id={"image_" + imgNum.toString()} style={imgDivStyleHidden} className="leftright"></div> }
        { props.showcell[3] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle} className="updown"></div> : <div id={"image_" + imgNum.toString()} style={imgDivStyleHidden} className="leftright"></div> }
        { props.showcell[4] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle} className="middle"></div> : <div id={"image_" + imgNum.toString()} style={imgDivStyleHidden} className="leftright"></div> }
        { props.showcell[5] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle} className="updown"></div> : <div id={"image_" + imgNum.toString()} style={imgDivStyleHidden} className="leftright"></div> }
        { props.showcell[6] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle}></div> : <div id={"image_" + imgNum.toString()} style={imgDivStyleHidden} className="leftright"></div> }
        { props.showcell[7] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle} className="leftright"></div> : <div id={"image_" + imgNum.toString()} style={imgDivStyleHidden} className="leftright"></div> }
        { props.showcell[8] === 1 ? <div id={"image_" + imgNum.toString()} style={imgDivStyle}></div> : null }
    </div>

  

  </div>
  );

}

PluralTrialContent.propTypes = {
  image: React.PropTypes.number.isRequired
};

export default PluralTrialContent;
