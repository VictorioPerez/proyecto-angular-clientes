import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import Swal from 'sweetalert2';
import { TurneroService } from '../turnero.service';

@Component({
  selector: 'app-lista-tunero',
  templateUrl: './lista-tunero.component.html',
  styleUrls: ['./lista-tunero.component.css'],
})
export class ListaTuneroComponent implements OnInit {
  turnosArray: any[] = [];
  turnosAtendidos: any[] = []
  constructor(private restService: RestService, private turnoService:TurneroService) {}

  ngOnInit(): void {
    this.turnosArray = this.turnoService.getTurno();
    
    this.turnoService.turnos$.subscribe((turno) =>{
      this.turnosArray = turno
      this.getListClientes()
    })
  }

  getListClientes() {
    this.restService.getTurnos().subscribe((info: any) => {
      this.turnosArray = info;
      console.log(this.turnosArray);
    });
  }

  getListAtendidos() {
    this.restService.getClienteAtendido().subscribe((info: any) => {
      this.turnoService.agregarTurno(info);
    });
  }
  
  atender(turno: any) {
    Swal.fire({
      title:
        '¿Estás seguro de que deseas marcar como atendido al cliente con número de turno: ' +
        turno.nro_turno +
        '?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#308B45',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      
      if (result.isConfirmed) {                
      let index = this.turnosArray.findIndex((element) => element.id_solicitud === turno.id_solicitud);
      if (index !== -1) {
        this.turnosArray.splice(index, 1);
      }
        try {
          this.restService
            .putEstadoTurno(turno.id_solicitud)
            .subscribe((response) => {
              console.log('Cliente atendido:', response); 
   
            });
          Swal.fire({
            icon: 'success',
            title: 'Cliente atendido exitosamente!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
