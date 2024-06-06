import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}
