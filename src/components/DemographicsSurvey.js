import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';
import {ReactSelectize, MultiSelect} from 'react-selectize';


class DemographicsSurvey extends Component{
  constructor(props){
    super(props);

    this.state = {
      age: '',
      gender: '',
      education: '',
      languages: ['albanais','allemand','anglais','arabe','bulgare','catalan','chinois','coréen','croate','danois','espagnol','estonien','finnois','galicien','grec','hindi','hongrois','hébreu','italien','indonésien','japonais','latin','letton','lituanien','maltais','néerlandais','norvégien','persan','polonais','portugais','roumain','russe','serbe','slovaque','slovène','suédois','tagalog','tchèque','thaï','turc','ukrainien','vietnamien'],
      selectedlanguages: []
    };

    this.handleDemographicsLocal = this.handleDemographicsLocal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {

    if (e.target.name === 'age'){
      this.setState({ age: e.target.value });
    }
    else if (e.target.name === 'gender'){
      this.setState({ gender: e.target.value });
    }
    else if (e.target.name === 'education'){
      this.setState({ education: e.target.value });
    }
    
    
  }



  handleDemographicsLocal(){

    //update demographics info

    var demographicsInfo = [this.state.age, this.state.gender, this.state.education, [this.state.selectedlanguages.map(function(a) {return a.value;})]];
    //send to controller parent
   
    this.props.handleDemographicsSurveyResponse(this,demographicsInfo);
  }



  render(){
  return (
    

    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
      <text>
        <div id={"logo_img"}></div>
       
        S'il vous plaît remplir ce bref sondage. Cela aidera notre recherche.<br/><br/>

      <div className="demographicsSurvey">
      <ol>
        <li>Âge:
          <input onChange={this.handleChange} type="text" name="age"/>
        </li>
        <li>Genre:
        <select defaultValue="NA" onChange={this.handleChange} name="gender">
          <option value="NA"></option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Autre">Autre</option>
        </select>
        </li>
        <li> Quel est le plus haut diplôme que vous avez obtenu?
        <select onChange={this.handleChange} name="education">
          <option value="NA" selected></option>
          <option value="1">Diplôme d'études supérieures, doctorat, lycée, ingénieur</option>
          <option value="2">Diplôme universitaire</option>
          <option value="3">Diplômé du 1er cycle, BTS, DUT ou équivalent, niveau BAC + 2</option>
          <option value="4">Diplôme général, technologique, professionnel ou équivalent</option>
          <option value="5">CAP, BEP ou diplôme du même niveau</option>
          <option value="6">Brevet des collèges, BEPC</option>
          <option value="7">Certificat d'études primaires, sans diplôme</option>
        </select>

        </li>
        <li> Les langues étrangères que vous avez étudiées, par ordre de compétence:
        </li>
        <center>
        <MultiSelect
          placeholder="Sélectionnez"
          options={this.state.languages.map(language => ({label: language, value: language})
    )}
          value={this.state.selectedlanguages}
          label={this.state.selectedlanguages}
          onValuesChange={function(selectedlanguages){this.setState({selectedlanguages: selectedlanguages});}.bind(this)}
          />
        </center>

    </ol>
    </div>
    <br/>
    <br/>
        
        
        </text>
         </div>
       

      <div className="buttonContainer">
      <label>Appuyez sur le bouton pour soumettre</label><br/>
       
      <Button className="button" onClick={this.handleDemographicsLocal}>
      Soumettre
      </Button>
      </div>
      
    </ReactCSSTransitionGroup>
  );

}

}

DemographicsSurvey.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};

export default DemographicsSurvey;
