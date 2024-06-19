import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AdminSidebarComponent } from '../../components/admin-components/admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryServiceService } from '../../service/category-service.service';
import { ICategory } from '../../model/icategory';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavbarComponent,AdminSidebarComponent,RouterModule,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
imageUrl: string = 'http://localhost:3001/uploads/img/';

categories: ICategory[] = [];
constructor(public categoryService: CategoryServiceService){

}

ngOnInit(): void {
  this.categoryService.getAllCategory().subscribe((data: ICategory[]) => {
    this.categories = data;
  });
}
deleteCategory(id: string) {
  this.categoryService.deleteCategory(id).subscribe((res: any) => {
    this.categories = this.categories.filter((item) => item._id !== id);
  });
}
}
