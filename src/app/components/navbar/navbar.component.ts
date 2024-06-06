import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { DialogLoginComponent } from './../dialog-login/dialog-login.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Add this line

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    DialogLoginComponent,
    MatButtonModule,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatDialog
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  constructor(private matDialog:MatDialog){}
  openDialog(){
    this.matDialog.open(DialogLoginComponent, {
      width: '500px',
      height: '500px',
    });
  }
}
