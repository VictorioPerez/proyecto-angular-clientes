import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClientesAtendidosComponent } from './lista-clientes-atendidos.component';

describe('ListaClientesAtendidosComponent', () => {
  let component: ListaClientesAtendidosComponent;
  let fixture: ComponentFixture<ListaClientesAtendidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaClientesAtendidosComponent]
    });
    fixture = TestBed.createComponent(ListaClientesAtendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
