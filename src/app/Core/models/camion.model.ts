export interface Camion {
    id : number;
    marque: string
    modele: string
    annee: Date
    etat:   'DISPONIBLE' |'EN_MAINTENANCE'| 'HORS_SERVICE'
}
