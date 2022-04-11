import './Appli.scss';
import logo from '../images/memo-logo.png';
import Controle from './Controle';
import Taches from './Taches';
import Accueil from './Accueil';
import Utilisateur from './Utilisateur';
import{useState,useEffect} from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';
import * as tacheModele from '../code/tache-modele';

export default function Appli() {
  // Ceci est l'état d'utilisateur
  const [utilisateur ,setUtilisateur] = useState(null);

  // État des 'taches' de l'utilisateur connecté
  const [taches, setTaches] = useState([]);

  

  function gererAjoutTaches(contenu){
    tacheModele.creer(utilisateur.uid, {
      contenu: contenu
    }).then(
      
      doc => setTaches([{id: doc.id, ...doc.data()}, ...taches])
    );

  }

// Surveiller l'état de la connexion Firebase Auth
// À RÉVISER
useEffect(() => observerEtatConnexion(setUtilisateur),[]);

  return (
      
    //1)  Si un utilisateur est connecté : 
    utilisateur ?
      <div className="Appli">
        <header className="appli-entete">
          <img src={logo} className="appli-logo" alt="Memo" />
          <Utilisateur utilisateur={utilisateur}/>
        </header>
        <Taches gererAjoutTaches={gererAjoutTaches} utilisateur={utilisateur} taches={taches} setTaches={setTaches}/>
        <Controle />
      </div>
    :
    // 2) Par contre si aucun utilisateur n'est connecté, on affiche plutôt le composant suivant : 
      <Accueil />
  );
}
