import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { TurneroService } from '../turnero.service';

@Component({
  selector: 'app-lista-clientes-atendidos',
  templateUrl: './lista-clientes-atendidos.component.html',
  styleUrls: ['./lista-clientes-atendidos.component.css']
})
export class ListaClientesAtendidosComponent implements OnInit {
  turnosAtendidos: any[] = [];

  constructor(private restService: RestService, private turnoService:TurneroService) {}

  ngOnInit(): void {
    this.turnoService.turnos$.subscribe((turnos: any[]) => {
      this.turnosAtendidos = turnos;
    });
    this.getListAtendidos()
  }
  
  getListAtendidos() {
    this.restService.getClienteAtendido().subscribe((info: any) => {
      this.turnoService.agregarTurno(info);
    });
  }


  
}
