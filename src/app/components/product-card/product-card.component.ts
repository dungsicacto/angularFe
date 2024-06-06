import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { Iproduct } from '../../model/iproduct';
import { ProductService } from '../../service/product-service.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [CurrencyPipe],
})
export class ProductCardComponent {
  imageUrl: string = 'http://localhost:3001/uploads/img/';
  products: Iproduct[] = [];

  @Input() selectedCategory!: string;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: Iproduct[]) => {
      this.products = data;
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
}
