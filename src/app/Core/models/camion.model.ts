export type TruckStatus = 'DISPONIBLE' | 'EN_MAINTENANCE' | 'HORS_SERVICE';

export interface Camion {
  id: number;
  marque: string;
  modele: string;
  annee: Date;
  etat: TruckStatus;
}