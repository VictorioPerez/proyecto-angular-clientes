import { CustomerService } from './../customer.service';
import { Component, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { cliente } from '../cliente';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrls: ['./crear-clientes.component.css'],
})
export class CrearClientesComponent {
  @ViewChild('crearClienteForm', { static: false }) crearClienteForm!: NgForm;

  cliente = new cliente();

  constructor(
    private restService: RestService,
    private customerService: CustomerService
  ) {}

  crearCliente() {
    try {
      this.restService.postCliente(this.cliente).subscribe((response) => {
        console.log('Cliente creado con éxito', response);
        this.crearClienteForm.reset();
        this.customerService.agregarCliente(this.cliente);
      });

      Swal.fire({
        icon: 'success',
        title: 'Cliente creado con exito!',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el cliente: ' + error,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      console.log('error: ' + error);
    }
  }
}
