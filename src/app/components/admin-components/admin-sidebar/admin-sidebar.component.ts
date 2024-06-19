import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  constructor(private router:Router){}
  navigateProduct():void{
    this.router.navigateByUrl('admin/product')
  }
  navigateCategory():void{
    this.router.navigateByUrl('admin/category')
  }
  navigateOrder():void{
    this.router.navigateByUrl('admin/order')
  }
}
