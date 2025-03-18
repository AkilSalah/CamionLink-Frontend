export interface Trajet {
    id: number
    pointDepart: string
    pointArrivee: string
    dateDepart: string
    dateArrivee: string
    statut: "EN_ATTENTE" | "EN_COURS" | "TERMINE" | "EN_RETARD"
    conducteur_id: number
    camion_id: number
    cargaison_id: number
    conducteur?: any
    camion?: any
    cargaison?: any
    point_depart?: string
    point_arrivee?: string
    date_depart?: string
    date_arrivee?: string
  }
  