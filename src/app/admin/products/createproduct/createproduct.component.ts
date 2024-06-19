import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AdminSidebarComponent } from '../../../components/admin-components/admin-sidebar/admin-sidebar.component';
import { ICategory } from '../../../model/icategory';
import { CategoryServiceService } from '../../../service/category-service.service';
import { ProductService } from '../../../service/product-service.service';

@Component({
  selector: 'app-createproduct',
  standalone: true,
  imports: [NavbarComponent,AdminSidebarComponent,CommonModule,FormsModule,ReactiveFormsModule,RouterOutlet],
  templateUrl: './createproduct.component.html',
  styleUrl: './createproduct.component.css'
})
export class CreateproductComponent implements OnInit {
  form!: FormGroup;
  categories: ICategory[] = [];

  name: string = '';
  price: string = '';
  image: string = '';
  quantity: string = '';
  status: string = '';
  description: string = '';

  constructor(
    public categoryService: CategoryServiceService,
    public producService:ProductService,
    private router: Router,
    route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.form = new FormGroup({
      categoryId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.categoryService.getAllCategory().subscribe((data: ICategory[]) => {
      this.categories = data;
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.producService.createProduct(this.form.value).subscribe((res: any) => {
      this.router.navigateByUrl('/product');
    });
  }
}
