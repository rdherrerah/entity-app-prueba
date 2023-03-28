import { Component, OnInit } from '@angular/core';
import { TipoContribuyente } from './tipo-contribuyente';
import { TipoContribuyenteService } from './tipo-contribuyente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tipo-contribuyente',
  templateUrl: './tipo-contribuyente.component.html'
})
export class TipoContribuyenteComponent implements OnInit{
  statusNewContribuyente:boolean = true;
  listaTipoContribuyente:TipoContribuyente[] | undefined;
  tipoContribuyente:TipoContribuyente = new TipoContribuyente();

  public ngOnInit(): void {
      this.tipoContribuyenteService.getAllTipoContribuyente().subscribe(
        res => this.listaTipoContribuyente = res,
        error => {
          if (error['status'] == '403') {
            this.alertaSinAutorizacion();
          }
        }
      )
  }

  constructor(private tipoContribuyenteService:TipoContribuyenteService){

  }

  public changeEditContribuyente(){
    this.statusNewContribuyente = false;
  }

  public changeNewContribuyente(){
    this.statusNewContribuyente = true;
    this.tipoContribuyente = new TipoContribuyente(); 
  }

  public changeTipoContribuyente(tx:TipoContribuyente){
    this.tipoContribuyente = tx;
  }

  public updateTipoContribuyente(){
    var idTipoContribuyente: string = this.tipoContribuyente.idTipoContribuyente===undefined?'':this.tipoContribuyente.idTipoContribuyente;
    Swal.fire({
      title: 'Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No, guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoContribuyenteService.updateTipoContribuyente(idTipoContribuyente,this.tipoContribuyente)
        .subscribe(
         res => {
          Swal.fire('Guardado!', '', 'success')
          this.tipoContribuyente = new TipoContribuyente();
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

  agregarTipoContribuyente(){
    this.tipoContribuyente.estado = true;
    this.tipoContribuyenteService.saveTipoContribuyente(this.tipoContribuyente)
    .subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Contribuyente Guardado',
          showConfirmButton: false,
          timer: 1500
        });
        this.tipoContribuyente = res;
        this.statusNewContribuyente = false;
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
