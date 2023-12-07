import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SigninRequest } from '../../dto/SignIn.dto';
import { LoginService } from '../../service/login.service';

const MATERIAL = [
  MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatSnackBarModule
]

@Component({
  standalone: true,
  imports: [...MATERIAL, ReactiveFormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnDestroy {

  private subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  public loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    'password': new FormControl('', Validators.required)
  });

  signin() {
    if (this.loginForm.invalid) return;
    this.subscription.add(
      this.loginService.signin(this.loginForm.value as SigninRequest).subscribe({
        next: (data) => {
          if (data.access_token && data.type_token) {
            localStorage.setItem('access-token', data.access_token)
            localStorage.setItem('type-token', data.type_token)
            this.router.navigate(['/person/list']);
            return;
          }
          this._snackBar.open(`Ocurrió un error inesperado, inténtelo nuevamente.`, "cerrar", {
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        },
        error: (err) => {
          this._snackBar.open(`${err.status}: ${err.statusText}`, "cerrar", {
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
