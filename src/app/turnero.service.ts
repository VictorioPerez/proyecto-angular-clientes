import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurneroService {

  constructor() {}
  private turneroSubject = new BehaviorSubject<any[]>([]);
  turnos$: Observable<any[]> = this.turneroSubject.asObservable();

  getTurno(): any[] {
    return this.turneroSubject.value;
  }
  agregarTurno(turno: any) {
    const turnos = this.turneroSubject.value;
    if (!Array.isArray(turnos)) {
      // Si turnos no es una matriz, inicialízala como una matriz vacía
      this.turneroSubject.next([turno]);
    } else {
      // Si ya es una matriz, simplemente agrega el turno a la matriz existente
      turnos.push(turno);
      this.turneroSubject.next(turnos);
    }
  }
  
}

  
