import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Opcion } from '../../models/opcion.model';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.scss'
})
export class OpcionesComponent {

  public respuesta = new FormControl('');
  @Input() opciones: Opcion[] = [];
  @Output() respuestaSeleccionada: EventEmitter<Opcion> = new EventEmitter<Opcion>();

  ngOnInit() {
    this.respuesta.valueChanges.subscribe((value) => {
      this.respuestaSeleccionada.emit(value as Opcion);
    });
  }
  
}
