import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearClientesComponent } from './crear-clientes.component';

describe('CrearClientesComponent', () => {
  let component: CrearClientesComponent;
  let fixture: ComponentFixture<CrearClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearClientesComponent]
    });
    fixture = TestBed.createComponent(CrearClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
