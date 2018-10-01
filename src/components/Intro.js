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
      <div>
      <text>
        <div id={"logo_img"}></div>
       
        <p>
        Bienvenue dans cette expérience. </p>
      <p>
Cela fait partie d'une étude de recherche sur l'apprentissage. Il est dirigé par Daniel Pontillo à l'Ecole Normale Supérieure (Paris). Les travaux terminés seront stockés dans le laboratoire universitaire et seront confidentiels. Au cours de cette expérience, vous devrez apprendre les règles d'une langue étrangère.
 </p>
<p>
Les dossiers de réponse seront conservés jusqu'à trois ans après pour faciliter l'analyse et l'interprétation des données. La participation à cette étude est volontaire et vous pouvez vous retirer à tout moment, mais vous ne serez indemnisé que pour les questions auxquelles vous répondez, conformément aux politiques d'Amazon Mechanical Turk et aux conditions de cette HIT. Si vous choisissez de répondre à toutes les questions, cela devrait prendre environ 35 minutes.
 </p>
<p>
Il n'y a aucun risque connu et vous ne recevrez aucun avantage pour participer à cette étude. Si vous avez des questions ou des préoccupations, vous pouvez nous contacter en utilisant le lien "Contacter ce demandeur".
 </p>
<p>
Pour obtenir des instructions supplémentaires sur la tâche, veuillez cocher la case ci-dessous.
</p>
<p>

En cochant cette case, vous indiquez également que vous avez lu cette déclaration et que vous avez plus de 18 ans.
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
