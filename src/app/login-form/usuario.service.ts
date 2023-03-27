import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Usuario } from './usuario';
import { map, Observable } from 'rxjs';

@Injectable()
export class UsuarioService {
  private urlEndpoint:string = "http://localhost:8080/jwt";
  private httpHeader:HttpHeaders = new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'*'})

  constructor(private http:HttpClient){

  }

  public getJwt(usuario: Usuario):Observable<Object>{
    return this.http.post<Object>(this.urlEndpoint,usuario,{headers:this.httpHeader})
    .pipe(
      map(res => res as Object)
    );
  }

}
