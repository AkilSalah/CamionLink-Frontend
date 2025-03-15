export interface Entretien {
    dateEntretien: string,
    etatEntretien: 'EN_ATTENTE'|'EN_COURS'|'TERMINE',
    cout: number,
    panneId: number
}
