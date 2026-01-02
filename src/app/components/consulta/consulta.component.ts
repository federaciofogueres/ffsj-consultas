import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, FfsjAlertService, FfsjSpinnerComponent } from 'ffsj-web-components';
import { jwtDecode } from "jwt-decode";
import { firstValueFrom } from 'rxjs';
import { AutorizacionesConsultasService, Consulta, ConsultasService, ResponseConsulta, ResponseMisRespuestas, ResponseStatus, RespuestasUsuariosService, RespuestaUsuario } from '../../../api';
import { OpcionesComponent, OpcionesSeleccionadasEvent } from '../opciones/opciones.component';
import { PreguntaComponent } from '../pregunta/pregunta.component';
import { ConsultasExtraService } from '../../services/consultas-extra.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'app-consulta',
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
  totalPreguntasObligatorias: number = 0;
  respuestasPrevias: Record<number, number[]> = {};
  tieneRespuestasPrevias: boolean = false;
  tieneDiscrepancias: boolean = false;

  constructor(
    private consultasService: ConsultasService,
    private respuestasUsuariosService: RespuestasUsuariosService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private ffsjAlertService: FfsjAlertService,
    private autorizacionesConsultasService: AutorizacionesConsultasService,
    private router: Router,
    private consultasExtraService: ConsultasExtraService,
    private navigationService: NavigationService
  ){}

  ngOnInit() {
    this.loading = true;
    this.captureReturnUrl();
    this.captureAsistencias();
    this.getIdUsuario();
    const consultaId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.checkUserAuthorization(consultaId);
  }

  async checkUserAuthorization(consultaId: number) {
    try {
      this.asistenciasAutorizadas = [];
      this.asistencias = await this.resolveAsistencias(consultaId);
      if (this.asistencias.length === 0) {
        this.ffsjAlertService.danger('No tienes permisos para ver esta consulta');
        this.router.navigateByUrl('/consultas');
        this.loading = false;
        return;
      }

      const responses = await Promise.all(
        this.asistencias.map(asistencia =>
          firstValueFrom(this.autorizacionesConsultasService.consultasIdConsultaAutorizadosIdAsistenciaGet(consultaId, asistencia))
        )
      );

      let hasError = false;
      responses.forEach((response: any) => {
        if (response.status.status !== 200 || response.autorizaciones === 0) {
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
          this.loading = false;
        } else if (cantidadVotos > 0) {
          this.ffsjAlertService.warning('No tienes todos los votos autorizados. Puedes votar con ' + cantidadVotos + ' votos en total.');
          this.loadConsultaInfo(consultaId);
        }
      } else {
        this.ffsjAlertService.success('Puedes votar en esta consulta con ' + cantidadVotos + ' voto(s).');
        this.loadConsultaInfo(consultaId);
      }
    } catch (error) {
      console.error('Error al obtener la consulta -> ', error);
      this.ffsjAlertService.danger('No tienes permisos para ver esta consulta');
      this.router.navigateByUrl('/consultas');
      this.loading = false;
    }
  }

  loadConsultaInfo(consultaId: number) {
    this.consultasService.consultasIdGet(consultaId).subscribe({
      next: (response: ResponseConsulta) => {
        console.log(response);
        if (response.status.status === 200) {
          console.log(this.idUsuario);
          
          this.consulta = response.consulta;
          this.respuestasPrevias = {};
          this.tieneRespuestasPrevias = false;
          this.tieneDiscrepancias = false;
          this.consulta.preguntas.forEach(pregunta => {
            pregunta.opcionesRespuestas.sort((a, b) => a.respuesta.localeCompare(b.respuesta));
          });
          this.totalPreguntasObligatorias = this.consulta.preguntas.filter(pregunta => pregunta.obligatoria).length;
          this.loadRespuestasPrevias(consultaId).finally(() => {
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error al obtener la consulta -> ', error);
        this.loading = false;
      }
    })
  }

  getIdUsuario() {
    const decodedToken: any = jwtDecode(this.authService.getToken());
    this.idUsuario = decodedToken.id;
  }

  guardaRespuestas(event: OpcionesSeleccionadasEvent) {
    const idPregunta = event.idPregunta;
    const opcionesSeleccionadas = event.opciones ?? [];
    this.asistenciasAutorizadas.forEach(asistencia => {
      this.respuestas = this.respuestas.filter(
        respuesta => !(respuesta.idPregunta === idPregunta && respuesta.idAsistencia === asistencia)
      );
      opcionesSeleccionadas.forEach(opcion => {
        const respuestaUsuario: RespuestaUsuario = {
          id: 0,
          idAsistencia: asistencia,
          idPregunta: opcion.idPregunta,
          idOpcionRespuesta: opcion.id
        };
        this.respuestas.push(respuestaUsuario);
      });
    });
    this.actualizarRespuestasTotales();
  }

  private actualizarRespuestasTotales() {
    const idsObligatorias = new Set(
      this.consulta.preguntas.filter(pregunta => pregunta.obligatoria).map(pregunta => pregunta.id)
    );
    const preguntasRespondidas = new Set(
      this.respuestas.map(respuesta => respuesta.idPregunta).filter(id => idsObligatorias.has(id))
    );
    this.respuestasTotales = preguntasRespondidas.size;
  }

  enviarRespuestas() {
    this.loading = true;
    console.log('Enviando respuestas -> ', this.respuestas);
    const agrupadas = new Map<string, { idAsistencia: number; idPregunta: number; opciones: number[] }>();
    this.respuestas.forEach((respuesta) => {
      const opciones = Array.isArray(respuesta.idOpcionRespuesta)
        ? respuesta.idOpcionRespuesta
        : [respuesta.idOpcionRespuesta];
      const key = `${respuesta.idAsistencia}-${respuesta.idPregunta}`;
      const existing = agrupadas.get(key);
      if (!existing) {
        agrupadas.set(key, {
          idAsistencia: respuesta.idAsistencia,
          idPregunta: respuesta.idPregunta,
          opciones: [...opciones]
        });
        return;
      }
      existing.opciones.push(...opciones);
    });

    const promesasDeEnvio = Array.from(agrupadas.values()).map(grupo => 
      new Promise((resolve, reject) => {
        const payload = {
          id: 0,
          idAsistencia: grupo.idAsistencia,
          idPregunta: grupo.idPregunta,
          idOpcionRespuesta: Array.from(new Set(grupo.opciones))
        };
        this.respuestasUsuariosService.respuestasUsuariosPost(payload as RespuestaUsuario).subscribe({
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
      this.loading = false;

    });
  }
  
  redireccionar() {
    const returnUrl = this.consultasExtraService.getReturnUrlOrFallback('/consultas');
    if (this.consultasExtraService.isExternalUrl(returnUrl)) {
      this.navigationService.navigateExternal(returnUrl);
      return;
    }
    this.router.navigateByUrl(returnUrl);
  }

  private async loadRespuestasPrevias(consultaId: number) {
    if (this.asistenciasAutorizadas.length === 0) {
      return;
    }
    try {
      const idAsociado = this.consultasExtraService.getIdUsuario();
      const response: ResponseMisRespuestas = await firstValueFrom(
        this.consultasService.consultasIdConsultaRespuestasUsuariosGet(consultaId, this.asistenciasAutorizadas, idAsociado > 0 ? idAsociado : undefined)
      );
      if (response.status.status !== 200 || !response.misRespuestas) {
        return;
      }
      this.applyRespuestasPrevias(response.misRespuestas);
    } catch (error) {
      console.error('Error al cargar respuestas previas -> ', error);
    }
  }

  private applyRespuestasPrevias(misRespuestas: { hasPrevias: boolean; respuestas: { idPregunta: number; opciones: number[]; hasDiscrepancias: boolean }[] }) {
    this.tieneRespuestasPrevias = Boolean(misRespuestas.hasPrevias);
    this.tieneDiscrepancias = Array.isArray(misRespuestas.respuestas)
      ? misRespuestas.respuestas.some(respuesta => respuesta.hasDiscrepancias)
      : false;

    const respuestasPrevias: Record<number, number[]> = {};
    if (Array.isArray(misRespuestas.respuestas)) {
      misRespuestas.respuestas.forEach(respuesta => {
        respuestasPrevias[respuesta.idPregunta] = Array.isArray(respuesta.opciones) ? respuesta.opciones : [];
      });
    }
    this.respuestasPrevias = respuestasPrevias;
  }

  private async resolveAsistencias(consultaId: number) {
    const storedAsistencias = this.consultasExtraService.getAsistencias();
    if (storedAsistencias.length > 0) {
      return storedAsistencias;
    }

    const idAsociado = this.consultasExtraService.getIdUsuario();
    if (idAsociado <= 0) {
      return [];
    }

    const response: any = await firstValueFrom(
      this.autorizacionesConsultasService.consultasIdConsultaAutorizadosGet(consultaId, 'body', false, idAsociado)
    );
    if (response.status.status !== 200 || !Array.isArray(response.autorizaciones)) {
      return [];
    }

    const asistencias = response.autorizaciones.map((autorizacion: any) => autorizacion.idAsistencia).filter((id: any) => Number.isFinite(id));
    this.consultasExtraService.setAsistencias(asistencias);
    return asistencias;
  }

  private captureReturnUrl() {
    const returnUrlFromState = this.router.getCurrentNavigation()?.extras?.state?.['returnUrl'] ?? null;
    const returnUrlFromQuery = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
    this.consultasExtraService.setReturnUrl(returnUrlFromState || returnUrlFromQuery);
  }

  private captureAsistencias() {
    const asistenciasParam = this.activatedRoute.snapshot.queryParamMap.get('asistencias')
      || this.activatedRoute.snapshot.queryParamMap.get('idAsistencia');
    this.consultasExtraService.applyAsistenciasFromParam(asistenciasParam);
  }


}
