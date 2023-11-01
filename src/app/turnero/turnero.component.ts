import { Component, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { TurneroService } from '../turnero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-turnero',
  templateUrl: './turnero.component.html',
  styleUrls: ['./turnero.component.css'],
})
export class TurneroComponent {
  @ViewChild('generarTurnoForm', { static: false }) generarTurnoForm!: NgForm;
  @ViewChild('generarTurnoTemporalesForm', { static: false })
  generarTurnoTemporalesForm!: NgForm;

  mostrarFormTemporal: boolean = false;

  numeroDocumento: number = 0;

  clienteTemporal = {
    nombre: '',
    apellido: '',
    nroDoc: 0,
  };

  clienteRegistrado: any;
  turnoGenerado: any;
 

  constructor(private restService: RestService, private turnoService:TurneroService) {
  }

  verificarCliente() {
    if (this.numeroDocumento === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Número de documento inválido',
        text: 'El número de documento no puede ser 0. Por favor, ingrese un número válido.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      return;
    }

    this.restService.getClientes().subscribe((clientes) => {
      let clienteExiste = clientes.some(
        (cliente) => cliente.nroDoc == this.numeroDocumento
      );

      if (clienteExiste) {
        this.generarTurnoClienteRegistrado();
        this.generarTurnoForm.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Cliente no encontrado',
          text: 'El número de documento ingresado no corresponde a ningún cliente existente en la base de datos',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Registrar cliente temporal',
          cancelButtonColor: '#808080',
          confirmButtonColor: '#308B45',
        }).then((result) => {
          if (result.isConfirmed) {
            this.mostrarFormRegistrarClienteTemporal();
            this.clienteTemporal.nroDoc = this.numeroDocumento;
          } else if (result.isDismissed) {
          }
        });
      }
    });
  }

  mostrarFormRegistrarClienteTemporal() {
    this.mostrarFormTemporal = true;
  }

  generarTurnoClienteRegistrado() {
    let nroDoc = this.numeroDocumento;

    this.restService.generarTurnoClienteRegistrado(nroDoc).subscribe((turno) => {
        this.turnoGenerado = turno;
        Swal.fire({
          icon: 'success',
          title: 'Turno generado exitosamente!',
          text:
            'El número de turno para ' +
            this.turnoGenerado.cliente.nombre +
            ' ' +
            this.turnoGenerado.cliente.apellido +
            ' es: ' +
            this.turnoGenerado.nro_turno,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
        
        this.turnoService.agregarTurno(turno)
        
      });
  
  }

  generarTurnoClienteTemporal() {
    this.restService
      .generarTurnoClienteTemporal(this.clienteTemporal)
      .subscribe((turno) => {
        this.turnoGenerado = turno;
        console.log(this.turnoGenerado);
        this.turnoService.agregarTurno(turno)

        Swal.fire({
          icon: 'success',
          title: 'Turno generado exitosamente!',
          text:
            'El número de turno para ' +
            this.turnoGenerado.clienteTemporal.nombre +
            ' ' +
            this.turnoGenerado.clienteTemporal.apellido +
            ' es: ' +
            this.turnoGenerado.nro_turno,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });

        this.generarTurnoTemporalesForm.reset();
      });
  }

  cancelarGenerarTurnoTemporal() {
    this.mostrarFormTemporal = false;
  }
}
