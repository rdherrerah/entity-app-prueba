import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {
  private urlEndpoint:string = "http://localhost:8080/jwt";
  private httpHeader:HttpHeaders = new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'*'})

  constructor(private http:HttpClient, private router:Router){

  }

  public getJwt(usuario: Usuario){
    // console.log(usuario.pswd+" "+usuario.user);
    var res = this.http.post(this.urlEndpoint,usuario,{headers:this.httpHeader})
    .subscribe(
      response => {
        localStorage.setItem("accessToken",Object.values(response)[0]);
        this.router.navigate(['/listaEntidad']);
    });
  }

}
