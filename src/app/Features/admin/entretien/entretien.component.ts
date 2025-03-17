import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entretien } from '../../../Core/models/entretien.model';
import { EntretienService } from '../../../Core/services/entretien.service';
import { catchError, EMPTY, finalize, of } from 'rxjs';

@Component({
  selector: "app-entretien",
  templateUrl: "./entretien.component.html",
  styleUrl: "./entretien.component.css",
})
export class EntretienComponent implements OnInit {
  @Input() entretiens: any[] = []
  @Input() panneId : number | null = null
  @Output() successMessage = new EventEmitter<string>()
  @Output() errorMessage = new EventEmitter<string>()
  @Output() entretienChanged = new EventEmitter<Entretien[]>()

  isLoading = false
  showEntretienModal = false
  isSubmittingEntretien = false
  nouvelleEntretien: Entretien = this.getEmptyEntretien()

  isEditMode = false
  entretienToEdit: Entretien | null = null

  constructor(private entretienService: EntretienService) {}

  ngOnInit(): void {
    if (this.panneId) {
      this.loadEntretiens()
    }
  }

  loadEntretiens(): void {
    this.isLoading = true
    this.entretienService
      .getAllEntretien()
      .pipe(
        catchError((error) => {
          console.error("Erreur lors du chargement des entretiens:", error)
          this.errorMessage.emit("Erreur lors du chargement des entretiens. Veuillez réessayer.")
          return of([])
        }),
        finalize(() => {
          this.isLoading = false
        }),
      )
      .subscribe((ent) => {
        this.entretiens = ent.filter((e) => e.panne?.id === this.panneId)
        this.entretienChanged.emit(this.entretiens)
      })
  }

  getEmptyEntretien(): Entretien {
    return {
      id: 0,
      dateEntretien: new Date().toISOString().split("T")[0],
      etatEntretien: "EN_ATTENTE",
      cout: 0,
      panneId: 0,
    }
  }

  openEntretienModal(): void {
    this.isEditMode = false
    this.nouvelleEntretien = this.getEmptyEntretien()
    this.nouvelleEntretien.panneId = this.panneId || 0
    this.showEntretienModal = true
  }

  openEditModal(entretien: Entretien): void {
    this.isEditMode = true
    this.entretienToEdit = { ...entretien } 
    this.nouvelleEntretien = { ...entretien }
    this.showEntretienModal = true
  }

  closeEntretienModal(): void {
    this.showEntretienModal = false
    this.errorMessage.emit()
    this.isEditMode = false
    this.entretienToEdit = null
  }

  ajouterEntretien(): void {
    if (
      !this.nouvelleEntretien.cout ||
      !this.nouvelleEntretien.dateEntretien ||
      !this.nouvelleEntretien.etatEntretien
    ) {
      this.errorMessage.emit("Veuillez remplir tous les champs correctement.")
      return
    }

    if (!this.panneId) {
      this.errorMessage.emit("ID de la panne non défini.")
      return
    }

    this.nouvelleEntretien.panneId = this.panneId
    this.isSubmittingEntretien = true
    this.errorMessage.emit()

    this.entretienService
      .addEntretien(this.nouvelleEntretien)
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'ajout de l'entretien:", error)
          this.errorMessage.emit(
            "Erreur lors de l'ajout de l'entretien: " +
              (error.error?.message || error.message || "Veuillez vérifier les données saisies."),
          )
          return EMPTY
        }),
        finalize(() => {
          this.isSubmittingEntretien = false
        }),
      )
      .subscribe((newEntretien) => {
        const updatedEntretien = [...this.entretiens, newEntretien]
        this.entretiens = updatedEntretien
        this.entretienChanged.emit(updatedEntretien)
        this.successMessage.emit("Entretien ajouté avec succès.")
        this.closeEntretienModal()
      })
  }

  updateEntretien(): void {
    if (
      !this.nouvelleEntretien.cout ||
      !this.nouvelleEntretien.dateEntretien ||
      !this.nouvelleEntretien.etatEntretien
    ) {
      this.errorMessage.emit("Veuillez remplir tous les champs correctement.")
      return
    }

    if (!this.entretienToEdit) {
      this.errorMessage.emit("Aucun entretien sélectionné pour la modification.")
      return
    }

    this.isSubmittingEntretien = true
    this.errorMessage.emit()

    this.entretienService
      .updateEntretien(this.entretienToEdit.id, this.nouvelleEntretien)
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de la mise à jour de l'entretien:", error)
          this.errorMessage.emit(
            "Erreur lors de la mise à jour de l'entretien: " +
              (error.error?.message || error.message || "Veuillez vérifier les données saisies."),
          )
          return EMPTY
        }),
        finalize(() => {
          this.isSubmittingEntretien = false
        }),
      )
      .subscribe((updatedEntretien) => {
        const updatedEntretiens = this.entretiens.map((e) => (e.id === updatedEntretien.id ? updatedEntretien : e))

        this.entretiens = updatedEntretiens
        this.entretienChanged.emit(updatedEntretiens)
        this.successMessage.emit("Entretien mis à jour avec succès.")
        this.closeEntretienModal()
      })
  }

  deleteEntretien(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet entretien ?")) {
      this.isLoading = true

      this.entretienService
        .deleteEntretien(id)
        .pipe(
          catchError((error) => {
            console.error("Erreur lors de la suppression de l'entretien:", error)
            this.errorMessage.emit("Erreur lors de la suppression de l'entretien. Veuillez réessayer.")
            return EMPTY
          }),
          finalize(() => {
            this.isLoading = false
          }),
        )
        .subscribe(() => {
          const updatedEntretiens = this.entretiens.filter((e) => e.id !== id)
          this.entretiens = updatedEntretiens
          this.entretienChanged.emit(updatedEntretiens)
          this.successMessage.emit("Entretien supprimé avec succès.")
        })
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "EN_ATTENTE":
        return "bg-yellow-100 text-yellow-800"
      case "EN_COURS":
        return "bg-blue-100 text-blue-800"
      case "TERMINE":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case "EN_ATTENTE":
        return "En attente"
      case "EN_COURS":
        return "En cours"
      case "TERMINE":
        return "Terminé"
      default:
        return status
    }
  }
}
