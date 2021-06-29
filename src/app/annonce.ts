import { Internaute } from "./internaute";
import { Vehicule } from "./vehicule";

export interface Annonce{
    id: number;
    debut_trajet: string;
    arrivee_trajet: string;
    nbr_place: number;
    date_debut: Date;
    date_arrivee: Date;
    heure_debut: Date;
    heure_arrivee: Date;
    frais: number;
    regulier: boolean;
    jour: string;
    valide: string;
    statut: string;
    internaute: Internaute;
    vehicule: Vehicule;
} 