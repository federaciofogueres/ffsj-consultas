import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, FfsjSpinnerComponent } from 'ffsj-web-components';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { Consulta, ConsultasService, OpcionRespuesta, ResponseConsulta, ResponseStatus, RespuestasUsuariosService, RespuestaUsuario } from '../../../api';
import { OpcionesComponent } from '../opciones/opciones.component';
import { PreguntaComponent } from '../pregunta/pregunta.component';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    OpcionesComponent,
    PreguntaComponent,
    FfsjSpinnerComponent
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaComponent {

  loading: boolean = false;

  idUsuario: number = -1;
  consulta: Consulta = {
    id: 0,
    fecha: '',
    titulo: '',
    votosTotales: 0,
    preguntas: []
  }
  respuestas: RespuestaUsuario[] = [];

  constructor(
    private consultasService: ConsultasService,
    private cookiesService: CookieService,
    private respuestasUsuariosService: RespuestasUsuariosService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.loading = true;
    this.getIdUsuario();
    const consultaId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.consultasService.consultasIdGet(consultaId).subscribe({
      next: (response: ResponseConsulta) => {
        console.log(response);
        if (response.status.status === 200) {
          console.log(this.idUsuario);
          
          this.consulta = response.consulta;
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error al obtener la consulta -> ', error);
      }
    })
  }

  getIdUsuario() {
    const decodedToken: any = jwtDecode(this.authService.getToken());
    this.idUsuario = decodedToken.id;
  }

  guardaRespuesta(respuesta: OpcionRespuesta) {
    console.log('Guardando respuesta', respuesta);
    let respuestaUsuario: RespuestaUsuario = {
      id: 0,
      idAsociado: this.idUsuario,
      idPregunta: respuesta.idPregunta,
      idOpcionRespuesta: respuesta.id
    }
    this.almacenarRespuesta(respuestaUsuario)
  }

  almacenarRespuesta(respuestaUsuario: RespuestaUsuario) {
    const indiceExistente = this.respuestas.findIndex(r => r.idPregunta === respuestaUsuario.idPregunta);
    if (indiceExistente !== -1) {
      this.respuestas.splice(indiceExistente, 1);
    }
    this.respuestas.push(respuestaUsuario);
  }

  enviarRespuestas() {
    console.log('Enviando respuestas -> ', this.respuestas);
    const promesasDeEnvio = this.respuestas.map(respuesta => 
      new Promise((resolve, reject) => {
        this.respuestasUsuariosService.respuestasUsuariosPost(respuesta).subscribe({
          next: (response: ResponseStatus) => {
            console.log('Respuestas enviadas -> ', response);
            resolve(response);
          },
          error: (error) => {
            console.error('Error al enviar las respuestas -> ', error);
            reject(error);
          }
        });
      })
    );
  
    Promise.all(promesasDeEnvio).then(() => {
      this.redireccionar();
    }).catch(error => {
      console.error('Error en el envío de alguna respuesta', error);
    });
  }
  
  redireccionar() {
    if (Boolean(this.cookiesService.get('href'))) {
      window.location.href = this.cookiesService.get('href');
    } else {
      console.log('No se ha encontrado la URL de redirección');
    }
  }

}
