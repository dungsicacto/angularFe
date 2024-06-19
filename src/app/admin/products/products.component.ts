import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AdminSidebarComponent } from '../../components/admin-components/admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product-service.service';
import { HttpClient } from '@angular/common/http';
import { Iproduct } from '../../model/iproduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    NavbarComponent,
    RouterOutlet,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Iproduct[] = [];
  imageUrl: string = 'http://localhost:3001/uploads/img/';


  constructor(
    private auth: AuthService,
    private router: Router,
    public productService: ProductService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/home']);
    }
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }
  editProduct(product:any):void{}
  deleteProduct(id:any):void{
    alert('Are you sure you want to delete this product?');
    this.productService.deleteProduct(id).subscribe((data) => {
      alert('Product deleted successfully');
      window.location.reload();

    });
  }
}
