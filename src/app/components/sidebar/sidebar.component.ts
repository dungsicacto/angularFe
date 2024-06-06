import { ProductService } from './../../service/product-service.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { ICategory } from '../../model/icategory';
import { CategoryServiceService } from '../../service/category-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Iproduct } from '../../model/iproduct';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  categories: ICategory[] = [];
  products: Iproduct[] = [];

  @Output() categorySelected = new EventEmitter<string>();

  constructor(
    public categoryService: CategoryServiceService,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((data: ICategory[]) => {
      this.categories = data;
    });
  }
  selectCategory(category: string) {
    // Gọi phương thức của biến đầu ra và truyền giá trị của danh mục được chọn
    this.categorySelected.emit(category);
  }
}
