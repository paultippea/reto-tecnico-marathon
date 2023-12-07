import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PersonRequest } from '../../dto/person.dto';
import { PersonService } from '../../services/person.service';

@Component({
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
  providers: [PersonService]
})
export class RegisterPersonComponent implements OnDestroy {

  private subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<RegisterPersonComponent>,
    private readonly personService: PersonService,
    private _snackBar: MatSnackBar,
  ) { }

  public registerFrom = new FormGroup({
    'tipo': new FormControl('', Validators.required),
    'ruc': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]+')])
  });

  register() {
    if (this.registerFrom.invalid) return;
    this.subscription.add(
      this.personService.setPerson(this.registerFrom.value as PersonRequest)
        .subscribe({
          next: (value) => {
            this.dialogRef.close(value);
            this._snackBar.open(`Se registró la persona correctamente.`, "cerrar", {
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          },
          error: () => {
            this._snackBar.open(`Ocurrió un error inesperado, inténtelo nuevamente.`, "cerrar", {
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }
        })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
