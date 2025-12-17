import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Services {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.results.map((user: any) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone || 'N/A',
        picture: user.picture.large
      })))
    );
  }
}
