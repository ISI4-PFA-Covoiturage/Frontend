import { Internaute } from "./internaute";

export interface Vehicule{
id_vehicule: number;
matricule: string;
marque: string;
date_fin_assurance: Date;
couleur: string;
modele: string;
internaute: Internaute;
}