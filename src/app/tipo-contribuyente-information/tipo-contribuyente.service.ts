import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TipoContribuyente } from './tipo-contribuyente';

@Injectable()
export class TipoContribuyenteService {
  private urlEndpoint:string = "http://localhost:8080/api/tipoContribuyente";
  private httpHeader:HttpHeaders = new HttpHeaders({'Content-Type':'application/json',
                                                    'Access-Control-Allow-Origin':'*',
                                                    "Authorization":"Bearer "+localStorage.getItem("accessToken")})
  constructor(private http:HttpClient){

  }
  public getAllTipoContribuyente():Observable<TipoContribuyente[]>{
    return this.http.get<TipoContribuyente[]>(this.urlEndpoint,{headers:this.httpHeader}).pipe(
      map(res => res as TipoContribuyente[])
    );
  }

  public updateTipoContribuyente(idTipoContribuyente:string,tipoContribuyente:TipoContribuyente):Observable<TipoContribuyente>{
    return this.http.post<TipoContribuyente>(this.urlEndpoint+'/update/'+idTipoContribuyente,tipoContribuyente,{headers:this.httpHeader})
  }

  public saveTipoContribuyente(tipoContribuyente:TipoContribuyente){
    return this.http.put<TipoContribuyente>(this.urlEndpoint+'/add',tipoContribuyente,{headers:this.httpHeader});
  }
}
