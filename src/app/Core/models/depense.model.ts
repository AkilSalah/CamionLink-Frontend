export interface Depense {
     id: number;
     typeDepense: string;
     montant: number;
     date: string;
     trajetId: number;
     statut: 'EN_ATTENTE' | 'VALIDEE' | 'REFUSEE';
   }