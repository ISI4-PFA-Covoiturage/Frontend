import { Internaute } from "./internaute";

export interface Alert{
    id_alert: number;    
    debut_trajet: string;
    arrivee_trajet: string;
    date_debut: Date;
    date_arrivee: Date;
    heure_debut: Date;
    heure_arrivee: Date;
    internaute: Internaute;
}