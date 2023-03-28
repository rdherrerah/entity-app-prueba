import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entidad } from './entidad';
import { EntidadService } from './entidad.service';
import Swal from 'sweetalert2'
import { TipoDocumentoService } from '../tipo-documento-information/tipo-documento.service';
import { TipoContribuyenteService } from '../tipo-contribuyente-information/tipo-contribuyente.service';
import { TipoDocumento } from '../tipo-documento-information/tipo-documento';
import { TipoContribuyente } from '../tipo-contribuyente-information/tipo-contribuyente';

@Component({
  selector: 'app-entidad-form',
  templateUrl: './entidad-form.component.html'
})
export class EntidadFormComponent implements OnInit {
  entidad: Entidad = new Entidad();
  textoBuscar: string = "";
  statusNewEntity: boolean =true;
  listaTipoDocumento: TipoDocumento[] | undefined;
  listaTipoContribuyente: TipoContribuyente[] | undefined;

  constructor(private entidadService: EntidadService,
              private tipoDocumentoService: TipoDocumentoService,
              private tipoContribuyenteService: TipoContribuyenteService,
              private rutaActiva: ActivatedRoute,
              private router:Router) {

  }

  ngOnInit(): void {
    var id = this.rutaActiva.snapshot.params['id']
    if (id !== '0') {
      this.entidadService.getEntidadById(id)
        .subscribe(
          res => {this.entidad = res},
          error => {
            if (error['status'] == '403') {
              this.alertaSinAutorizacion();
            }
          }
        );
      this.statusNewEntity = false;
    }else{
      this.entidad = new Entidad();
      this.statusNewEntity = true;
    }
    this.tipoDocumentoService.getAllTipoDocumento().subscribe(
      lista => {this.listaTipoDocumento = lista},
      error => {
        if (error['status'] == '403') {
          this.alertaSinAutorizacion();
        }
      }
    );
    this.tipoContribuyenteService.getAllTipoContribuyente().subscribe(
      lista => {this.listaTipoContribuyente = lista},
      error => {
        if (error['status'] == '403') {
          this.alertaSinAutorizacion();
        }
      }
    );
  }

  buscarEntidadPorDocumento(){
    this.entidadService.getEntidadByNroDocumento(this.textoBuscar)
    .subscribe(
      res => {this.entidad=res},
      error => {
        if (error['status'] == '403') {
          this.alertaSinAutorizacion();
        }
      }
    )
  }

  agregarEntidad(){
    this.entidadService.saveEntidad(this.entidad)
    .subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Entidad Guardada',
          showConfirmButton: false,
          timer: 1500
        });
        this.entidad = new Entidad();
        this.router.navigate(['/listaEntidad']);
      },
      error => {
        if (error['status'] == '403') {
          this.alertaSinAutorizacion();
        }
      }
    );
  }

  updateEntidad(){
    var idEntidad: string = this.entidad.idEntidad===undefined?'':this.entidad.idEntidad;
    Swal.fire({
      title: 'Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No, guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.entidadService.updateEntidadById(idEntidad,this.entidad)
        .subscribe(
         res => {
          Swal.fire('Guardado!', '', 'success')
          this.entidad = new Entidad();
          this.router.navigate(['/listaEntidad']);
         },
         error => {
           if (error['status'] == '403') {
             this.alertaSinAutorizacion();
           }
         }
        );
      } else if (result.isDenied) {
        Swal.fire('Cambios canceladostunome', '', 'info')
      }
    })
  }

  changeStatusNewEntity(){
    this.statusNewEntity = true;
    if(this.statusNewEntity)
      this.entidad = new Entidad();
  }
  changeStatusOldEntity(){
    this.statusNewEntity = false;
  }

  alertaSinAutorizacion() {
    Swal.fire({
      title: 'Tiempo de conexión!',
      text: "Para continuar navegando puedes volver a iniciar sesion",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Iniciar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        
        // this.router.navigate(['/loginForm']);
      }
    })
  }

}
