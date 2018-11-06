import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button} from 'react-bootstrap';


function Intro(props) {
  
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

      <div className="introText">

      <text>
      <div id={"logo_img"}></div>
       
      <p>
      Bienvenue dans cette expérience. 
      </p>

      <p>
      Vous devez être un francophone pour faire cette tâche! 
      </p>

      <p>
      Cela fait partie d'une étude de recherche sur l'apprentissage. Au cours de cette expérience, vous devrez apprendre les règles d’une langue étrangère d’une autre galaxie.
      </p>

      <p>
      Il est dirigé par Le Laboratoire de Neurosciences Cognitives à l'Ecole Normale Supérieure (Paris). Les travaux terminés seront stockés dans le laboratoire universitaire et seront confidentiels. Les dossiers de réponse seront conservés jusqu'à trois ans après pour faciliter l'analyse et l'interprétation des données. La participation à cette expérience est volontaire et vous pouvez vous retirer à tout moment. Si vous terminez l'expérience, cela devrait prendre environ 35 minutes. 
      </p>

      <p>
      Vous recevrez un bonus proportionnel à votre performance, alors faites de votre mieux!
      </p>

      <p>
      Il n'y a aucun risque connu et vous ne recevrez aucun avantage pour participer à cette étude. Si vous avez des questions ou des préoccupations, vous pouvez nous contacter à [daniel.pontillo@ens.fr].  
      </p>

      <p>
      Nous expliquerons la tâche en détail avant de commencer.
      </p>

      <p>
      En continuant, vous indiquez également que vous parlez français et que vous avez lu cette déclaration et que vous avez plus de 18 ans.
      </p> 
      <br/><br/>
      </text>
      </div>
       

      <div className="buttonContainer">
      <label>En cliquant sur Soumettre, j'accepte que j'ai lu et compris ce formulaire de consentement</label><br/>
       
      <Button className="button" onClick={props.handleConsentResponse.bind(this)}>
      Soumettre
      </Button>
      </div>

      </ReactCSSTransitionGroup>
      
  );

}

Intro.propTypes = {
  //noconsent
  //quizResult: React.PropTypes.string.isRequired,
};

export default Intro;
