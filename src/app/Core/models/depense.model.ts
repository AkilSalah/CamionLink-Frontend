export interface Depense {
     id : number
     depenseType : string
     depenseStatut : 'EN_ATTENTE'|'VALIDEE'|'REFUSEE'
     montant: number
     date : string
     trajetId : number
}