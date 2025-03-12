import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {

  message: string = 'Vous n\'êtes pas autorisé à accéder à cette page.';

  constructor(private route: ActivatedRoute,private router : Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.message = params['message'];
      }
    });
  }

  goBack(): void {
      this.router.navigate(['/']);
  }
}
