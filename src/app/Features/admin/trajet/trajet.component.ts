import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trajet } from '../../../Core/models/trajet.model';
import { TrajetService } from '../../../Core/services/trajet.service';
import { ConducteurService } from '../../../Core/services/conducteur.service';
import { TruckService } from '../../../Core/services/truck.service';
import { CargaisonService } from '../../../Core/services/cargaison.service';

@Component({
  selector: "app-trajet",
  templateUrl: "./trajet.component.html",
  styleUrls: ["./trajet.component.css"],
})
export class TrajetComponent implements OnInit {
  trajets$: Observable<any[]> = of([])
  errorMessage: string | null = null
  showModal = false
  isEditMode = false

  currentTrajet: any = {
    id: 0,
    pointDepart: "",
    pointArrivee: "",
    dateDepart: "",
    dateArrivee: "",
    statut: "EN_ATTENTE",
    conducteur_id: 0,
    camion_id: 0,
    cargaison_id: 0,
  }

  conducteurs$: Observable<any[]> = of([])
  camions$: Observable<any[]> = of([])
  cargaisons$: Observable<any[]> = of([])

  constructor(
    private trajetService: TrajetService,
    private conducteurService: ConducteurService,
    private camionService: TruckService,
    private cargaisonService: CargaisonService,
  ) {}

  ngOnInit(): void {
    this.loadTrajets()
    this.loadRelatedData()
  }

  loadTrajets(): void {
    this.trajetService.getTrajet().subscribe({
      next: (response) => {
        this.trajets$ = of(response)
      },
      error: (err) => {
        console.error("Erreur lors du chargement:", err)
        this.errorMessage = "Erreur lors du chargement des trajets."
      },
    })
  }

  loadRelatedData(): void {
    this.conducteurService.getConducteurs().subscribe({
      next: (response) => {
        this.conducteurs$ = of(response)
      },
      error: (err) => {
        console.error("Erreur lors du chargement des conducteurs:", err)
      },
    })

    this.camionService.getTrucks().subscribe({
      next: (response) => {
        this.camions$ = of(response)
      },
      error: (err) => {
        console.error("Erreur lors du chargement des camions:", err)
      },
    })

    this.cargaisonService.getCargaisons().subscribe({
      next: (response) => {
        this.cargaisons$ = of(response)
      },
      error: (err) => {
        console.error("Erreur lors du chargement des cargaisons:", err)
      },
    })
  }

  openModal(): void {
    this.showModal = true
  }

  closeModal(): void {
    this.showModal = false
    this.isEditMode = false
    this.currentTrajet = {
      id: 0,
      pointDepart: "",
      pointArrivee: "",
      dateDepart: "",
      dateArrivee: "",
      statut: "EN_ATTENTE",
      conducteur_id: 0,
      camion_id: 0,
      cargaison_id: 0,
    }
  }

  editTrajet(trajet: Trajet): void {
    this.isEditMode = true

    this.currentTrajet = {
      id: trajet.id,
      pointDepart: trajet.pointDepart || "",
      pointArrivee: trajet.pointArrivee || "",
      dateDepart: trajet.dateDepart,
      dateArrivee: trajet.dateArrivee,
      statut: trajet.statut || "EN_ATTENTE",
      conducteur_id: trajet.conducteur?.id || 0,
      camion_id: trajet.camion?.id || 0,
      cargaison_id: trajet.cargaison?.id || 0,
      conducteur: trajet.conducteur,
      camion: trajet.camion,
      cargaison: trajet.cargaison,
    }
    this.showModal = true
  }

  saveTrajet(): void {
    if (!this.currentTrajet) return

    const trajetToSave: Trajet = {
      id: this.currentTrajet.id,
      pointDepart: this.currentTrajet.pointDepart,
      pointArrivee: this.currentTrajet.pointArrivee,
      dateDepart: this.currentTrajet.dateDepart,
      dateArrivee: this.currentTrajet.dateArrivee,
      statut: this.currentTrajet.statut,
      conducteur_id: this.currentTrajet.conducteur_id,
      camion_id: this.currentTrajet.camion_id,
      cargaison_id: this.currentTrajet.cargaison_id,
      point_depart: this.currentTrajet.pointDepart,
      point_arrivee: this.currentTrajet.pointArrivee,
      date_depart: this.currentTrajet.dateDepart.replace("T", " "),
      date_arrivee: this.currentTrajet.dateArrivee.replace("T", " "),
    }

    console.log("Données envoyées :", trajetToSave)

    if (this.isEditMode) {
      this.trajetService.updateTrajet(trajetToSave.id, trajetToSave).subscribe({
        next: () => {
          this.loadTrajets()
          this.closeModal()
          this.errorMessage = null
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour:", err)
          this.errorMessage = "Erreur lors de la mise à jour du trajet."
        },
      })
    } else {
      this.trajetService.addTrajet(trajetToSave).subscribe({
        next: () => {
          this.loadTrajets()
          this.closeModal()
          this.errorMessage = null
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout:", err)
          console.error("Détails:", err.error)
          this.errorMessage = "Erreur lors de l'ajout du trajet."
        },
      })
    }
  }

  deleteTrajet(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce trajet ?")) {
      this.trajetService.deleteTrajet(id).subscribe({
        next: () => {
          this.loadTrajets()
          this.errorMessage = null
        },
        error: (err) => {
          console.error("Erreur lors de la suppression:", err)
          this.errorMessage = "Erreur lors de la suppression du trajet."
        },
      })
    }
  }
}

