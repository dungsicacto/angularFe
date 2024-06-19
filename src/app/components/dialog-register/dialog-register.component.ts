import { Component, NgModule, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../service/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dialog-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatFormField,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  templateUrl: './dialog-register.component.html',
  styleUrl: './dialog-register.component.css',
})
export class DialogRegisterComponent implements OnInit{
  form!: FormGroup;

  user = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  }
  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatpassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  handleRegister() {
    this.auth.register(this.form.value).subscribe(
      (res) => {
        const token = res.token;
        this.auth.saveToken(token);
        // this.router.navigate(['/']);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
