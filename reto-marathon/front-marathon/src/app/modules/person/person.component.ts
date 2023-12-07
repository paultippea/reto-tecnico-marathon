import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../auth/service/login.service';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './person.component.html',
  providers:[LoginService]
})
export class PersonComponent { 
  
  constructor(
    private readonly loginService:LoginService
  ){}

  signOut(){
    this.loginService.signOut();
  }
}
