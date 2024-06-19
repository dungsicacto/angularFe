import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../service/cart.service';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckoutService } from '../../service/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  form!: FormGroup;
  cartItems: any[] = [];
  cartItemsData: any[] = [];

  name: string = '';
  address: string = '';
  email: string = '';

  constructor(
    private httpClient: HttpClient,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.name = user ? user.name : '';
    this.email = user ? user.email : '';
    this.address = user ? user.address : '';
    console.log('User:', user);


    this.form = new FormGroup({
      name: new FormControl(user.name, [Validators.required]),
      address: new FormControl(user.address, [Validators.required]),
      email: new FormControl(user.email, [Validators.required]),
    });
    this.cartItems = this.cartService.getCart();
    // console.log('Cart items:', this.cartItems);
    // console.log('Total price:', totalPrice);
    this.cartItemsData = this.cartItems.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }));
    // console.log('Cart items data:', this.cartItemsData);

  }

  onSubmit() {
    this.cartItems = this.cartService.getCart();
    console.log('Cart items:', this.cartItems);

    const totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    console.log('Cart items:', this.cartItems);
    console.log('Total price:', totalPrice);
    this.cartItemsData = this.cartItems.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }));
    const orderData = {
      name: this.form.value.name,
      address: this.form.value.address,
      email: this.form.value.email,
      totalPrice,
      items: this.cartItems,
    };
    console.log('Order data:', orderData.items);

    this.checkoutService.checkout(orderData).subscribe(
      (response) => {
        console.log('Order created successfully!', response);
        alert(
          'Order created successfully! Please check your email to confrim order.'
        );
        localStorage.removeItem('cart');
      },
      (error) => {
        console.error('Error creating order', error);
        alert('Please login to create order.');
        this.router.navigateByUrl('order');
      }
    );
  }
}
