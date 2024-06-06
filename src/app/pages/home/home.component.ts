import { Component, NgModule, Output } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    ProductCardComponent,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  selectedCategory:any;
  // @Output() selectedCategory: string = '';

  onCategorySelect(category: string) {
    // Gọi phương thức của component cha để cập nhật selectedCategory
    this.selectedCategory = category;
    // console.log(this.selectedCategory);
  }
}
