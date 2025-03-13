export interface Panne {
    id : number;
    datePanne : string
    description : string
    urgence : 'IMMEDIATE' | 'APRES_TRAJET'
}
