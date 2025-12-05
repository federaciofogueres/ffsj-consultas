import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pregunta } from '../../../api';

@Component({
    selector: 'app-pregunta',
    imports: [
        CommonModule
    ],
    templateUrl: './pregunta.component.html',
    styleUrl: './pregunta.component.scss'
})
export class PreguntaComponent {

  @Input() pregunta!: Pregunta;

}
