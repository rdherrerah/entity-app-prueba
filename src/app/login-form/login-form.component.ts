import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit{
  usuario:Usuario = new Usuario();

  ngOnInit(): void {
  }

  constructor(private usuarioService:UsuarioService){

  }
  public login(){
    this.usuarioService.getJwt(this.usuario);
  }

}
