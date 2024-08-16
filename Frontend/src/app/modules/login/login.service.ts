import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, mapTo, of, tap } from 'rxjs';
import { Role } from './models/role';
import { User } from './models/user';
import { environment } from 'src/environments/environment';
import { Attendance } from './models/attendance';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: any;
  // private loggedInUsername: any;

  private  currentUserSource = new ReplaySubject<User>(1)
  currentUser$ = this.currentUserSource.asObservable();

  url = environment.apiUrl

  private doLoginUser(userName: String, tokens: any){
    this.loggedUser = userName
    console.log(this.loggedUser) //123 - current phone number
    this.storeTokens(tokens)
  }

  loginUser(data: any)
  {
   console.log(data)

   return this._http.post(this.url + '/auth', data).pipe(
     tap((tokens) => this.doLoginUser(data.email, tokens)),
     mapTo(true),

     catchError((error: any) => {
       console.log(error)
       return of(false)
     })
   )
  }
  private storeTokens(tokens: any){
    console.log(tokens)
    localStorage.setItem(this.JWT_TOKEN, tokens.token.accessToken)
    localStorage.setItem(this.REFRESH_TOKEN, tokens.token.refreshToken)
    console.log(localStorage.getItem(this.JWT_TOKEN) as string)
    localStorage.setItem('token', JSON.stringify(tokens))
  }

  getJWTToken() {
    return localStorage.getItem(this.JWT_TOKEN);

  }

  isLoggedIn(): boolean {
    return !!this.getJWTToken();

  }


  // loginUser(data:any){
  //   return this._http.post(this.url+'/user/login',data).pipe(
  //     map((res:any)=>{
  //       const user=res;
  //       localStorage.setItem('token',JSON.stringify(user))
  //       this.currentUserSource.next(user)
  //       return user.role.toLowerCase();
  //     })
  //   )
  //  }



   logoutUser(){
    localStorage.removeItem(this.JWT_TOKEN)
    localStorage.removeItem(this.REFRESH_TOKEN)
    localStorage.removeItem('token')
   }

   addAttendance(data: any){
    return this._http.post(this.url + '/attendance', data)
  }

  // getAttendance():Observable<Attendance[]>{
  //   return this._http.get<Attendance[]>(this.url + '/attendance')
  // }

  // updateAttendanceByUser(id: number, data: any):Observable<Attendance>{
  //   return this._http.patch<Attendance>(this.url + '/attendance/' + id, data)
  // }

  //  NEW


  //---------------------------User-------------------------------------
  registerUser(data : any){
    return this._http.post(this.url + '/user/add', data)
  }

  getUser(search?:string, page?: number, pageSize?: number): Observable<User[]>{
    return this._http.get<User[]>(this.url + `/user/find/?search=${search}&page=${page}&pageSize=${pageSize}`);
  }

  getUserByName(search: string): Observable<User[]>{
    return this._http.get<User[]>(this.url + `/user/search/name/?search=${search}`)
  }

  getUserById(id: number):Observable<User>{
    return this._http.get<User>(this.url + '/user/findone/'+id)
  }

  getPaginatedUser(search:string, page: number, pageSize: number): Observable<User[]>{
    return this._http.get<User[]>(this.url + '/user/add/' + `?search=${search}&page=${page}&pageSize=${pageSize}`);
  }

  updateUser(id:number, data:any){
    return this._http.patch<User>(this.url+'/user/update/' + id, data);
  }

  deleteUser(id:Number){
    return this._http.delete(this.url+'/user/delete/'+id);
  }

  updateUserStatus(id: number, data: any){
    return this._http.patch<User>(this.url+'/user/statusupdate/' + id, data);
  }

  getUserByRole(id: number):Observable<User[]>{
    return this._http.get<User[]>(this.url + '/user/findbyrole/'+id)
  }

  // ROLE..........
  addRole(data: any) {
    return this._http.post(this.url + "/role", data);
  }

  getRole(filterValue?: string, page?: number, pagesize?:number): Observable<Role[]> {
    return this._http.get<Role[]>(this.url + `/role/find/?search=${filterValue}&page=${page}&pageSize=${pagesize}`);
  }

  deleteRole(id: number) {
    return this._http.delete(this.url + "/role/" + id);
  }
  updateRole(id: number, data: any): Observable<Role> {
    return this._http.patch<Role>(this.url + "/role/" + id, data);
  }
  getRoleById(id: number): Observable<Role> {
    return this._http.get<Role>(this.url + "/role/" + id);
  }

  getAttendance():Observable<Attendance[]>{
    return this._http.get<Attendance[]>(this.url + '/attendance')
  }

  updateAttendanceByUser(id: number, data: any):Observable<Attendance>{
    return this._http.patch<Attendance>(this.url + '/attendance/' + id, data)
  }
}
