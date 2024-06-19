import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AdminSidebarComponent } from '../../components/admin-components/admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { Iorder } from '../../model/iorder';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [
    NavbarComponent,
    AdminSidebarComponent,
    CommonModule,
    RouterOutlet,
    FormsModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderAdminComponent {
  statusOptions = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'Processed' },
    { value: 2, label: 'Shipped' },
    { value: 3, label: 'Delivered' },
  ];

  orders: Iorder[] = [];
  imageUrl: string = 'http://localhost:3001/uploads/img/';

  private statusMap: { [key: number]: string } = {
    0: 'Pending',
    1: 'Processed',
    2: 'Shipped',
    3: 'Delivered',
  };

  constructor(public orderService: OrderService, private router: Router) {}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;

      this.orders.forEach((order) => {
        // Map status
        order.statusText = this.statusMap[order.status] || 'Unknown';

        // Calculate total price
        order.totalPrice = order.CTHD.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      });
    });
  }
  deleteOrder(id: any): void {}

  handleChangeStatus(id: any, status: any): void {
    console.log('it works!');

    const intStatus = parseInt(status);
    this.orderService
      .updateOrder(id, { status: intStatus })
      .subscribe((data) => {
        alert('Order status updated successfully');
        window.location.reload();
      });
  }
}
