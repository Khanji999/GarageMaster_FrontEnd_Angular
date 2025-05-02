import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  submitted = false;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      const { userName, password } = this.form.value;
      this.authService.login(userName, password).subscribe(success => {
      });
    }
  }
}
