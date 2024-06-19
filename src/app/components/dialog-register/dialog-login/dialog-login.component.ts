import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatFormField,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.css',
})
export class DialogLoginComponent implements OnInit {
  form!: FormGroup;

  user = {
    email: '',
    password: '',
  };
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  handleLogin() {
    this.auth.login(this.form.value).subscribe(
      (res) => {
        const token = res.token;
        const user = res.user;
        this.auth.saveToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
