import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TipoDocumento } from './tipo-documento';

@Injectable()
export class TipoDocumentoService {
  private urlEndpoint:string = "http://localhost:8080/api/tipoDocumento";
  private httpHeader:HttpHeaders = new HttpHeaders({'Content-Type':'application/json',
                                                    'Access-Control-Allow-Origin':'*',
                                                    "Authorization":"Bearer "+localStorage.getItem("accessToken")})
  constructor(private http:HttpClient){

  }
  public getAllTipoDocumento():Observable<TipoDocumento[]>{
    return this.http.get<TipoDocumento[]>(this.urlEndpoint,{headers:this.httpHeader}).pipe(
      map(res => res as TipoDocumento[])
    );
  }

  public updateTipoDocumento(idTipoDocumento:string,tipoDocumento:TipoDocumento):Observable<TipoDocumento>{
    return this.http.post<TipoDocumento>(this.urlEndpoint+'/update/'+idTipoDocumento,tipoDocumento,{headers:this.httpHeader});
  }

  public saveTipoDocumento(tipoDocumento:TipoDocumento){
    return this.http.put<TipoDocumento>(this.urlEndpoint+'/add',tipoDocumento,{headers:this.httpHeader});
  }
}
