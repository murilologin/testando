import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosVisualizarComponent } from './usuarios-visualizar.component';

describe('UsuariosVisualizarComponent', () => {
  let component: UsuariosVisualizarComponent;
  let fixture: ComponentFixture<UsuariosVisualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosVisualizarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
