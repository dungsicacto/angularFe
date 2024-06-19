import { MatButtonModule } from '@angular/material/button';
import { DialogLoginComponent } from '../dialog-register/dialog-login/dialog-login.component';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; // Add this line
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatIconModule, // Add MatIconModule here
  ],
  providers: [MatDialog],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {}

  // initialaze for isUser
  isUser = false;
  isModalVisible = false;
  isAdmin = JSON.parse(localStorage.getItem('user')??'{}').role
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isUser = true;
      // this.check();
    }
    if (localStorage.getItem('user')) {
      const isAdmin = JSON.parse(localStorage.getItem('user') ?? '{}').role;
      if (localStorage.getItem('user')) {
        const isAdmin = JSON.parse(localStorage.getItem('user') ?? '{}').role;

      }
    }
  }

  openDialogLogin() {
    this.matDialog.open(DialogLoginComponent, {
      width: '310px',
    });
  }
  openDialogRegister() {
    this.matDialog.open(DialogRegisterComponent, {
      width: '310px',
    });
  }
  check() {
    let data: any;
    this.auth.authLogin().subscribe((res) => {
      data = { ...res };
      if (data.isUser) {
        this.isUser = true;
      }
    });
  }
  toggleUserModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.toggleUserModal();
    this.isUser = false;
    this.router.navigate(['/home']);
  }
  goToAdmin():void{
    this.router.navigateByUrl("admin")
  }
}
