import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IMAGE_PATHS } from '../../../core/services/imagesPath/images-path.service';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { ImageBackgroundComponent } from "../../components/image-background/image-background.component";
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ImageBackgroundComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  imagePaths = IMAGE_PATHS;
  submitted = false;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
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
        if (success) {
          // If login is successful, show success Snackbar
          this.snackBar.open('Login Successful!', 'Close', {
            duration: 3000, // Snackbar duration (in ms)
            panelClass: ['snack-bar-success'] // Custom class for styling
          });
        } else {
          // If login fails, show error Snackbar
          this.snackBar.open('Invalid username or password. Please try again.', 'Close', {
            duration: 3000, // Snackbar duration
            panelClass: ['snack-bar-error'] // Custom class for styling
          });
        }
      });
    }
  }
}
