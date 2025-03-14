export interface Panne {
    id : number;
    datePanne : string
    trajetId: number;
    description : string
    urgence : 'IMMEDIATE' | 'APRES_TRAJET'
}
