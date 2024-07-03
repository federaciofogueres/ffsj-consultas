import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Consulta } from '../../models/consulta.model';
import { Opcion } from '../../models/opcion.model';
import { Pregunta } from '../../models/pregunta.model';
import { Respuesta } from '../../models/respuesta.model';
import { OpcionesComponent } from '../opciones/opciones.component';
import { PreguntaComponent } from '../pregunta/pregunta.component';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    OpcionesComponent,
    PreguntaComponent
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaComponent {

  consulta: Consulta = {
    id: 0,
    preguntas: [
      {
        id: 1,
        titulo: '¿Cuál debe ser la foguera ejemplar 2024?',
        enunciado: 'Elige una de las candidatas',
        opciones: [
          { id: 1, respuesta: 'Florida Porrazo', active: true },
          { id: 2, respuesta: 'Antiguones', active: true },
          { id: 3, respuesta: 'La cerámica de Talavera', active: true }
        ]
      },
      {
        id: 2,
        titulo: '¿Cuál debe ser la foguera ejemplar infantil 2024?',
        enunciado: 'Elige una de las candidatas',
        opciones: [
          { id: 1, respuesta: 'Florida Portazgo', active: true },
          { id: 2, respuesta: 'Antiguones', active: true },
          { id: 3, respuesta: 'Antiguones en rojo', active: true }
        ]
      },
      {
        id: 3,
        titulo: '¿Cuál debe ser la barraca ejemplar 2024?',
        enunciado: 'Elige una de las candidatas',
        opciones: [
          { id: 1, respuesta: 'La millor de totes', active: true },
          { id: 2, respuesta: 'Los orangutanes', active: true },
          { id: 3, respuesta: 'El cabassot', active: true }
        ]
      }
    ],
    respuestas: []
  }
  preguntaActual: Pregunta = this.consulta.preguntas[0];

  cambiaPreguntaActual(indexPregunta: number) {
    this.preguntaActual = this.consulta.preguntas[indexPregunta];
  }

  guardaRespuesta(respuesta: Opcion) {
    console.log('Guardando respuesta', respuesta);
    let respuestaGuardada: Respuesta = {
      pregunta: this.preguntaActual,
      respuesta: respuesta
    }
    this.almacenarRespuesta(respuestaGuardada);
  }

  almacenarRespuesta(respuestaGuardada: Respuesta) {
    const indiceExistente = this.consulta.respuestas.findIndex(r => r.pregunta.id === respuestaGuardada.pregunta.id);
    if (indiceExistente !== -1) {
      this.consulta.respuestas.splice(indiceExistente, 1);
    }
    this.consulta.respuestas.push(respuestaGuardada);
  }

  onSlideChange(event: any) {
    const slideIndex = event.detail[0].activeIndex;
    const preguntaActual = this.consulta.preguntas[slideIndex];
  
    if (preguntaActual) { // Verifica que la pregunta exista para evitar errores.
      this.cambiaPreguntaActual(slideIndex);
      console.log('Pregunta actual -> ', this.preguntaActual.id);
    } else {
      console.error('No se encontró la pregunta para el slide actual');
    }
  }

}
