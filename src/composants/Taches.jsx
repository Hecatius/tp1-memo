import Tache from './Tache';
import './Taches.scss';
import { useState,useEffect } from 'react';
import * as tacheModele from '../code/tache-modele';
import React from 'react';


export default function Taches({gererAjoutTaches,utilisateur,taches,setTaches}) {
  const [contenu, setContenu ] = useState("");
  console.log(utilisateur);
  
  
// Lire les dossiers (de l'utilisateur connecté) dans Firestore
useEffect(
  () => tacheModele.lireTout(utilisateur.uid).then(
    lesTaches => setTaches(lesTaches)
  )
  , [utilisateur, setTaches]
);


  function gererSoumettre(e){
    // alert("test du contenu " + JSON.stringify(contenu))
    
    // Code qui gère l'ajout dans Firestore
          if(contenu.search(/[a-z]{4,}/i) != -1) {
              gererAjoutTaches(contenu);
          }
          
    e.preventDefault()
    setContenu('');
  };
  console.log(taches);
  return (
    
    <section className="Taches">
      <form onSubmit={gererSoumettre}>
        <input 
          type="text"
          value={contenu}   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
          onChange={(e) => setContenu(e.target.value)}
        />
      </form>
      <div className="liste-taches">
      {
        taches.map( 
          tache =>  <React.Fragment key={tache.id}><Tache {...tache} /></React.Fragment>
        )
      }
        
      </div>
    </section>
  );
}