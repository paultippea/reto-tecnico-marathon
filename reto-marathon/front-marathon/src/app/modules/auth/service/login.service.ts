import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SigninRequest, SigninResponse } from '../dto/SignIn.dto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {

    private http = inject(HttpClient);
    private router = inject(Router);

    signin(body: SigninRequest): Observable<SigninResponse> {
        return this.http.post<SigninResponse>('http://localhost:3000/api/v1/auth/signin', body);
    }

    signOut() {
        localStorage.clear();
        this.router.navigate(['/'])
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('type-token') && !!localStorage.getItem('access-token');
    }
}
