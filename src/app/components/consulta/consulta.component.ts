import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, FfsjAlertService, FfsjSpinnerComponent } from 'ffsj-web-components';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { AutorizacionesConsultasService, Consulta, ConsultasService, OpcionRespuesta, ResponseConsulta, ResponseStatus, RespuestasUsuariosService, RespuestaUsuario } from '../../../api';
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
  asistencias: any[] = [];
  asistenciasAutorizadas: any[] = [];
  consulta: Consulta = {
    id: 0,
    fecha: '',
    titulo: '',
    votosTotales: 0,
    preguntas: []
  }
  respuestas: RespuestaUsuario[] = [];
  respuestasTotales: number = 0;

  constructor(
    private consultasService: ConsultasService,
    private cookiesService: CookieService,
    private respuestasUsuariosService: RespuestasUsuariosService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private ffsjAlertService: FfsjAlertService,
    private autorizacionesConsultasService: AutorizacionesConsultasService,
    private router: Router
  ){}

  ngOnInit() {
    this.loading = true;
    this.getIdUsuario();
    this.getAsistencias();
    const consultaId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.checkUserAuthorization(consultaId);
  }

  getAsistencias() {
    this.asistencias = JSON.parse(this.cookiesService.get('asistencias'));
    console.log(this.asistencias);
  }

  checkUserAuthorization(consultaId: number) {
    const promises = this.asistencias.map(asistencia => {
      return this.autorizacionesConsultasService.consultasIdConsultaAutorizadosIdAsistenciaGet(consultaId, asistencia).toPromise();
    });

    Promise.all(promises)
      .then(responses => {
        let hasError = false;
        responses.forEach((response: any) => {
          if (response!.status.status !== 200 || response!.autorizaciones === 0) {
            hasError = true;
          } else {
            this.asistenciasAutorizadas.push(response.autorizaciones[0].idAsistencia);
          }
        });
        const cantidadVotos = this.asistenciasAutorizadas.length;
        if (hasError) {
          if (cantidadVotos === 0) {
            this.ffsjAlertService.danger('No tienes permisos para ver esta consulta');
            this.router.navigateByUrl('/consultas');
          } else if (cantidadVotos > 0) {
            this.ffsjAlertService.warning('No tienes todos los votos autorizados. Puedes votar con ' + cantidadVotos + ' votos en total.');
          }
        } else {
          this.ffsjAlertService.success('Puedes votar en esta consulta con ' + cantidadVotos + ' voto(s).');
          this.loadConsultaInfo(consultaId);
        }
      })
      .catch(error => {
        console.error('Error al obtener la consulta -> ', error);
        this.ffsjAlertService.danger('No tienes permisos para ver esta consulta');
        this.router.navigateByUrl('/consultas');
      });
  }

  loadConsultaInfo(consultaId: number) {
    this.consultasService.consultasIdGet(consultaId).subscribe({
      next: (response: ResponseConsulta) => {
        console.log(response);
        if (response.status.status === 200) {
          console.log(this.idUsuario);
          
          this.consulta = response.consulta;
          this.consulta.preguntas.forEach(pregunta => {
            pregunta.opcionesRespuestas.sort((a, b) => a.respuesta.localeCompare(b.respuesta));
          });
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
    this.asistenciasAutorizadas.forEach(asistencia => {
      let respuestaUsuario: RespuestaUsuario = {
        id: 0,
        idAsistencia: asistencia,
        idPregunta: respuesta.idPregunta,
        idOpcionRespuesta: respuesta.id
      }
      this.almacenarRespuesta(respuestaUsuario)
    });
    const preguntasUnicas = new Set(this.respuestas.map(r => r.idPregunta));
    this.respuestasTotales = preguntasUnicas.size;
  }

  almacenarRespuesta(respuestaUsuario: RespuestaUsuario) {
    const indiceExistente = this.respuestas.findIndex(r => r.idPregunta === respuestaUsuario.idPregunta && r.idAsistencia === respuestaUsuario.idAsistencia);
    if (indiceExistente !== -1) {
      this.respuestas.splice(indiceExistente, 1);
    }
    this.respuestas.push(respuestaUsuario);
  }

  enviarRespuestas() {
    this.loading = true;
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
      this.ffsjAlertService.success('Respuestas enviadas correctamente');
      this.redireccionar();
    }).catch(error => {
      console.error('Error en el envío de alguna respuesta', error);
      this.ffsjAlertService.danger(error.error);

    });
  }
  
  redireccionar() {
    if (Boolean(this.cookiesService.get('href'))) {
      window.location.href = this.cookiesService.get('href');
    } else {
      console.log('No se ha encontrado la URL de redirección');
      this.ffsjAlertService.info('Respuesta guardada correctamente. No se ha encontrado la URL de redirección.');
      window.location.href = this.cookiesService.get('https://consultas.hogueras.es');
    }
  }

}
