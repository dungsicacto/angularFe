// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {}

  addToCart(product: any): void {
    product.quantity = 1;
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeFromCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: any) => item._id !== product._id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  isInCart(product: any): boolean {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.some((item: any) => item._id === product._id);
  }

  getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  updateCart(cart: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
