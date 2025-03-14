import { Component, OnInit } from '@angular/core';
import { Panne } from '../../../Core/models/panne.model';
import { PanneService } from '../../../Core/services/panne.service';
import { catchError, finalize, Observable, of } from 'rxjs';

@Component({
  selector: "app-panne-management",
  templateUrl: "./panne-management.component.html",
  styleUrl: "./panne-management.component.css",
})
export class PanneManagementComponent implements OnInit {
  pannes: any[] = []
  pannesFiltrees: any[] = []
  successMessage: string | null = null
  errorMessage: string | null = null
  isLoading = false

  filtreUrgence = "TOUS"
  searchTerm = ""

  panneDetails: any | null = null

  constructor(private panneService: PanneService) {}

  ngOnInit(): void {
    this.loadAllPannes()
  }

  loadAllPannes(): void {
    this.isLoading = true
    this.panneService
      .getAllPannes()
      .pipe(
        catchError((error) => {
          console.error("Erreur lors du chargement des pannes:", error)
          this.errorMessage = "Erreur lors du chargement des pannes. Veuillez réessayer."
          return of([])
        }),
        finalize(() => {
          this.isLoading = false
        }),
      )
      .subscribe((pannes) => {
        this.pannes = pannes
        console.log(pannes)
        this.appliquerFiltres()
        this.successMessage = "Pannes chargées avec succès."
        setTimeout(() => (this.successMessage = null), 3000)
      })
  }

  appliquerFiltres(): void {
    let resultat = [...this.pannes]

    if (this.filtreUrgence !== "TOUS") {
      resultat = resultat.filter((panne) => panne.urgence === this.filtreUrgence)
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase()
      resultat = resultat.filter(
        (panne) =>
          panne.description.toLowerCase().includes(searchLower) ||
          panne.id.toString().includes(searchLower) ||
          (panne.trajet?.id && panne.Trajet.id.toString().includes(searchLower)) ||
          (panne.trajet?.pointDepart && panne.trajet.pointDepart.toLowerCase().includes(searchLower)) ||
          (panne.trajet?.pointArrivee && panne.trajet.pointArrivee.toLowerCase().includes(searchLower)) ||
          (panne.trajet?.conducteur?.nom && panne.trajet.conducteur.nom.toLowerCase().includes(searchLower)),
      )
    }

    this.pannesFiltrees = resultat
  }

  resetFiltres(): void {
    this.filtreUrgence = "TOUS"
    this.searchTerm = ""
    this.appliquerFiltres()
  }

  voirDetails(panne: Panne): void {
    this.panneDetails = panne
  }

  fermerDetails(): void {
    this.panneDetails = null
  }

  supprimerPanne(panneId: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette panne ?")) {
      this.panneService
        .deletePanne(panneId)
        .pipe(
          catchError((error) => {
            console.error("Erreur lors de la suppression de la panne:", error)
            this.errorMessage = "Erreur lors de la suppression de la panne. Veuillez réessayer."
            setTimeout(() => (this.errorMessage = null), 5000)
            return of(null)
          }),
        )
        .subscribe(() => {
          this.pannes = this.pannes.filter((p) => p.id !== panneId)
          this.appliquerFiltres()
          this.successMessage = "Panne supprimée avec succès."
          setTimeout(() => (this.successMessage = null), 3000)
        })
    }
  }
}
