import { Component } from '@angular/core';
import { TipoDocumento } from './tipo-documento';
import { TipoDocumentoService } from './tipo-documento.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html'
})
export class TipoDocumentoComponent {
  statusNewDocumento:boolean = true;
  listaTipoDocumento:TipoDocumento[] | undefined;
  tipoDocumento:TipoDocumento = new TipoDocumento();

  public ngOnInit(): void {
      this.tipoDocumentoService.getAllTipoDocumento().subscribe(
        res => this.listaTipoDocumento = res,
        error => {
          if (error['status'] == '403') {
            this.alertaSinAutorizacion();
          }
        }
      )
  }

  constructor(private tipoDocumentoService:TipoDocumentoService){

  }

  public changeEditDocumento(){
    this.statusNewDocumento = false;
  }

  public changeNewDocumento(){
    this.statusNewDocumento = true;
    this.tipoDocumento = new TipoDocumento(); 
  }

  public changeTipoDocumento(tx:TipoDocumento){
    this.tipoDocumento = tx;
  }

  public updateTipoDocumento(){
    var idTipoDocumento: string = this.tipoDocumento.idTipoDocumento===undefined?'':this.tipoDocumento.idTipoDocumento;
    Swal.fire({
      title: 'Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No, guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoDocumentoService.updateTipoDocumento(idTipoDocumento,this.tipoDocumento)
        .subscribe(
         res => {
          Swal.fire('Guardado!', '', 'success')
          this.tipoDocumento = new TipoDocumento();
          this.ngOnInit()
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

  public agregarTipoDocumento(){
    this.tipoDocumento.estado = true;
    this.tipoDocumentoService.saveTipoDocumento(this.tipoDocumento)
    .subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Documento Guardado',
          showConfirmButton: false,
          timer: 1500
        });
        this.tipoDocumento = res;
        this.statusNewDocumento = false;
        this.ngOnInit();
      },
      error => {
        if (error['status'] == '403') {
          this.alertaSinAutorizacion();
        }
      }
    );
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
