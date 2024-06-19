import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import {} from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    ProductCardComponent,
  ],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
