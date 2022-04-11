import './Tache.scss';
import { formaterDate } from '../code/helper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
export default function Tache({id,contenu,dateModif}) {
  
  return (
    <div className="Tache">
      <CheckCircleIcon color="success"/>
      <span className="texte">{contenu}</span>
      <span className="date">{formaterDate(dateModif.seconds)}</span>
      <RemoveCircleIcon style={{ color: 'red' }}/>
    </div>
  );
}