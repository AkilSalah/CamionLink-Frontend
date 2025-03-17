import { Panne } from "./panne.model";

export interface Entretien {
    id : number
    dateEntretien: string,
    etatEntretien: 'EN_ATTENTE'|'EN_COURS'|'TERMINE',
    cout: number,
    panneId: number
    panne?: Panne;
}
