import { Component, OnInit } from '@angular/core';
import { Entidad } from './entidad';
import { EntidadService } from './entidad.service';
import Swal from 'sweetalert2';
import { TipoDocumentoService } from '../tipo-documento-information/tipo-documento.service';
import { TipoDocumento } from '../tipo-documento-information/tipo-documento';
import { TipoContribuyenteService } from '../tipo-contribuyente-information/tipo-contribuyente.service';
import { TipoContribuyente } from '../tipo-contribuyente-information/tipo-contribuyente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-entidad',
  templateUrl: './lista-entidad.component.html'
})
export class ListaEntidadComponent implements OnInit {
  listaEntidad: Entidad[] | undefined;
  listaTipoDocumento: TipoDocumento[] | undefined;
  listaTipoContribuyente: TipoContribuyente[] | undefined;
  textoBuscar: string | undefined;
  paginas: number[] = [];
  isTotalPage:boolean | undefined;
  actualPage:number = 1;

  ngOnInit(): void {
    this.entidadService.getAllEntidadPage('1').subscribe(
      paginas => {
        this.tipoDocumentoService.getAllTipoDocumento().subscribe(
          listaTD => {
            this.tipoContribuyenteService.getAllTipoContribuyente().subscribe(
              listaTC => {
                this.isTotalPage = true;
                this.actualPage = 1;
                this.listaTipoContribuyente = listaTC;
                for (const [key, value] of Object.entries(paginas)) {
                  if(key=="content")
                    this.listaEntidad = value;
                  if(key=="totalPages"){
                      this.paginas=Array(value).fill(1).map((x,i)=>i+1);
                  }
                }
                this.listaTipoDocumento = listaTD;
              },
              error => {
                if (error['status'] == '403') {
                  this.alertaSinAutorizacion();
                }
              }
            );
          },
          error => {
            if (error['status'] == '403') {
              this.alertaSinAutorizacion();
            }
          }
        );
      },
      error => {
        if (error['status'] == '403') {
          this.alertaSinAutorizacion();
        }
      }
    );
  }

  constructor(private entidadService: EntidadService,
    private tipoDocumentoService: TipoDocumentoService,
    private tipoContribuyenteService: TipoContribuyenteService,
    private router: Router) {
  }

  public deleteEntity(entidad: Entidad): void {
    var id: string = entidad.idEntidad !== undefined ? entidad.idEntidad : '';
    if (id !== undefined) {
      Swal.fire({
        title: 'Está seguro que quiere eliminar la entidad?',
        text: `Se eliminará la entidad ${entidad.nroDocumento}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!',
      }).then((result) => {
        if (result.value) {
          this.entidadService.deleteEntidad(id).subscribe();
          this.ngOnInit();
        }
      });
    }
  }

  public buscarEntidadPage(page:number){
    this.entidadService.getAllEntidadPage(page.toString()).subscribe(
      paginas => {
        this.isTotalPage = true;
        this.actualPage = page;
        for (const [key, value] of Object.entries(paginas)) {
          if(key=="content")
            this.listaEntidad = value;
          if(key=="totalPages"){
              this.paginas=Array(value).fill(1).map((x,i)=>i+1);
          }
        }
      }
    );
  }

  public buscarTodosEntidad(){
    this.isTotalPage = true;
    this.ngOnInit();
  }

  public buscarEntidadPorDato() {
    var information = this.textoBuscar === undefined ? "" : this.textoBuscar;
    this.entidadService.getEntidadByInformation(information).subscribe(
      entidades => {
        this.listaEntidad = entidades;
        this.isTotalPage = false;
      },
      error => {
        if (error['status'] == '403') {
          this.alertaSinAutorizacion();
        }
      }
    );
  }

  private alertaSinAutorizacion() {
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
