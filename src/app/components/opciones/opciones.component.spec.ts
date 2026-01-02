import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { OpcionesComponent } from './opciones.component';
import { OpcionRespuesta } from '../../../api';

describe('OpcionesComponent', () => {
  let component: OpcionesComponent;
  let fixture: ComponentFixture<OpcionesComponent>;

  const opciones: OpcionRespuesta[] = [
    { id: 1, idPregunta: 10, respuesta: 'A', active: true },
    { id: 2, idPregunta: 10, respuesta: 'B', active: true },
    { id: 3, idPregunta: 10, respuesta: 'C', active: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OpcionesComponent);
    component = fixture.componentInstance;
    component.idPregunta = 10;
    component.opciones = opciones;
  });

  it('emite una sola opcion cuando respuestasMaximas es 1', fakeAsync(() => {
    const emitted: any[] = [];
    component.respuestasMaximas = 1;
    component.respuestasSeleccionadas.subscribe(value => emitted.push(value));

    component.ngOnInit();
    component.respuesta.setValue(opciones[1]);
    flushMicrotasks();

    expect(emitted.length).toBeGreaterThanOrEqual(1);
    expect(emitted[emitted.length - 1].idPregunta).toBe(10);
    expect(emitted[emitted.length - 1].opciones).toEqual([opciones[1]]);
  }));

  it('limita la seleccion multiple segun respuestasMaximas', () => {
    const emitted: any[] = [];
    component.respuestasMaximas = 2;
    component.respuestasSeleccionadas.subscribe(value => emitted.push(value));

    component.toggleOpcion(opciones[0], true);
    component.toggleOpcion(opciones[1], true);

    expect(component.isDisabled(opciones[2])).toBeTrue();
    expect(emitted[emitted.length - 1].opciones.length).toBe(2);
  });

  it('preselecciona una opcion en preguntas simples', fakeAsync(() => {
    const emitted: any[] = [];
    component.respuestasMaximas = 1;
    component.preseleccionadas = [2];
    component.respuestasSeleccionadas.subscribe(value => emitted.push(value));

    component.ngOnInit();
    flushMicrotasks();

    expect(component.respuesta.value).toEqual(opciones[1]);
    expect(emitted[emitted.length - 1].opciones).toEqual([opciones[1]]);
  }));

  it('preselecciona opciones multiples respetando el limite', fakeAsync(() => {
    component.respuestasMaximas = 2;
    component.preseleccionadas = [1, 2, 3];

    component.ngOnInit();
    flushMicrotasks();

    expect(component.isSeleccionada(opciones[0])).toBeTrue();
    expect(component.isSeleccionada(opciones[1])).toBeTrue();
    expect(component.isSeleccionada(opciones[2])).toBeFalse();
  }));
});
