import { Component, OnInit } from '@angular/core';
import { DepenseService } from '../../../Core/services/depense.service';
import { Observable } from 'rxjs';
import { Depense } from '../../../Core/models/depense.model';


@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
  depenses: any[] = [];
  
  constructor(private depenseService: DepenseService) {}
  
  ngOnInit(): void {
    this.getDepenses();
  }
  
  getDepenses(): void {
    this.depenseService.getAllDepenses().subscribe({
      next: (response) => {
        this.depenses = response;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des dépenses:", error);
      }
    });
  }
  
  changerStatut(id: number, statut: 'VALIDEE' | 'REFUSEE'): void {
    this.depenseService.validateDepense(id, statut).subscribe({
      next: () => {
        // Mettre à jour le statut localement
        this.depenses = this.depenses.map(depense => 
          depense.id === id ? { ...depense, statut } : depense
        );
      },
      error: (error) => {
        console.error(`Erreur lors du changement de statut:`, error);
      }
    });
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}