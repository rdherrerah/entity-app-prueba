import { Component, OnInit } from '@angular/core';
import { Entidad } from './entidad';
import { EntidadService } from './entidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-entidad',
  templateUrl: './lista-entidad.component.html'
})
export class ListaEntidadComponent implements OnInit{
  listaEntidad: Entidad[] | undefined;

  ngOnInit(): void {
    this.entidadService.getAllEntidad().subscribe(
      entidades => this.listaEntidad = entidades
    )
  }

  constructor(private entidadService:EntidadService){
  }

  deleteEntity(entidad:Entidad):void{
    var id:string = entidad.idEntidad!==undefined?entidad.idEntidad:'';
    if(id!==undefined){
      Swal.fire({
        title: 'Está seguro que quiere eliminar la entidad?',
        text: `Se eliminará la entidad ${entidad.idEntidad}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!',
      }).then((result) => {
        if (result.value) {
          this.entidadService.deleteEntidad(id).subscribe();
          this.entidadService.getAllEntidad().subscribe(
            entidades => {
              this.listaEntidad = entidades;
            }
          )
        }
      });
    }
  }

}
