import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FfsjAlertService, FfsjSpinnerComponent } from "ffsj-web-components";
import { firstValueFrom } from "rxjs";
import { AutorizacionesConsultasService, Consulta, ConsultasService } from "../../../api";
import { ConsultasExtraService } from "../../services/consultas-extra.service";

@Component({
    selector: 'app-consultas',
    imports: [
        FfsjSpinnerComponent
    ],
    templateUrl: './consultas.component.html',
    styleUrl: './consultas.component.scss'
})
export class ConsultasComponent {

  consultas: Consulta[] = [];
  loading: boolean = false;
  idAsociado: number = -1;
  idAsistencias: number[] = [];

  constructor(
    private consultasService: ConsultasService,
    private autorizacionesConsultasService: AutorizacionesConsultasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private consultasExtraService: ConsultasExtraService,
    private ffsjAlertService: FfsjAlertService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.captureReturnUrl();
    this.captureAsistencias();
    this.idAsistencias = this.consultasExtraService.getAsistencias();
    this.idAsociado = this.consultasExtraService.getIdUsuario();
    if (this.idAsistencias.length === 0 && this.idAsociado <= 0) {
      this.ffsjAlertService.warning('No se han encontrado asistencias para validar tu acceso.');
    }
    this.loadConsultas();
  }

  async isUserAuthorized(idConsulta: number) {
    try {
      const asistencias = await this.resolveAsistenciasForConsulta(idConsulta);
      if (asistencias.length === 0) {
        return false;
      }

      const responses = await Promise.all(
        asistencias.map((asistencia: number) =>
          firstValueFrom(this.autorizacionesConsultasService.consultasIdConsultaAutorizadosIdAsistenciaGet(idConsulta, asistencia))
        )
      );

      return responses.some((response: any) => response.status.status === 200 && response.autorizaciones !== 0);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async loadConsultas() {
    try {
      const response = await firstValueFrom(this.consultasService.consultasGet());
      console.log(response);
      if (response.status.status === 200) {
        const autorizaciones = await Promise.all(
          response.consultas.map(async consulta => ({
            consulta,
            autorizado: await this.isUserAuthorized(consulta.id)
          }))
        );
        this.consultas = autorizaciones
          .filter(({ autorizado }) => autorizado)
          .map(({ consulta }) => consulta);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  loadConsulta(consulta: Consulta) {
    this.router.navigate(['/consultas', consulta.id]);
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

  private async resolveAsistenciasForConsulta(idConsulta: number) {
    if (this.idAsistencias.length > 0) {
      return this.idAsistencias;
    }

    if (this.idAsociado <= 0) {
      return [];
    }

    const response: any = await firstValueFrom(
      this.autorizacionesConsultasService.consultasIdConsultaAutorizadosGet(idConsulta, 'body', false, this.idAsociado)
    );
    if (response.status.status !== 200 || !Array.isArray(response.autorizaciones)) {
      return [];
    }

    return response.autorizaciones.map((autorizacion: any) => autorizacion.idAsistencia).filter((id: any) => Number.isFinite(id));
  }

}
