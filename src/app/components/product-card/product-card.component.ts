import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Iproduct } from '../../model/iproduct';
import { ProductService } from '../../service/product-service.service';
import { CartService } from '../../service/cart.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [CurrencyPipe],
})
export class ProductCardComponent implements OnInit {
  imageUrl: string = 'http://localhost:3001/uploads/img/';
  products: Iproduct[] = [];

  // paginate page initialization
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 6;
  paginatedArrays: Iproduct[] = [];

  @Input() selectedCategory!: string;

  constructor(public productService: ProductService, private cartService: CartService,private authService: AuthService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: Iproduct[]) => {
      this.products = data;
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
      this.updatePaginatedProducts();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['selectedCategory'] &&
      changes['selectedCategory'].currentValue
    ) {
      const newCategory = changes['selectedCategory'].currentValue;
      this.loadProductsByCategory(newCategory);
    }
  }

  loadProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(
      (data: Iproduct[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error loading products by category:', error);
      }
    );
  }
  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedArrays = this.products.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }
  toggleCart(product: any): void {
    if (this.authService.isLoggedIn()) {
      if (this.cartService.isInCart(product)) {
        this.cartService.removeFromCart(product);
        alert('Sản phẩm đã được xóa khỏi giỏ hàng!');
      } else {
        this.cartService.addToCart(product);
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      }
    } else {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
    }
  }

  isInCart(product: any): boolean {
    return this.cartService.isInCart(product);
  }
}
