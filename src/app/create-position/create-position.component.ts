import { Component, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CargoService } from '../cargo.service';

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css'],
})
export class CreatePositionComponent {
  @ViewChild('crearCargoForm', { static: false }) crearCargoForm!: NgForm;

  cargoBody = {
    descripcion: '',
  };

  constructor(private restService: RestService , private cargoService: CargoService) {}

  crearCargo() {
    this.restService.postCargo(this.cargoBody).subscribe(
      (response) => {
        console.log('Cargo creado con éxito', response);

        // Limpia el input de cargo
        this.cargoBody = {
          descripcion: '',
        };

        this.crearCargoForm.reset();
        this.cargoService.agregarCargo(this.cargoBody)
        // this.userService.agregarCargo(this.cargoBody);

        Swal.fire({
          icon: 'success',
          title: 'Cargo creado con exito!',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el cargo',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
        console.log('error: ' + error);
      }
    );
  }
}