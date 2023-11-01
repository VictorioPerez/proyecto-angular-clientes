import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css'],
})
export class ListaClientesComponent implements OnInit {
  clienteArray: any[] = [];
  clienteFiltro: any[] = [];
  nroDocumento: number = 0;
  listaFiltrada: boolean = false;

  constructor(
    private restService: RestService,
    private customerService: CustomerService
  ) {}

  getListClientes() {
    this.restService.getClientes().subscribe((info: any) => {
      this.clienteArray = info;
      this.clienteFiltro = [...info];
    });
  }

  borrarFiltro() {
    this.nroDocumento = 0;
    this.filtrarPersonas();
  }

  filtrarPersonas() {
    if (this.nroDocumento != 0) {
      this.clienteFiltro = this.clienteArray.filter((persona) => {
        return (
          persona.nro_doc &&
          persona.nro_doc.toString().includes(this.nroDocumento.toString())
        );
      });

      this.listaFiltrada = true;

      // if (this.nroDocumento == 0) {
      //   Swal.fire({
      //     icon: 'warning',
      //     title: 'El filtro de busqueda esta vacio',
      //     text: `Debe ingresar un número de doumento para poder aplicar el filtro`,
      //     confirmButtonText: 'Aceptar',
      //     confirmButtonColor: '#808080',
      //   });
      // }

      if (this.clienteFiltro.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No se encontraron clientes',
          text: `No se encontró ningún cliente con el número de documento: ${this.nroDocumento}`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    } else {
      this.clienteFiltro = [...this.clienteArray];
      this.listaFiltrada = false;
    }
  }

  ngOnInit(): void {
    this.clienteArray = this.customerService.getClientes();

    this.customerService.clientes$.subscribe((clientes) => {
      this.clienteArray = clientes;
      this.getListClientes();
    });

    this.customerService.clientes2$.subscribe((clientes) => {
      this.clienteArray = clientes;
      this.getListClientes();
    });
  }
}
