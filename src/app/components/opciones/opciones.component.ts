import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { OpcionRespuesta } from '../../../api';

export interface OpcionesSeleccionadasEvent {
  idPregunta: number;
  opciones: OpcionRespuesta[];
}

@Component({
    selector: 'app-opciones',
    imports: [
        MatCheckboxModule,
        MatRadioModule,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './opciones.component.html',
    styleUrl: './opciones.component.scss'
})
export class OpcionesComponent implements OnChanges {

  public respuesta = new FormControl<OpcionRespuesta | null>(null);
  @Input() opciones: OpcionRespuesta[] = [];
  @Input() respuestasMaximas: number = 1;
  @Input() idPregunta: number = 0;
  @Input() preseleccionadas: number[] = [];
  @Output() respuestasSeleccionadas: EventEmitter<OpcionesSeleccionadasEvent> = new EventEmitter<OpcionesSeleccionadasEvent>();
  private seleccionadasIds = new Set<number>();
  private initialized = false;

  ngOnInit() {
    this.respuesta.valueChanges.subscribe((value) => {
      const opciones = value ? [value] : [];
      this.respuestasSeleccionadas.emit({ idPregunta: this.idPregunta, opciones });
    });
    this.initialized = true;
    this.applyPreseleccion(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['preseleccionadas'] || changes['opciones'] || changes['respuestasMaximas']) {
      this.applyPreseleccion(this.initialized);
    }
  }

  esMultiple(): boolean {
    return (this.respuestasMaximas || 1) > 1;
  }

  isSeleccionada(opcion: OpcionRespuesta): boolean {
    return this.seleccionadasIds.has(opcion.id);
  }

  isDisabled(opcion: OpcionRespuesta): boolean {
    if (this.isSeleccionada(opcion)) {
      return false;
    }
    return this.seleccionadasIds.size >= (this.respuestasMaximas || 1);
  }

  toggleOpcion(opcion: OpcionRespuesta, checked: boolean): void {
    if (checked) {
      this.seleccionadasIds.add(opcion.id);
    } else {
      this.seleccionadasIds.delete(opcion.id);
    }
    this.emitirSeleccionMultiple();
  }

  private emitirSeleccionMultiple(): void {
    const opciones = this.opciones.filter(opcion => this.seleccionadasIds.has(opcion.id));
    this.respuestasSeleccionadas.emit({ idPregunta: this.idPregunta, opciones });
  }

  private applyPreseleccion(emitir: boolean): void {
    const maximo = this.respuestasMaximas && this.respuestasMaximas > 0 ? this.respuestasMaximas : 1;
    const ids = Array.isArray(this.preseleccionadas) ? this.preseleccionadas : [];

    if (this.esMultiple()) {
      this.seleccionadasIds.clear();
      const idsFiltrados = ids
        .filter(id => this.opciones.some(opcion => opcion.id === id))
        .slice(0, maximo);
      idsFiltrados.forEach(id => this.seleccionadasIds.add(id));
      if (emitir) {
        Promise.resolve().then(() => this.emitirSeleccionMultiple());
      }
      return;
    }

    const seleccionada = this.opciones.find(opcion => opcion.id === ids[0]) || null;
    this.respuesta.setValue(seleccionada, { emitEvent: false });
    if (emitir) {
      Promise.resolve().then(() => {
        if (seleccionada) {
          this.respuesta.setValue(seleccionada, { emitEvent: true });
        }
      });
    }
  }
  
}
