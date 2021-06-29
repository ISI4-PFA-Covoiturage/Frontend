import { Internaute } from "./internaute";
import { Annonce } from "./annonce";

export interface Reservation{
    id: number;
    notation: number;
    remarque: string;
    statut: string;
    annonce: Annonce;
    internaute: Internaute;
} 