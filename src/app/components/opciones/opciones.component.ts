import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { OpcionRespuesta } from '../../../api';

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
  @Input() opciones: OpcionRespuesta[] = [];
  @Output() respuestaSeleccionada: EventEmitter<OpcionRespuesta> = new EventEmitter<OpcionRespuesta>();

  ngOnInit() {
    this.respuesta.valueChanges.subscribe((value: any) => {
      this.respuestaSeleccionada.emit(value);
    });
  }
  
}
