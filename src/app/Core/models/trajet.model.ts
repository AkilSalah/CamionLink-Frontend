export interface Trajet {
    id: number;
    point_depart: string;
    point_arrivee: string;
    date_depart: string;
    date_arrivee: string;
    statut: 'EN_ATTENTE'|'EN_COURS'|'TERMINE'|'EN_RETARD';
    conducteur_id: number;
    camion_id: number;
    cargaison_id: number;
    conducteur?: any;
    camion?: any;
    cargaison?: any;
}