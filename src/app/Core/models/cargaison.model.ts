export interface Cargaison{
    id: number,
    description: string,
    poids: number,
    type: 'STANDARD'|'FRAGILE' |'DANGEREUX'
    cargaisonStatut : 'EN_COURS' | 'LIVREE' 
}