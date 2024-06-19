import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  imageUrl: string = 'http://localhost:3001/uploads/img/';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCart();
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.loadCartItems(); // Refresh the cart items after removal
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.cartService.updateCart(this.cartItems);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCart(this.cartItems);
    } else {
      this.removeFromCart(item);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
