import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pregunta } from '../../models/pregunta.model';

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.scss'
})
export class PreguntaComponent {

  @Input() pregunta!: Pregunta;

}
