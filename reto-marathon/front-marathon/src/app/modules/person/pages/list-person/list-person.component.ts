import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonResponse } from '../../dto/person.dto';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPersonComponent } from '../../component/register-person/register-person.component';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe],
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss'],
  providers: [PersonService]
})
export class ListPersonComponent implements OnInit {

  constructor(
    private readonly personService: PersonService,
    public dialog: MatDialog
  ) { }

  public listPerson: PersonResponse[] = [];

  ngOnInit() {
    this.getAllPerson();
  }

  registerPerson(){
    const dialogRef = this.dialog.open(RegisterPersonComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.listPerson.push(result);
      }
    });

  }

  getAllPerson() {
    this.personService.getPerson().subscribe({
      next: (value) => this.listPerson = value,
    })
  }
}
