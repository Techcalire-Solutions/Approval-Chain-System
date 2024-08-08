import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { Role } from '../login/models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  url = environment.apiUrl;

  
  // --------------------------------------------------ROLE----------------------------------------
  getRole(search?:string, page?: number, pageSize?: number): Observable<Role[]>{
    return this._http.get<Role[]>(this.url + `/role/find/?search=${search}&page=${page}&pageSize=${pageSize}`);
  }
}
