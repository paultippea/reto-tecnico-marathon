import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PersonRequest, PersonResponse } from '../dto/person.dto';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {

    private http = inject(HttpClient);

    getPerson(): Observable<PersonResponse[]> {
        return this.http.get<PersonResponse[]>('http://localhost:3000/api/v1/person');
    }

    setPerson(body: PersonRequest): Observable<PersonResponse> {
        return this.http.post<PersonResponse>('http://localhost:3000/api/v1/person/register', body);
    }
}
