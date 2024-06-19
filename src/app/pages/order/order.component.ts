import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  orders: any[] = [];
  selectedOrder: any;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders(); // Gọi hàm để lấy danh sách đơn hàng khi component được khởi tạo
  }

  getOrders() {
    // Sử dụng service để lấy danh sách đơn hàng từ nguồn dữ liệu
    this.orderService.getOrders().subscribe((data: any[]) => {
      this.orders = data;
      // console.log(this.orders);
    });
  }
  getStatusText(status: number): string {

    switch (status) {
      case 0:
        return 'Waiting for confirmation';
      case 1:
        return 'Confirmed';
      case 2:
        return 'Shipping';
      case 3:
        return 'Delivered';
      default:
        return 'Unknown status';
    }
  }
  cancelOrder(id: any): any {
    alert('Are you sure to cancel this order?');
    this.orderService.cannelOrder(id).subscribe((data: any) => {
      console.log(data);
      this.getOrders();
    });
  }
}
