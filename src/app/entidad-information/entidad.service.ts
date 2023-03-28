import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AsyncSubject, map, Observable } from 'rxjs';
import { Entidad } from './entidad';

@Injectable()
export class EntidadService{
  private urlEndpoint:string = "http://localhost:8080/api/entidad";
  private httpHeader:HttpHeaders = new HttpHeaders({'Content-Type':'application/json',
  'Access-Control-Allow-Origin':'*',
  "Authorization":"Bearer "+localStorage.getItem("accessToken")});;

  constructor(private http:HttpClient, private router:Router){
  }

  public getAllEntidad(): Observable<Entidad[]>{
    return this.http.get<Entidad[]>(this.urlEndpoint,{headers:this.httpHeader}).pipe(
      map(res => res as Entidad[])
    );
  }

  public getAllEntidadPage(page:string): Observable<Object>{
    return this.http.get<Object[]>(this.urlEndpoint+'/page/'+page,{headers:this.httpHeader}).pipe(
      map(res => res as Object)
    );
  }

  public getEntidadById(id:string): Observable<Entidad>{
    return this.http.get<Entidad>(this.urlEndpoint+'/find/'+id,{headers:this.httpHeader}).pipe(
      map(res => res as Entidad)
    );
  }

  public getEntidadByNroDocumento(nroDocumento:string): Observable<Entidad>{
    return this.http.get<Entidad>(this.urlEndpoint+'/find/documento/'+nroDocumento,{headers:this.httpHeader}).pipe(
      map(res => res as Entidad)
    );
  }

  public getEntidadByInformation(information:string): Observable<Entidad[]>{
    return this.http.get<Entidad[]>(this.urlEndpoint+'/find/information/'+information,{headers:this.httpHeader}).pipe(
      map(res => res as Entidad[])
    );
  }

  public updateEntidadById(id:string,entidad:Entidad): Observable<Entidad>{
    return this.http.post<Entidad>(this.urlEndpoint+'/update/'+id,entidad,{headers:this.httpHeader}).pipe(
      map(res => res as Entidad)
    );
  }

  public saveEntidad(entidad:Entidad): Observable<Entidad>{
    entidad.estado = true;
    return this.http.put<Entidad>(this.urlEndpoint+'/add',entidad,{headers:this.httpHeader}).pipe(
      map(res => res as Entidad)
    );
  }

  public deleteEntidad(id:string){
    return this.http.delete(this.urlEndpoint+'/delete/'+id,{headers:this.httpHeader});
  }
}
