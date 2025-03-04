export interface Trajet {
    id: number
    point_depart: string
    point_arrivee: string
    date_depart: Date
    date_arrivee: Date
    statut:  'EN_ATTENTE'|'EN_COURS'|'TERMINE'|'EN_RETARD'
    conducteur_id: number
    camion_id: number
    cargaison_id: number
}